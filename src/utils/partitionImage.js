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
  // add an empty white image to the end of dataURLs
  // exhange it to last second image
  // do we need this? anywas does no harm
  const canvas = document.createElement("canvas");
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 100, 100);
  dataURLs.push(canvas.toDataURL());
  [dataURLs[25], dataURLs[24]] = [dataURLs[24], dataURLs[25]];
  return dataURLs;
}
