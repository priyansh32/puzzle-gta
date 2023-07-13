import { storage } from "@/lib/firebase-client";
import { getDownloadURL, ref } from "firebase/storage";

const getDownloadURLs = async (directory, names) => {
    let directoryArray = []
    // if directory is string
    if (typeof directory === "string") {
        directoryArray = new Array(names.length).fill(directory);
    } else {
        directoryArray = directory;
    }
    
    const peicePromises = names.map(async (name, index) => 
        new Promise((resolve) => {
            getDownloadURL(ref(storage, `${directoryArray[index]}/${name}`)).then((url) => {
                resolve(url);
            }).catch(() => {
                resolve("/placeholder.jpg");
            });
        })
    );
    
    return await Promise.all(peicePromises);
}

export default getDownloadURLs;