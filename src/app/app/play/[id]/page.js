"use client";
import { storage } from "@/lib/firebase-client";
import Grid from "@/components/PuzzleGrid";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import PuzzleContext from "@/context/PuzzleContext";
export default function Page({ params }) {
  const { id } = params;
  const [imageGrid, setImageGrid] = useState(Array(25).fill("/tail-spin.svg"));

  useEffect(() => {
    fetch(`/api/puzzle?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const directory = data.puzzle.directory;
        const promises = data.puzzle.images.map(async (name) => {
          const Imageref = getDownloadURL(ref(storage, `${directory}/${name}`));
          return Imageref;
        });
        Promise.all(promises).then((urls) => {
          setImageGrid(urls);
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
        setTime(newTime.toFixed(2));
      }, 10);
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
        {imageGrid && <Grid images={imageGrid} />}
        <div className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          <span>Time: {time}</span>
        </div>

        <div></div>
      </div>
    </PuzzleContext.Provider>
  );
}
