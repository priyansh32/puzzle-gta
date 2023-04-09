"use client";
import { storage } from "@/lib/storage";
import Grid from "@/components/PuzzleGrid";
import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
export default function Page({ params }) {
  const { id } = params;
  const [imageGrid, setImageGrid] = useState([]);
  useEffect(() => {
    // pass id as query param
    fetch(`/api/puzzle?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const directory = data.puzzle.directory;
        // get download url for paths in data.res.images
        const promises = data.puzzle.images.map(async (name) => {
          const Imageref = getDownloadURL(ref(storage, `${directory}/${name}`));
          return Imageref;
        });
        Promise.all(promises).then((urls) => {
          setImageGrid(urls);
        });
      });
  }, [id]);

  return (
    <div className='min-h-content h-full w-full flex flex-col items-center'>
      <Grid images={imageGrid} />
    </div>
  );
}
