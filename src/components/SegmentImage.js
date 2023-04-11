"use client";
import { storage } from "@/lib/storage";
import { ref, uploadString } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { randomName } from "@/utils/random-name";
import Cropper from "react-easy-crop";
// import downloadImagesZipped from "@/utils/download-images-zipped";

import getCroppedImg from "@/utils/get-cropped-img";
import partitionImage from "@/utils/partitionImage";
import { useRouter } from "next/navigation";

export default function ImageCropper() {
  const image = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const router = useRouter();

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleFileChange = async (e) => {
    const [file] = e.target.files;
    image.current = URL.createObjectURL(new Blob([file]));
    setLoaded(true);
  };

  const createPuzzle = () => {
    if (croppedAreaPixels === null) {
      alert("Please select an area to crop");
      return;
    }

    const croppedImage = getCroppedImg(image.current, croppedAreaPixels);

    let dataURLs = partitionImage(croppedImage);
    const directory = randomName(12);
    const promises = dataURLs.map(async (imagedataurl) => {
      const name = randomName(10);
      const path = `puzzles/${directory}/${name}`;
      const imageRef = ref(storage, path);
      await uploadString(imageRef, imagedataurl, "data_url");
      return name;
    });

    Promise.all(promises).then((names) => {
      fetch("/api/puzzle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleRef.current.value,
          directory: `puzzles/${directory}`,
          images: names,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          router.push(`/app/play/${data.puzzle.id}`);
        });
    });
  };

  const cancelPuzzleCreation = () => {
    image.current = null;
    setLoaded(false);
  };

  const titleRef = useRef(null);
  const fileInput = useRef(null);

  return (
    <div className='h-h-full w-full flex flex-col items-center '>
      <form className='space-y-8 divide-y divide-gray-200'>
        <div className='space-y-8 divide-y divide-gray-200'>
          <div>
            <div>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                Create Puzzle
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Puzzles are by default uploaded to server, but you can also save
                them to your localStorage.
              </p>
            </div>

            <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium text-gray-700'
                >
                  Title
                </label>
                <div className='mt-1 flex rounded-md shadow-sm'>
                  <input
                    type='text'
                    name='title'
                    id='title'
                    autoComplete='title'
                    ref={titleRef}
                    required
                    className='flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300'
                  />
                </div>
              </div>
              <div className='col-span-6'>
                <label
                  htmlFor='puzzle-photo'
                  className='block text-sm font-medium text-gray-700'
                >
                  Image
                </label>
              </div>
              {!loaded ? (
                <div className='col-span-6'>
                  <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                    <div
                      className='space-y-1 text-center cursor-pointer'
                      onClick={() => {
                        console.log("clicked");
                        fileInput.current.click();
                      }}
                    >
                      <svg
                        className='mx-auto h-12 w-12 text-gray-400'
                        stroke='currentColor'
                        fill='none'
                        viewBox='0 0 48 48'
                        aria-hidden='true'
                      >
                        <path
                          d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      <div className='flex text-sm text-gray-600'>
                        <label
                          htmlFor='image-upload'
                          className='relative bg-white cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <span>Upload a file</span>
                        </label>
                        <input
                          id='image-upload'
                          name='image-upload'
                          type='file'
                          accept='image/jpg, image/jpeg, image/png'
                          className='sr-only'
                          onChange={handleFileChange}
                          ref={fileInput}
                        />
                      </div>
                      <p className='text-xs text-gray-500'>PNG or JPG.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='relative h-128 w-full col-span-6'>
                  <Cropper
                    image={image.current}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    classes={{
                      containerClassName:
                        "w-full max-w-screen-sm max-h-screen-sm h-128 bg-green-100",
                      cropAreaClassName: "h-128 w-128",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='py-5 my-4'>
          <div className='flex justify-end'>
            <button
              type='button'
              className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              onClick={cancelPuzzleCreation}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              onClick={(e) => {
                e.preventDefault();
                createPuzzle();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
