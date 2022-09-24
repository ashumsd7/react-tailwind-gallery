import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { BsFillCameraFill } from "react-icons/bs";
import FsLightbox from "fslightbox-react";
import party from "party-js";
import { saveAs } from "file-saver";

import {
  AiOutlineDownload,
  AiFillHeart,
  AiOutlineExpand,
} from "react-icons/ai";

import { FaCloudDownloadAlt } from "react-icons/fa";

function ImageCard({ image, index, patchImage }) {
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [currentlyShowing, setCurrentlyShowing] = useState([]);

  function onExpandImage(src) {
    let imgs = [];
    imgs.push(src);

    setCurrentlyShowing(imgs);

    setIsLightBoxOpen(!isLightBoxOpen);
  }

  function onImageDownload(imageURL) {
    saveAs(imageURL, "image.jpg");
  }
  return (
    <>
      <div className="h-[300px] hover:bg-pink-100 transition-all md:max-w-sm w-full px-6 py-4 m-1 relative flex flex-col overflow-hidden bg-gray-50 rounded shadow-lg">
        <div className="relative overflow-hidden">
          <img
            src={image.webformatURL}
            alt={image.id}
            className="object-cover w-full transition-all ease-in border border-pink-300 rounded-lg shadow-lg cursor-pointer hover:scale-150"
          />

          <div className="absolute flex items-center justify-center gap-2 px-2 text-xs font-bold bg-gray-200 rounded-lg top-1 bg-opacity-60 left-1">
            <BsFillCameraFill className="inline-block text-pink-600" />{" "}
            {image.user}
          </div>
          {/* downloads */}
          <div className="absolute bottom-0 z-10 flex gap-1 mx-2 font-bold text-white">
            <div>
              <AiOutlineDownload className="inline-block text-blue-600 list-none" />{" "}
              <small className=""> {image.downloads} </small>
            </div>

            <div>
              <AiFillEye className="inline-block text-green-400" />{" "}
              <small className=""> {image.views} </small>
            </div>

            <div>
              <AiFillHeart className="inline-block text-red-500" />{" "}
              <small className=""> {image.likes} </small>
            </div>
          </div>

          {/* for gredient */}
          <div className="absolute bottom-0 w-full bg-gray-800 rounded-md bg-opacity-60 h-7"></div>
        </div>

        <div className="flex-1"></div>

        <div className="p-4 my-2">
          {image.tags.split(",").map((tag) => {
            return (
              <small
                key={tag}
                className="inline-block p-1 mx-2 mt-1 font-semibold text-white bg-gray-500 rounded-full"
              >
                #{tag}
              </small>
            );
          })}
        </div>
        <div className="absolute flex gap-4 mt-2 font-extrabold bottom-2 right-2">
          <FaCloudDownloadAlt
            onClick={() => {
              onImageDownload(image.webformatURL);
            }}
            className="text-black cursor-pointer font-bolder"
          />
          <button
            className="mt-[-4px]"
            onClick={(e) => {
              party.sparkles(e.target, {});
              patchImage(index)
            }}
          >
            ❤️
            {/* <AiFillHeart className="text-red-500 cursor-pointer font-bolder"></AiFillHeart> */}
          </button>
          <AiOutlineExpand
            onClick={() => {
              onExpandImage(image.webformatURL);
            }}
            className="cursor-pointer font-bolder"
          />
        </div>
      </div>
      {/* View button */}

      <FsLightbox toggler={isLightBoxOpen} sources={currentlyShowing} />
    </>
  );
}

export default ImageCard;
