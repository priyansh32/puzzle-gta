import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import { app } from "./firebase-sdk";
export const storage = getStorage(app);