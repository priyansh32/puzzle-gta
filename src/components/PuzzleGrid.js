"use client";

import arrayShuffle from "@/utils/shuffle-array";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Grid = (props) => {
  const ImageLinks = props.images;

  const CorrectOrder = useRef([]);

  // const [imageGrid, setimageGrid] = useState([images.current]);
  const [imageOrder, setimageOrder] = useState([]);

  const [empty, setEmpty] = useState(24);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    reshuffle();
  }, []);

  const reshuffle = () => {
    setimageOrder(arrayShuffle(Array.from(Array(25).keys())));
    CorrectOrder.current = Array.from(Array(25).keys());
    setEmpty(24);
    setIsSolved(false);
  };

  // print empty when updated
  useEffect(() => {
    console.log(empty);
  }, [empty]);

  useEffect(() => {
    // check if the puzzle is solved
    if (imageOrder.toString() === CorrectOrder.current.toString()) {
      setIsSolved(true);
      alert("You solved the puzzle!");
    } else {
      setIsSolved(false); // just in case it was solved before
    }
  }, [imageOrder]);

  // check if ImageOrder is equal to CorrectOrder after every OrderUpdate

  const handleClick = (i) => {
    // console.log(ImageLinks);
    // get x, y of clicked image
    const X = i % 5;
    const Y = Math.floor(i / 5);

    // get x, y of empty image
    const emptyX = empty % 5;
    const emptyY = Math.floor(empty / 5);

    // check if clicked image is next to empty image
    if (Math.abs(X - emptyX) + Math.abs(Y - emptyY) === 1) {
      const newImageOrder = [...imageOrder];
      [newImageOrder[i], newImageOrder[empty]] = [
        newImageOrder[empty],
        newImageOrder[i],
      ];

      setimageOrder(newImageOrder);
      setEmpty(i);
    }
  };

  return (
    <>
      <div className='grid grid-cols-5 w-11/12' style={{ maxWidth: "500px" }}>
        {imageOrder.map((image_index, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            className={`flex items-center justify-center cursor-pointer`}
          >
            <Image
              src={ImageLinks[image_index]}
              alt=''
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
      {isSolved && (
        <>
          <p>You solved the puzzle!</p>
          <button onClick={() => reshuffle()}>Play Again</button>
        </>
      )}
      {/* Reshuffle */}
      <button onClick={() => reshuffle()}>Reshuffle</button>
    </>
  );
};

export default Grid;
