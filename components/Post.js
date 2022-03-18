import React, { useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/outline";

export default function Post({ id, username, userImg, img, caption }) {
  const [isTruncate, setIsTruncate] = useState(true);

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
          src={userImg}
          alt="user image"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* img */}
      <img src={img} className="object-cover w-full" alt="post image" />

      {/* Buttons */}
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          <HeartIcon className="btn" />
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>

      {/* caption */}
      <div className="flex">
        <div className={`${isTruncate ? "truncate" : null} flex items-center`}>
          <p className={`${isTruncate ? "truncate" : null} p-4`}>
            {/* add show more functionality on the truncate */}
            <span className="font-bold mr-1">{username}</span> {caption} Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Veritatis nostrum
            sint distinctio? Repellat perspiciatis omnis facere ratione autem
            cumque reiciendis neque, non, eos vitae eligendi voluptate,
            voluptatibus quod quas recusandae.
            {!isTruncate && (
              <button
                onClick={() => setIsTruncate(true)}
                className="text-xs inline font-semibold text-blue-300 ml-2"
              >
                view less
              </button>
            )}
          </p>
          {isTruncate && (
            <button
              onClick={() => setIsTruncate(false)}
              className="text-xs font-semibold text-blue-300 mr-2"
            >
              view more
            </button>
          )}
        </div>
      </div>

      {/* input box */}
      <form className="flex items-center p-4">
        <EmojiHappyIcon className="h-7" />
        <input
          placeholder="Add a comment..."
          type="text"
          className="border-none flex-1 focus:ring-0"
        />
        <button className="font-semibold text-blue-400">Post</button>
      </form>
    </div>
  );
}