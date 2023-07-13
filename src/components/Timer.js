"use client";

import React from "react";

const Timer = ({ time, className, ...props }) => {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  // Format the time values with leading zeros
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return (
    <div className={"flex items-center justify-center space-x-2 " + className} {...props}>
        <div className='flex items-center flex-col space-y-2'>
          <div className='flex items-center space-x-2'>
            <div className='bg-gray-200 rounded-lg p-2'>
              <span className='text-3xl font-bold'>{formattedHours[0]}</span>
            </div>
            <div className='bg-gray-200 rounded-lg p-2'>
              <span className='text-3xl font-bold'>{formattedHours[1]}</span>
            </div>
          </div>
          <span className='text-xs'>Hours</span>
        </div>
        <span className='text-3xl font-bold mx-1 translate-y-[-0.75rem]' >:</span>
        <div className='flex items-center flex-col space-y-2'>
          <div className='flex items-center space-x-2'>
            <div className='bg-gray-200 rounded-lg p-2'>
              <span className='text-3xl font-bold'>{formattedMinutes[0]}</span>
            </div>
            <div className='bg-gray-200 rounded-lg p-2'>
              <span className='text-3xl font-bold'>{formattedMinutes[1]}</span>
            </div>
          </div>
          <span className='text-xs'>Minutes</span>
        </div>
        <span className='text-3xl font-bold translate-y-[-0.75rem]'>:</span>
        <div className='flex items-center flex-col space-y-2'>
          <div className='flex items-center space-x-2'>
            <div className='bg-gray-200 rounded-lg p-2'>
              <span className='text-3xl font-bold'>{formattedSeconds[0]}</span>
            </div>
            <div className='bg-gray-200 rounded-lg p-2'>
              <span className='text-3xl font-bold'>{formattedSeconds[1]}</span>
            </div>
          </div>
          <span className='text-xs'>Seconds</span>
        </div>
    </div>
  );
};

export default Timer;
