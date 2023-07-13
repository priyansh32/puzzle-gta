"use client";

import Grid from "@/components/PuzzleGrid";
import { useEffect, useRef, useState } from "react";
import PuzzleContext from "@/context/PuzzleContext";
import Timer from "@/components/Timer";
import Image from "next/image";
import getDownloadURLs from "@/utils/getDownloadURLs";

export default function Page({ params }) {
  const { id } = params;
  const [imageGrid, setImageGrid] = useState(Array(25).fill("/tail-spin.svg"));
  const OriginalImage = useRef(null);

  useEffect(() => {
    fetch(`/api/puzzle?id=${id}`)
      .then((res) => res.json())
      .then((data) => {

        getDownloadURLs(data.puzzle.directory, data.puzzle.images).then((urls) => {
          setImageGrid(urls);
        }).catch((error) => {
          console.log(error);
        });

        getDownloadURLs(data.puzzle.directory, [data.puzzle.original]).then((urls) => {
          OriginalImage.current = urls[0];
        });
          
      });
  }, [id]);

  const [time, setTime] = useState(0);
  const [isTimerOn, setTimerOn] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  const timerStart = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isTimerOn) {
      timerStart.current = Date.now() / 1000;
      intervalRef.current = setInterval(() => {
        const newTime = Date.now() / 1000 - timerStart.current;
        setTime(Math.floor(newTime));
      }, 500);
    } else if (!isTimerOn) {
      clearInterval(intervalRef.current);
    }
  }, [isTimerOn]);

  return (
    <PuzzleContext.Provider
      value={{
        timerState: {
          isTimerOn,
          setTimerOn,
        },
        timeState: {
          time,
          setTime,
        },
        isSolvedState: {
          isSolved,
          setIsSolved,
        },
      }}
    >
      <div className='min-h-content h-full w-full flex flex-col items-center justify-center'>
        {OriginalImage.current && (
          <Image
            src={OriginalImage.current}
            alt='Original'
            className='w-40 h-40 m-4'
            width={400}
            height={400}
          />
        )}
        <Timer time={time} className='mb-4' />
        {imageGrid && <Grid images={imageGrid} />}
      </div>
    </PuzzleContext.Provider>
  );
}
