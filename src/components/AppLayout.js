"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  HomeIcon,
  Bars3Icon,
  CalendarIcon,
  PuzzlePieceIcon,
  PlusCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/app/dashboard", icon: HomeIcon },
  { name: "Daily Puzzle", href: "/app/daily-puzzle", icon: CalendarIcon },
  {
    name: "Puzzles Library",
    href: "/app/puzzle-library",
    icon: PuzzlePieceIcon,
  },
  { name: "Create Puzzle", href: "/app/create-puzzle", icon: PlusCircleIcon },
  { name: "About", href: "/about", icon: InformationCircleIcon },
];

const user = {
  name: "Emily Selman",
  email: "emily.selman@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AppLayout = ({ children }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
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
              <div className='flex-shrink-0 flex border-t border-gray-200 p-4'>
                <Link href='#' className='flex-shrink-0 group block'>
                  <div className='flex items-center'>
                    <div>
                      <Image
                        className='inline-block h-10 w-10 rounded-full'
                        src={user.imageUrl}
                        alt=''
                        width={40}
                        height={40}
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
                  </div>
                </Link>
              </div>
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
            <div className='flex-shrink-0 flex border-t border-gray-200 p-4'>
              <Link href='#' className='flex-shrink-0 w-full group block'>
                <div className='flex items-center'>
                  <div>
                    <Image
                      className='inline-block h-9 w-9 rounded-full'
                      src={user.imageUrl}
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
                </div>
              </Link>
            </div>
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
            <div className='absolute inset-0 py-6 px-4 sm:px-6 lg:px-8'>
              <div className='h-full border-2 border-gray-200 border-dashed rounded-lg'>
                {children}
              </div>
            </div>
            {/* End main area */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
