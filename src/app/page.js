import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.container}>
      <Image
        src='/images/profile.jpg'
        alt='Picture of the author'
        width={500}
        height={500}
      />
    </div>
  );
}
