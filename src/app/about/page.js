import Image from "next/image";
import Link from "next/link";
export default function About() {
  return (
    <div className='relative py-16 bg-white overflow-hidden'>
      <BackgroundLayer />
      <div className='relative px-4 sm:px-6 lg:px-8'>
        <div className='text-lg max-w-prose mx-auto'>
          <h1>
            <span className='block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase'>
              about
            </span>
            <span className='mt-2 block'>
              <Image
                alt=''
                src='/puzzled-logo-light.svg'
                width={216}
                height={48}
                className='mx-auto'
              />
            </span>
          </h1>
        </div>
        <div className='mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto'>
          <p>
            <strong>Welcome to Puzzled,</strong> the ultimate destination for
            puzzle lovers! Our app is designed to challenge your mind and
            provide endless hours of fun. Whether you{`'`}re a seasoned puzzle
            pro or a beginner, our app has something for everyone. With a
            variety of pre-made puzzles and the ability to create custom
            puzzles, the possibilities are endless. So gather your friends and
            family, and get ready to get Puzzled!
          </p>
          <CTA />
          <p>
            We{"'"}re always looking for ways to improve and expand our app, so
            if you have any feedback or suggestions, please don{"'"}t hesitate
            to reach out. Happy puzzling!
          </p>
          <Divider />
          <p>
            You can reach me at{" "}
            <a href='mailto:patidarpriyansh936@gmail.com'>
              patidarpriyansh936@gmail.com
            </a>
            {/* twitter */}
            <ul>
              <li>
                <a href='https://twitter.com/priyanshpatidar'>Twitter</a>
              </li>
              <li>
                <a href='https://www.linkedin.com/in/priyansh-patidar-0b1b1b1b9/'>
                  LinkedIn
                </a>
              </li>
              {/* github */}
              <li>
                <a href='https://github.com/priyansh32'>Github</a>
              </li>
            </ul>
          </p>
          <Divider />
          <Footer />
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className='relative'>
      <div className='absolute inset-0 flex items-center' aria-hidden='true'>
        <div className='w-full border-t border-gray-400' />
      </div>
    </div>
  );
}

function CTA() {
  return (
    <div className='bg-white'>
      <div className='w-full mx-auto text-center py-12 px-4 sm:px-6 lg:py-8 lg:px-4'>
        <h2 className='text-3xl my-auto font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
          <span className='block'>Ready to dive in?</span>
          <span className='block'>Start puzzling today.</span>
        </h2>
        <div className='mt-8 flex justify-center'>
          <div className='inline-flex rounded-md shadow'>
            <Link
              href='#'
              className='inline-flex items-center justify-center no-underline px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
            >
              Sign In
            </Link>
          </div>
          <div className='ml-3 inline-flex'>
            <Link
              href='#'
              className='inline-flex items-center justify-center no-underline px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200'
            >
              Start Solving
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundLayer() {
  return (
    <div className='hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full'>
      <div
        className='relative h-full text-lg max-w-prose mx-auto'
        aria-hidden='true'
      >
        <svg
          className='absolute top-12 left-full transform translate-x-32'
          width={404}
          height={384}
          fill='none'
          viewBox='0 0 404 384'
        >
          <defs>
            <pattern
              id='74b3fd99-0a6f-4271-bef2-e80eeafdf357'
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits='userSpaceOnUse'
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className='text-gray-200'
                fill='currentColor'
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={384}
            fill='url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)'
          />
        </svg>
        <svg
          className='absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32'
          width={404}
          height={384}
          fill='none'
          viewBox='0 0 404 384'
        >
          <defs>
            <pattern
              id='f210dbf6-a58d-4871-961e-36d5016a0f49'
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits='userSpaceOnUse'
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className='text-gray-200'
                fill='currentColor'
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={384}
            fill='url(#f210dbf6-a58d-4871-961e-36d5016a0f49)'
          />
        </svg>
        <svg
          className='absolute bottom-12 left-full transform translate-x-32'
          width={404}
          height={384}
          fill='none'
          viewBox='0 0 404 384'
        >
          <defs>
            <pattern
              id='d3eb07ae-5182-43e6-857d-35c643af9034'
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits='userSpaceOnUse'
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className='text-gray-200'
                fill='currentColor'
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={384}
            fill='url(#d3eb07ae-5182-43e6-857d-35c643af9034)'
          />
        </svg>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className='bg-white'>
      <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
        <p className='text-center text-base font-medium text-gray-500'>
          Made with ❤️ by Priyansh
        </p>
      </div>
    </div>
  );
}
