import React from "react";

const index = ({ todos }) => {
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
  let response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1/todos"
  );
  let data = await response.json();
  console.log(data);
  return {
    props: {
      todos: data,
    },
  };
};

export default index;
