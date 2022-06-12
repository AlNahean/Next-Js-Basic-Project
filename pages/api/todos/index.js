const connectDB = require("../../../db/connect");
const Todos = require("../../../models/todos");
const PostInfo = require("../../../models/product");

let a = 1;

export default async function handler(req, res) {
  const { method } = req;
  await connectDB(
    "mongodb+srv://Nahean:nahean@cluster0.zb2uq.mongodb.net/nextTodo?retryWrites=true&w=majority"
  );

  switch (method) {
    case "GET":
      try {
        // let dataa = Todos.create({
        //   id: 1,
        //   title: "My Todo 2",
        //   description: "lorem afjksdghf asfdlasgdjkdf akljsdgaskjdfa asldgasb",
        // });
        // PostInfo.find({}).then((data) => {

        //   await res.status(200).json({ title: data });
        // });
        let data = await Todos.find({});
        // console.log(data, "data");

        a++;
        console.log(a, "a", method);

        await res.status(200).json({ data });

        // console.log(a, "after");
      } catch (error) {
        console.log(error, "desdasd");
        console.log(a, " after get err");

        res.status(400).json({ title: "failed" });
      }
      break;
    case "POST":
      try {
        console.log(req.body);

        let dataa = Todos.create({
          id: new Date().getTime(),
          ...req.body,
        });
        res.status(200).json({ data: req.body });
      } catch (error) {
        res.status(200).json({ title: "error" });
        console.log(a, "after post err");
      }
      break;

    case "DELETE":
      try {
        console.log(req.body);
        res.status(200).json({ status: "success" });
      } catch (error) {
        res.status(200).json({ title: "error" });
      }
      break;
  }
}
