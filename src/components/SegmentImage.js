"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

import Cropper from "react-easy-crop";

import Grid from "./PuzzleGrid";
// import downloadImagesZipped from "@/utils/download-images-zipped";

import getCroppedImg from "@/utils/get-cropped-img";
import partitionImage from "@/utils/partitionImage";

export default function ImageCropper() {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [Images, setImages] = useState([]);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (Images.length > 0) {
      localStorage.setItem("imageGrid", JSON.stringify(Images));
    }
  }, [Images]);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleFileChange = async (e) => {
    const [file] = e.target.files;

    setImage(URL.createObjectURL(new Blob([file])));
    setOpen(true);
  };

  const createPuzzle = () => {
    if (croppedAreaPixels === null) {
      alert("Please select an area to crop");
      return;
    }

    const croppedImage = getCroppedImg(image, croppedAreaPixels);

    let dataURLs = partitionImage(croppedImage);

    setImages(dataURLs);
    setOpen(false);
  };
  const hiddenFileInput = useRef(null);

  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      {!image && (
        <>
          <input
            type='file'
            onChange={handleFileChange}
            ref={hiddenFileInput}
            className='hidden'
          />
          <button
            type='button'
            onClick={(e) => {
              e.preventDefault();
              hiddenFileInput.current.click();
            }}
            className='relative block p-12 text-center'
          >
            <ArrowUpTrayIcon className='mx-auto h-12 w-12 text-gray-400' />
            <span className='mt-2 block text-sm font-medium text-gray-900'>
              Upload Image
            </span>
          </button>
        </>
      )}
      {open && (
        <>
          <div className='relative h-96 w-full'>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              // add classes to awt height and width of the cropper
              classes={{
                containerClassName:
                  "w-full max-w-screen-sm max-h-screen-sm h-96 relative mx-auto bg-green-100",
                // mediaClassName: "w-11/12",
                cropAreaClassName: "h-96 w-96",
              }}
            />
          </div>
          <div className='mt-5 sm:mt-6'>
            <button
              type='button'
              className='inline-flex justify-center w-full max-w-xs rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
              onClick={() => createPuzzle()}
            >
              Create Puzzle
            </button>
          </div>
        </>
      )}

      {Images.length > 0 && <Grid images={Images} />}
    </div>
  );
}
