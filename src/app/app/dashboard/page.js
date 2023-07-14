"use client";
import { UserContext } from "@/context/userContext";
import getDownloadURLs from "@/utils/getDownloadURLs";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";

export default function Dashboard() {
  const user = useContext(UserContext);
  const [ogdURLS, setOgdURLS] = useState([]);

  useEffect(() => {
    if (user) {
      const directoryArray = user.puzzles.map((puzzle) => puzzle.directory);
      const namesArray = user.puzzles.map((puzzle) => puzzle.original);
      getDownloadURLs(directoryArray, namesArray).then((urls) => {
        setOgdURLS(urls);
      });
    }
  }, [user]);

  return (
    <div>
      <h1 className='text-2xl font-bold'>Dashboard</h1>
      {user && (
        <div>
          <h2 className='text-xl font-bold mt-4'>Welcome {user.name}</h2>
          <p className='text-lg mt-4'>PUZZLES:</p>
          <div className='grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4'>
            {user.puzzles.map((puzzle, i) => {
              return (
                <Link
                key={i}
                      href={`/app/play/${puzzle.id}`}
                      className='block text-lg font-bold text-white'
                >

                <div
                  className='border rounded-md min-w-min h-48 flex flex-col-reverse cursor-pointer relative hover:transform hover:scale-105 transition duration-300'
                  style={{
                    backgroundImage: `url(${ogdURLS[i]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className='w-full bg-gradient-to-t from-black to-transparent p-2'>
                    
                      {puzzle.title}
                    {/* </Link> */}
                    {/* <button
                      className='bg-red-600 text-white px-4 py-2 rounded mt-2'
                      onClick={async () => {
                        const res = await fetch(`/api/puzzle?id=${puzzle.id}`, {
                          method: "DELETE",
                        });
                        const data = await res.json();
                        console.log(data);
                      }}
                    >
                      Delete
                    </button> */}
                  </div>
                </div>
                  </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
