import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

export default function DailyPuzzle() {
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <div className='text-4xl font-bold'>
        <div className='flex flex-col items-center'>
          <WrenchScrewdriverIcon className='h-20 w-20 mr-4' />
          <div className='text-center'>Under Development</div>
        </div>
      </div>
    </div>
  );
}
