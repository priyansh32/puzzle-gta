"use client";

import arrayShuffle from "@/utils/shuffle-array";

import Image from "next/image";
import { useEffect, useState } from "react";

const Grid = ({ images }) => {
  const [ImageGrid, setImages] = useState(images);
  const [ImageOrder, setImageOrder] = useState(Array.from(Array(25).keys()));
  const [CorrectOrder, setCorrectOrder] = useState([]);
  const [empty, setEmpty] = useState(24);

  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    // create an array of numbers from 0 to 24 and shuffle it
    const arr = arrayShuffle(Array.from(Array(25).keys()));
    // creae an object with the shuffled array as keys and the images array as values
    const key_image = arr.reduce((acc, curr, i) => {
      acc[curr] = images[i];
      return acc;
    }, Array(25));

    setCorrectOrder(arr);
    setImages(key_image);
    setEmpty(24);
    console.log(key_image);
    console.log(arr);
  }, [images]);

  const handleClick = (i) => {
    // get x, y of clicked image
    const X = i % 5;
    const Y = Math.floor(i / 5);

    // get x, y of empty image
    const emptyX = empty % 5;
    const emptyY = Math.floor(empty / 5);

    // check if clicked image is next to empty image
    if (Math.abs(X - emptyX) + Math.abs(Y - emptyY) === 1) {
      // swap images
      const newImageGrid = [...ImageGrid];
      const temp = newImageGrid[i];
      newImageGrid[i] = newImageGrid[empty];
      newImageGrid[empty] = temp;

      // update image order
      const newImageOrder = [...ImageOrder];
      const temp2 = newImageOrder[i];
      newImageOrder[i] = newImageOrder[empty];
      newImageOrder[empty] = temp2;

      setImageOrder(newImageOrder);
      console.log(newImageOrder);
      // check if the puzzle is solved

      setImages(newImageGrid);
      setEmpty(i);
      // check if puzzle is solved
      if (newImageOrder.toString() === CorrectOrder.toString()) {
        setIsSolved(true);
        alert("You solved the puzzle!");
      }
    }
  };

  return (
    <>
      <div className='grid grid-cols-5 w-11/12' style={{ maxWidth: "500px" }}>
        {ImageGrid.map((image, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            className={`${
              image ? "" : "bg-gray-400"
            } flex items-center justify-center cursor-pointer`}
          >
            {image ? <Image src={image} alt='' width={100} height={100} /> : ""}
          </div>
        ))}
      </div>
      {isSolved && (
        <>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </>
      )}
    </>
  );
};

export default Grid;
