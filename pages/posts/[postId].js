import React from "react";
import { useRouter } from "next/router";
const postId = ({ post, comments }) => {
  const router = useRouter();

  if (router.isFallback) {
    // alert("fallback");
    console.log("fallback");
    return <h1 className=" text-info">Loading</h1>;
  } else {
    console.log("not fallback", router.isFallback);
  }
  // console.log(post);
  return (
    <div>
      <div className=" container">
        <div className=" row">
          <div className=" col-12">
            <div className="card ">
              <div className="card-body mt-5 mb-5">
                <h2 className=" text-primary">{post.title}</h2>
                <p>{post.body}</p>
              </div>
              <div className=" card-footer">
                <h3>Comments:</h3>
                {comments.map((item) => {
                  return (
                    <div key={item.id} className=" mb-4  p-4 ">
                      <h4 className=" ">
                        Name: <span className=" text-danger">{item.name}</span>
                      </h4>
                      <h6>Email: {item.email}</h6>
                      <p className=" text-muted">{item.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const getStaticPaths = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  let paths = data.slice(0, 15).map((item) => {
    return {
      params: {
        postId: `${item.id}`,
      },
    };
  });
  // console.log(paths);
  return {
    // paths: [{ params: { postId: "1" } }],
    paths: paths,
    fallback: true,
  };
};
export const getStaticProps = async (context) => {
  // console.log(context);//context gives params value
  let postId = context.params.postId;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const data = await response.json();
  const commentsResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  const commentsData = await commentsResponse.json();
  return {
    props: {
      post: data,
      comments: commentsData,
    },
  };
};

export default postId;
