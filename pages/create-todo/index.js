import React, { useState, useEffect } from "react";
import { API } from "../../lib/axios/axios";

import { BiPencil } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

//Common function
const getDataByAxios = async () => {
  const response = await API.get("/api/todos");
  // console.log(response.data.data);
  let data = response.data.data;
  return data;
};
const CreateTodo = ({ todos }) => {
  const [Todos, setTodos] = useState(todos);
  const [todo, setTodo] = useState({ title: "", descreption: "" });
  const [fill, setFill] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    // getDataByAxios();
    return () => {};
  }, []);

  useEffect(() => {
    //this will never get trigerd 🙂🙂🙂
    if (todo.title || todo.descreption) {
      setFill(false);
    }
    return () => {};
  }, [todo]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!isEditing) {
      // let formData = new FormData();

      // formData.append("title", todo.title);
      // formData.append("descreption", todo.descreption);
      // formData.append("id", new Date().getTime());

      if (todo.title) {
        let data = await API.post(`/api/todos`, todo);
        console.log(data);

        let d = await getDataByAxios();

        setTodos(d);
        setTodo({ title: "", descreption: "" });
      }

      if (todo.title === "" || todo.descreption === "") {
        setFill(true);
      }
    } else {
      if (todo.title) {
        let data = await API.patch(`/api/todos/${todo._id}`, todo);
        console.log(data);

        let d = await getDataByAxios();

        setTodos(d);
        setTodo({ title: "", descreption: "" });
        setIsEditing(false);
      }

      if (todo.title === "" || todo.descreption === "") {
        setFill(true);
      }
    }
  };

  const deleteItem = async (id) => {
    // console.log(id);
    const res = await API.delete(`/api/todos/${id}`);

    let d = await getDataByAxios();

    setTodos(d);
  };

  const editItem = async (item) => {
    console.log(item);
    setTodo(item);
    setIsEditing(true);
    // const res = await API.patch(`/api/todos${_id}`, todo);

    // let d = await getDataByAxios();
    // setTodos(d);
  };
  const confirmEdit = async () => {};
  const cancelEdit = async () => {};
  return (
    <div
      className=" center"
      style={{
        minHeight: "100vh",
      }}
    >
      <div className=" container bg-dark bg-opacity-10">
        <div className=" w-100 center text-primary m-3">
          <h1>Todo App</h1>
        </div>
        <form
          className=" form w-100 p-5 mb-5"
          onSubmit={(e) => {
            handleFormSubmit(e);
          }}
        >
          {fill && (
            <div className=" w-100 text-center badge bg-danger bg-opacity-10 text-danger p-4">
              Enter Title and descteption
            </div>
          )}
          <div className=" mb-3">
            <label className=" form-label">Title</label>
            <input
              required
              value={todo.title}
              type="text"
              className=" form-control"
              placeholder="Enter Title"
              onChange={(e) => {
                setTodo({
                  ...todo,
                  title: e.target.value,
                });
              }}
            />
          </div>
          <div className=" mb-3">
            <label className=" form-label">Descreption</label>
            <textarea
              required
              value={todo.descreption}
              type="text"
              className=" form-control"
              placeholder="Enter Descreption"
              rows={5}
              onChange={(e) => {
                setTodo({
                  ...todo,
                  descreption: e.target.value,
                });
              }}
            />
          </div>

          {isEditing ? (
            <div className=" w-100 d-flex justify-content-end ">
              <div
                className=" btn btn-danger me-2 text-white"
                onClick={() => {
                  setTodo({ title: "", descreption: "" });
                  setIsEditing(false);
                }}
              >
                Cancel
              </div>
              <button className=" btn btn-primary">Update</button>
            </div>
          ) : (
            <div className=" w-100 d-flex justify-content-end ">
              <button className=" btn btn-primary">Submit</button>
            </div>
          )}
        </form>

        {todo.title && (
          <div>
            <div className=" bg-primary p-3 m-3 rounded-3  text-primary bg-opacity-10  text-center ">
              <h4>{todo.title}</h4>
              <p>{todo?.descreption}</p>
            </div>
          </div>
        )}
        <div className=" w-100 p-3">
          {Todos.map((item) => {
            return (
              <div key={item.id}>
                <div className=" bg-dark p-3 mb-3 text-primary bg-opacity-10 w-100 d-flex justify-content-between align-items-center">
                  <div>{item.title}</div>
                  <div className=" d-flex">
                    <div
                      className=" text-primary me-2 center"
                      style={{ fontSize: "1.5rem" }}
                      onClick={() => {
                        editItem(item);
                      }}
                    >
                      <BiPencil />
                    </div>
                    <div
                      className=" text-danger  center"
                      style={{ fontSize: "1.5rem" }}
                      onClick={(e) => {
                        deleteItem(item._id);
                      }}
                    >
                      <AiFillDelete />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const response = await API.get("/api/todos");

  let data = await getDataByAxios();
  return {
    props: {
      todos: data,
    },
  };
};

export default CreateTodo;
