import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function downloadImagesZipped(dataURLs) {
  const zip = new JSZip();
  dataURLs.forEach((dataURL, i) => {
    zip.file(`image${i}.png`, dataURL.split(",")[1], { base64: true });
  });
  zip
    .generateAsync({ type: "blob" })
    .then((content) => {
      saveAs(content, "images.zip");
    })
    .catch((err) => {
      console.log(err);
    });
}
