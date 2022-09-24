import "./App.css";

import React, { useState, useEffect } from "react";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("flower");

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://pixabay.com/api/?key=11264456-${process.env.REACT_APP_PIXBAY_API_KEY}&q=${search}&image_type=photo`
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
  }, []);
  return (
    <>
      <div className="max-w-sm px-6 py-4 overflow-hidden rounded shadow-lg">
        <img
          src="https://source.unsplash.com/random"
          alt=""
          className="w-full"
        />
        <div className="px-6 py-4">
          <div className="text-xl font-bold text-purple-500">
            Photo By ABC Joe
          </div>
          <ul>
            <li>
              <strong className=""> Views: </strong>
            </li>
            <li>
              <strong className=""> Downloads: </strong>
            </li>
            second
            <li>
              <strong className=""> Likes: </strong>
            </li>
            <li>
              <strong className=""> Views: </strong>
            </li>
          </ul>
        </div>

        <div className="px-6 py-4">
          <span className="inline-block px-3 py-1 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
            #tag1
          </span>
          <span className="inline-block px-3 py-1 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
            #tag2
          </span>
          <span className="inline-block px-3 py-1 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
            #tag3
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
