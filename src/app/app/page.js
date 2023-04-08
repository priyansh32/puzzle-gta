"use client";
import Grid from "@/components/PuzzleGrid";
import { useEffect, useState } from "react";

import defaultImageGrid from "@/lib/defaultImageGrid";

export default function Home() {
  // check if localStorage has imageGrid
  // if not, set it to images
  // if it does, set it to localStorage imageGrid
  const [imageGrid, setImageGrid] = useState([]);
  // let imageGrid = useRef([]);
  useEffect(() => {
    if (localStorage.getItem("imageGrid")) {
      setImageGrid(JSON.parse(localStorage.getItem("imageGrid")));
    } else {
      setImageGrid(defaultImageGrid);
    }
  }, []);
  return (
    <>
      <Grid images={imageGrid} />
    </>
  );
}
