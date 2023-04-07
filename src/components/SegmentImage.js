"use client";
import Image from "next/image";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

import Cropper from "react-easy-crop";
// import JSZip from "jszip";
// import saveAs from "file-saver";
import Compress from "compress.js";

// import { redirect } from "next/navigation";
import Grid from "./PuzzleGrid";

function getCroppedImg(imageSrc, pixelCrop) {
  const image = document.createElement("img");
  image.src = imageSrc;

  const canvas = document.createElement("canvas");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas;
}

export default function ImageCropper() {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [Images, setImages] = useState([]);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("imageGrid", JSON.stringify(Images));
  }, [Images]);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleFileChange = async (e) => {
    const [file] = e.target.files;
    console.log(URL.createObjectURL(new Blob([file])));
    const cmp = new Compress();
    const resizedFile = await cmp.compress([file], {
      size: 1, // the max size in MB, defaults to 2MB
      quality: 0.75, // the quality of the image, max is 1,
      maxWidth: 1080, // the max width of the output image, defaults to 1920px
      maxHeight: 1080, // the max height of the output image, defaults to 1920px
      resize: true, // defaults to true, set false if you do not want to resize the image width and height
    });

    const compressedFile = resizedFile[0];
    const base64str = compressedFile.data;
    const imgExt = compressedFile.ext;
    const newFile = Compress.convertBase64ToFile(base64str, imgExt);

    setImage(URL.createObjectURL(new Blob([newFile])));
    setOpen(true);
  };

  const handleDownload = () => {
    if (croppedAreaPixels === null) {
      alert("Please select an area to crop");
      return;
    }

    const croppedImage = getCroppedImg(image, croppedAreaPixels);

    let dataURLs = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          croppedImage,
          j * (croppedImage.width / 5),
          i * (croppedImage.height / 5),
          croppedImage.width / 5,
          croppedImage.height / 5,
          0,
          0,
          100,
          100
        );
        dataURLs.push(canvas.toDataURL());
      }
    }

    // replace last element with an empty white image
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 100, 100);
    dataURLs[24] = canvas.toDataURL();
    // save the dataURLs to the session storage
    // redirect to /app page with dataURLs
    console.log("wtf");
    setImages(dataURLs);
    setOpen(false);
    // redirect("./app");
    // zip the images and download
    // const zip = new JSZip();
    // dataURLs.forEach((dataURL, i) => {
    //   zip.file(`image${i}.png`, dataURL.split(",")[1], { base64: true });
    // });
    // zip
    //   .generateAsync({ type: "blob" })
    //   .then((content) => {
    //     saveAs(content, "images.zip");
    //   })
    //   .then(() => {
    //     setOpen(false);
    //   });
    // setImage(null);
  };

  return (
    <>
      <input type='file' onChange={handleFileChange} />
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='fixed z-10 inset-0 overflow-y-auto'
          onClose={setOpen}
        >
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-screen-lg sm:w-full sm:p-6'>
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
                    mediaClassName: "w-11/12 h-11/12",
                    cropAreaClassName: "h-96 w-96",
                  }}
                />
                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    className='inline-flex justify-center w-full max-w-xs rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
                    onClick={() => handleDownload()}
                  >
                    Download
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {Images.length > 0 && <Grid images={Images} />}
    </>
  );
}
