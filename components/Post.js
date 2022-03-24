import React, { useState, useEffect } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

export default function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [isTruncate, setIsTruncate] = useState(true);

  // Listen to the comments
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
    return unsubscribe;
  }, [db, id]);

  // Listen to the likes
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

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
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}

            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* caption */}
      <div className="flex">
        <div
          className={`${
            isTruncate ? "truncate" : null
          } flex items-center overflow-clip`}
        >
          <p className={`${isTruncate ? "truncate" : null} p-4`}>
            {likes.length > 0 && (
              <p className="font-bold mb-1">
                {likes.length} {likes.length === 1 ? "like" : "likes"}
              </p>
            )}
            <span className="font-bold mr-1">{username}</span> {caption}
            {!isTruncate && (
              <button
                onClick={() => setIsTruncate(true)}
                className="text-xs inline font-semibold text-blue-300 ml-2"
              >
                view less
              </button>
            )}
          </p>
          {isTruncate && caption.length > 60 && (
            <button
              onClick={() => setIsTruncate(false)}
              className="text-xs font-semibold text-blue-300 mr-2"
            >
              view more
            </button>
          )}
        </div>
      </div>

      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={comment.data().userImage}
                alt="comment img"
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>

              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* input box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            placeholder="Add a comment..."
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border-none flex-1 focus:ring-0"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
