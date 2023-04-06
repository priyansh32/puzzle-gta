import Image from "next/image";

export default function HomePage() {
  return (
    <div className='bg-white flex items-center justify-center min-h-full'>
      <div className='overflow-hidden sm:pt-12 lg:relative'>
        <div className='mx-auto max-w-lg px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24'>
          <div>
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
                </p>
              </div>
              <div className='mt-8 flex'>
                <div className='inline-flex rounded-md shadow'>
                  <a
                    href='https://puzzlegta.netlify.app/'
                    _target='blank'
                    className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
                  >
                    Try it now
                  </a>
                </div>
                <div className='ml-3 inline-flex'>
                  <a
                    href='#'
                    className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200'
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Image
            className='rounded-md shadow-xl max-w-11/12 ring-1 ring-black ring-opacity-5 my-8'
            src='/hero.gif'
            width={500}
            height={500}
            alt=''
          />
        </div>
      </div>
    </div>
  );
}
