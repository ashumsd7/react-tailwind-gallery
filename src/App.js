import "./App.css";

import React, { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";
import { AiFillGithub } from "react-icons/ai";

function App() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [randomWords, setRandomWords] = useState([]);

  function patchImage(index) {
    let allImages = [...images];
    allImages[index].likes++;
    setImages(allImages);
  }

  useEffect(() => {
    setSearch(search);
    setIsLoading(true);

    fetch("https://random-word-api.herokuapp.com/all")
      .then((res) => res.json())
      .then((data) => {
        console.log(Math.floor(Math.random() * 100), 6)
        console.log(data.splice(Math.floor(Math.random() * 100), 6));
        setRandomWords(data.splice(Math.floor(Math.random() * 100), 6));
      });
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
          search={search}
          setText={(val) => {
            setSearch(val);
          }}
        />


      <div className="mx-2 font-thin"> What About these  ?</div>

        <div className="text-teal-300">
          {randomWords.map((word) => {
            return (
              <small
                key={word}
                className="inline-block p-1 mx-2 mt-1 font-semibold text-white bg-gray-500 rounded-full cursor-pointer"
                onClick={() => {
                  setSearch(word);
                }}
              >
                #{word}
              </small>
            );
          })}
        </div>

        {!isLoading && images.length === 0 && (
          <>
            <img
              className="object-cover mx-auto"
              alt={images.id}
              src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-4064375-3363936.png"
            ></img>
            <h2 className="font-thin text-center shadow-sm">No Image found.</h2>
          </>
        )}

        {isLoading ? (
          <h1 className="mx-auto mt-32 text-3xl text-center">
            <img
              className="object-cover mx-auto rounded-lg"
              alt="loader"
              src="https://img.wattpad.com/7aa89868baf6ee5de7f403c4268647c3b79b22d8/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f734936746a613772424c4c4b6b673d3d2d313236343335303932332e313731303439326530656433376464623436393936383138383338312e676966"
            ></img>
          </h1>
        ) : (
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {images.map((image, index) => {
              return (
                <ImageCard
                  key={image.id}
                  index={index}
                  patchImage={patchImage}
                  image={image}
                  setSearch={setSearch}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="fixed flex items-center justify-center w-10 h-10 text-white transition-all bg-black rounded-full cursor-pointer right-4 bottom-4 hover:rotate-360 hover:bg-pink-500 hover:text-black hover:scale-125 ">
        <a className="mx-2 underline" href="https://github.com/ashumsd7">
          <AiFillGithub />
        </a>
      </div>

      {!isLoading && images.length !== 0 && (
        <div className="flex items-center justify-center h-10 font-serif text-2xl italic font-semibold text-center text-pink-500 ">
          Built by 💝{" "}
          <a className="mx-2 underline" href="https://github.com/ashumsd7">
            Ashu
          </a>
        </div>
      )}
    </>
  );
}

export default App;
