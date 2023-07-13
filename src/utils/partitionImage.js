function resizeImage(image, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, width, height);

  return canvas;
}

export default function partitionImage(croppedImage) {
  let dataURLs = [];

  // partition image into 25 pieces and store them in dataURLs
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

  // replacing last image with empty image
  const canvas = document.createElement("canvas");
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 100, 100);
  dataURLs.splice(-1, 1, canvas.toDataURL());

  // append original image to dataURLs
  const resizedOriginal = resizeImage(croppedImage, 160, 160);
  dataURLs.push(resizedOriginal.toDataURL());

  return dataURLs;
}
