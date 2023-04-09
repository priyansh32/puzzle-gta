"use client";
import Grid from "@/components/PuzzleGrid";
import { useEffect, useState } from "react";

import defaultImageGrid from "@/lib/defaultImageGrid";

export default function Home() {
  const [imageGrid, setImageGrid] = useState([]);
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
