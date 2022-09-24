import "./App.css";

import React, { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";
import { AiFillGithub } from "react-icons/ai";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXBAY_API_KEY}&q=${search}&image_type=photo`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [search]);
  return (
    <>
      <div className="container relative h-[100vh-20px] mx-auto bg-gray-100">
        <h3 className="my-4 font-serif text-3xl italic font-semibold text-center text-pink-500 ">
          {" "}
          Image Gallery ft. React{" "}
        </h3>

        <ImageSearch
          setText={(val) => {
            setSearch(val);
          }}
        />

        {!isLoading && images.length == 0 && (
          <h1 className="mx-auto mt-32 text-5xl text-center">
            No Images found....
          </h1>
        )}

        {isLoading ? (
          <h1 className="mx-auto mt-32 text-3xl text-center">Loading....</h1>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {images.map((image) => {
              return <ImageCard key={image.id} image={image} />;
            })}
          </div>
        )}
      </div>

      <div className="fixed flex items-center justify-center w-10 h-10 text-white transition-all bg-black rounded-full cursor-pointer right-4 bottom-4 hover:rotate-360 hover:bg-pink-500 hover:text-black hover:scale-125 ">
        <a target='_blank' className="mx-2 underline" href="https://github.com/ashumsd7">
          <AiFillGithub />
        </a>
      </div>

      <div className="flex items-center justify-center h-10 font-serif text-2xl italic font-semibold text-center text-pink-500 ">
        Built by 💝{" "}
        <a className="mx-2 underline" href="https://github.com/ashumsd7">
          Ashu
        </a>
      </div>
    </>
  );
}

export default App;
