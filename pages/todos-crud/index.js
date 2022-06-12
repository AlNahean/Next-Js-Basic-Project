import React, { useState, useEffect } from "react";
import { API } from "../../lib/axios/axios";

// const setDataByAxios = async () => {
//   const data = await API.get("/api/todos");
//   return data;
// };
const TodosCrud = ({ todos }) => {
  useEffect(() => {
    // setDataByAxios();
    return () => {};
  }, []);
  console.log(todos);
  return (
    <div>
      <div className=" container">
        {todos.map((item) => {
          return (
            <div key={item.id}>
              <div className=" badge bg-danger p-3 m-2 text-danger bg-opacity-25">
                {item.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const response = await API.get("/api/todos");

  //   let response2 = await fetch(
  //     "https://jsonplaceholder.typicode.com/users/1/todos"
  //   );
  //   let data = await response2.json();
  //   console.log(response.data.data, "data");
  return {
    props: {
      todos: response.data.data,
    },
  };
};

export default TodosCrud;
