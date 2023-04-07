"use client";
import { useState } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import JSZip from "jszip";
import saveAs from "file-saver";
import Compress from "compress.js";

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
  const [aspectRatio, setAspectRatio] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

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
    // zip the images and download
    const zip = new JSZip();
    dataURLs.forEach((dataURL, i) => {
      zip.file(`image${i}.png`, dataURL.split(",")[1], { base64: true });
    });
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "images.zip");
    });
    setImage(null);
  };

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      {image && (
        <>
          <div>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <div>
              <label>
                Aspect Ratio:
                <input
                  type='number'
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                />
              </label>
            </div>
          </div>
          <button
            id='thisis'
            className='relative z-100'
            onClick={handleDownload}
          >
            Download
          </button>
        </>
      )}
    </div>
  );
}
