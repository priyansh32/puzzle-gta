import Image from "next/image";
import { HomePage } from "../page";
import Link from "next/link";

export default function Page() {
  return (
    <div className='bg-white flex items-center justify-center min-h-full'>
      <div className='overflow-hidden sm:pt-12 lg:pt-0 lg:relative'>
        <div className='mx-auto w-11/12 max-w-lg px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24'>
          <div className='flex flex-col justify-center mt-4'>
            <div>
              <Image
                className='h-11 w-auto'
                src='/puzzled-logo-light.svg'
                alt='Workflow'
                width={72}
                height={72}
              />
            </div>
            <div className='mt-20'>
              <div>
                <div className='inline-flex space-x-4'>
                  <span className='rounded bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 tracking-wide uppercase'>
                    Coming Soon
                  </span>
                  <span className='inline-flex items-center text-sm font-medium text-indigo-600 space-x-1'>
                    <span>new version is under development</span>
                  </span>
                </div>
              </div>
              <div className='mt-6 sm:max-w-xl'>
                <h1 className='text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
                  Get Ready to be Puzzled
                </h1>
                <p className='mt-6 text-xl text-gray-500'>
                  Unwind, relax, and challenge yourself with Puzzled - the
                  perfect app for puzzle lovers.
                  {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
                </p>
              </div>
              <div className='mt-8 flex'>
                <div className='inline-flex rounded-md shadow'>
                  <Link
                    href='/app'
                    _target='blank'
                    className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
                  >
                    Try it now
                  </Link>
                </div>
                <div className='ml-3 inline-flex'>
                  <Link
                    href='/about'
                    className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200'
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Image
            className='rounded-md relative z-10 shadow-xl ring-1 ring-black ring-opacity-5 my-8'
            src='/hero.gif'
            width={500}
            height={500}
            alt='A sliding puzzle gif'
          />
        </div>
      </div>
    </div>
  );
}
