"use client";
import { useState } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import JSZip from "jszip";
import saveAs from "file-saver";
// import { getCroppedImg } from './cropImage';
function getCroppedImg(imageSrc, pixelCrop) {
  // Image is not a constructor
  //   const image = new Image();
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

  const handleFileChange = (e) => {
    setImage(URL.createObjectURL(new Blob([e.target.files[0]])));
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
        canvas.width = croppedImage.width / 5;
        canvas.height = croppedImage.height / 5;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          croppedImage,
          j * (croppedImage.width / 5),
          i * (croppedImage.height / 5),
          croppedImage.width / 5,
          croppedImage.height / 5,
          0,
          0,
          croppedImage.width / 5,
          croppedImage.height / 5
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
