import { useState, useEffect } from "react";
import Link from "next/link";

const index = ({ posts }) => {
  const [Posts, setPosts] = useState(posts);

  //   console.log(posts, Posts, " post index .. line 5 ..");
  return (
    <div>
      <div className=" container">
        <h1 className=" mb-5">Posts List</h1>
        <ul className=" list-unstyled">
          {Posts.map((item) => {
            return (
              <li key={item.id} className=" bg-dark bg-opacity-50 m-1 p-2 ">
                <Link href={`/posts/${item.id}`}>
                  <a className=" text-white  h4 text-decoration-none mb-3">
                    {item.id}: {item.title}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const PostResponse = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const postData = await PostResponse.json();
  return {
    props: {
      posts: postData.slice(0, 20),
    },
  };
};

export default index;
