"use client";
import Grid from "@/components/PuzzleGrid";
import { useEffect, useRef } from "react";
let images = [
  "1_f7sadu.png",
  "2_nburbx.png",
  "3_sgnv8g.png",
  "4_xajtk2.png",
  "5_oynbzz.png",
  "6_mo75dr.png",
  "7_bhudje.png",
  "8_qskaxk.png",
  "9_ovld9h.png",
  "10_dlyrzj.png",
  "11_isvewz.png",
  "12_qlr3yf.png",
  "13_xyrser.png",
  "14_sipeha.png",
  "15_qo2p9f.png",
  "16_adzel1.png",
  "17_omjh3d.png",
  "18_suonme.png",
  "19_cojhmj.png",
  "20_g0tw6i.png",
  "21_tpvxju.png",
  "22_q7fieh.png",
  "23_bsyfyp.png",
  "24_y1zunx.png",
  "25_dqqw9k.png",
];
export default function Home() {
  // check if localStorage has imageGrid
  // if not, set it to images
  // if it does, set it to localStorage imageGrid
  let imageGrid = useRef([]);
  useEffect(() => {
    if (localStorage.getItem("imageGrid")) {
      console.log(localStorage.getItem("imageGrid"));
      imageGrid.current = JSON.parse(localStorage.getItem("imageGrid"));
      // console.log(imageGrid.current);
    } else {
      imageGrid.current = images;
      localStorage.setItem("imageGrid", JSON.stringify(imageGrid));
    }
  }, []);
  return (
    <>
      <Grid images={imageGrid.current} />
    </>
  );
}
