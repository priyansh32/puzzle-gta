"use client";
import { Fragment, useContext, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

import navigation from "@/lib/navigation";
import { UserContext } from "@/context/userContext";
import { signOut } from "next-auth/react";
import LoginButton from "./LoginButton";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AppLayout = ({ children }) => {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useContext(UserContext);

  const cancelButtonRef = useRef(null);
  const [logoutModalOpen, setlogoutModalOpen] = useState(false);

  return (
    <>
      <div className='h-full flex'>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 flex z-40 lg:hidden'
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <div className='relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute top-0 right-0 -mr-12 pt-2'>
                    <button
                      type='button'
                      className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className='sr-only'>Close sidebar</span>
                      <XMarkIcon
                        className='h-6 w-6 text-white'
                        aria-hidden='true'
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
                  <div className='flex-shrink-0 flex items-center px-4'>
                    <Link href='/'>
                      <Image
                        className='h-8 w-auto'
                        src='/puzzled-logo-light.svg'
                        alt='Workflow'
                        width={144}
                        height={32}
                      />
                    </Link>
                  </div>
                  <nav aria-label='Sidebar' className='mt-5'>
                    <div className='px-2 space-y-1'>
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.href === pathname
                              ? "bg-purple-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.href === pathname
                                ? "text-purple-700"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-4 h-6 w-6"
                            )}
                            aria-hidden='true'
                          />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
                {user ? (
                  <div className='flex-shrink-0 flex border-t border-gray-200 p-4'>
                    <div className='flex-shrink-0 w-full group grid grid-cols-6'>
                      <Link
                        href='/app/profile'
                        className='flex items-center col-start-1 col-end-6'
                      >
                        <div>
                          <Image
                            className='inline-block h-10 w-10 rounded-full'
                            src={user.image}
                            width={40}
                            height={40}
                            alt={`${user.name} profile avatar`}
                          />
                        </div>
                        <div className='ml-3'>
                          <p className='text-base font-medium text-gray-700 group-hover:text-gray-900'>
                            {user.name}
                          </p>
                          <p className='text-sm font-medium text-gray-500 group-hover:text-gray-700'>
                            View profile
                          </p>
                        </div>
                      </Link>
                      <button
                        onClick={() => setlogoutModalOpen(true)}
                        className='flex items-center justify-center'
                      >
                        <ArrowRightOnRectangleIcon
                          className='h-8 w-8 text-gray-400 group-hover:text-gray-500'
                          aria-hidden='true'
                        />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='flex-shrink-0 flex border-t border-gray-200 p-4'>
                    <LoginButton />
                  </div>
                )}
              </div>
            </Transition.Child>
            <div className='flex-shrink-0 w-14' aria-hidden='true'>
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden lg:flex lg:flex-shrink-0'>
          <div className='flex flex-col w-64'>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className='flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-100'>
              <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
                <div className='flex items-center flex-shrink-0 px-4'>
                  <Link href='/'>
                    <Image
                      className='h-8 w-auto'
                      src='/puzzled-logo-light.svg'
                      alt='Workflow'
                      width={144}
                      height={32}
                    />
                  </Link>
                </div>
                <nav className='mt-5 flex-1' aria-label='Sidebar'>
                  <div className='px-2 space-y-1'>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.href === pathname
                            ? "bg-purple-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.href === pathname
                              ? "text-purple-700"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-3 h-6 w-6"
                          )}
                          aria-hidden='true'
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
              {user ? (
                <div className='flex-shrink-0 flex border-t border-gray-200 p-4'>
                  <div className='flex-shrink-0 w-full group grid grid-cols-6'>
                    <Link
                      href='/app/profile'
                      className='flex items-center col-start-1 col-end-6'
                    >
                      <div>
                        <Image
                          className='inline-block h-9 w-9 rounded-full'
                          src={user.image}
                          width={36}
                          height={36}
                          alt=''
                        />
                      </div>
                      <div className='ml-3'>
                        <p className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
                          {user.name}
                        </p>
                        <p className='text-xs font-medium text-gray-500 group-hover:text-gray-700'>
                          View profile
                        </p>
                      </div>
                    </Link>
                    <button
                      onClick={() => setlogoutModalOpen(true)}
                      className='flex items-center justify-center'
                    >
                      <ArrowRightOnRectangleIcon
                        className='h-6 w-6 text-gray-400 group-hover:text-gray-500'
                        aria-hidden='true'
                      />
                    </button>
                  </div>
                </div>
              ) : (
                <div className='flex-shrink-0 flex border-t border-gray-200 p-4'>
                  <LoginButton />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-col min-w-0 flex-1 overflow-hidden'>
          <div className='lg:hidden'>
            <div className='flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5'>
              <div>
                <Image
                  className='h-8 w-auto'
                  src='/puzzled.svg'
                  width={32}
                  height={32}
                  alt='Workflow'
                />
              </div>
              <div>
                <button
                  type='button'
                  className='-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900'
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className='sr-only'>Open sidebar</span>
                  <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                </button>
              </div>
            </div>
          </div>
          <div className='flex-1 relative z-0 flex overflow-auto'>
            <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none'>
              {/* Start main area*/}
              <div className='min-h-full h-full py-6 px-4 sm:px-6 lg:px-8'>
                {children}
              </div>
              {/* End main area */}
            </main>
          </div>
        </div>
      </div>
      <Transition.Root show={logoutModalOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed z-10 inset-0 overflow-y-auto'
          initialFocus={cancelButtonRef}
          onClose={setlogoutModalOpen}
        >
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
                <div className='sm:flex sm:items-start'>
                  <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                    <ExclamationTriangleIcon
                      className='h-6 w-6 text-red-600'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg leading-6 font-medium text-gray-900'
                    >
                      Logout
                    </Dialog.Title>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        Are you sure you want to Logout?
                      </p>
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
                  <button
                    type='button'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                    button
                    onClick={() => {
                      // disable button

                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    Logout
                  </button>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
                    onClick={() => setlogoutModalOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default AppLayout;
