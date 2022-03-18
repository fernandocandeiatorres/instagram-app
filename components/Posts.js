import React from "react";
import Post from "./Post";

const posts = [
  {
    id: "123",
    username: "fernandocandei",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    caption: "Instagram clone grinding it out!",
  },
  {
    id: "124",
    username: "fernandocandei",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    caption: "Instagram clone grinding it out!",
  },
];

export default function Posts() {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}
