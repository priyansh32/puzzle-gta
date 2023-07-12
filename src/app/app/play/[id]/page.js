"use client";
import { storage } from "@/lib/firebase-client";
import Grid from "@/components/PuzzleGrid";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
export default function Page({ params }) {
  const { id } = params;
  const [imageGrid, setImageGrid] = useState(Array(25).fill("/loading.gif"));
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
  const [timerOn, setTimerOn] = useState(false);
  const timerStart = useRef(null);

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      timerStart.current = Date.now() / 1000;
      interval = setInterval(() => {
        const newTime = Date.now() / 1000 - timerStart.current;
        setTime(newTime.toFixed(2));
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn, timerStart]);

  return (
    <>
      <div className='min-h-content h-full w-full flex flex-col items-center justify-center'>
        {imageGrid && <Grid images={imageGrid} />}
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => setTimerOn(!timerOn)}
        >
          {timerOn ? "Stop" : "Start"}
        </button>

        <div>
          <span>{time}</span>
        </div>
      </div>
    </>
  );
}
