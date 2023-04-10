"use client";

import arrayShuffle from "@/utils/shuffle-array";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function getCoordinates(i, width) {
  return [i % width, Math.floor(i / width)];
}

const Grid = (props) => {
  const ImageLinks = props.images;

  const CorrectOrder = useRef([]);

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

  useEffect(() => {
    // check if the puzzle is solved
    if (imageOrder.toString() === CorrectOrder.current.toString()) {
      setIsSolved(true);
      alert("You solved the puzzle!");
    } else {
      setIsSolved(false); // just in case it was solved before
    }
  }, [imageOrder]);

  const handleClick = (i) => {
    // get x, y of clicked image and empty image
    const [X, Y] = getCoordinates(i, 5);
    const [emptyX, emptyY] = getCoordinates(empty, 5);

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
      <button onClick={() => reshuffle()}>Reshuffle</button>
    </>
  );
};

export default Grid;
