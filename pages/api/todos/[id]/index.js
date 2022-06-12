import connectDB from "../../../../db/connect";
import Todos from "../../../../models/todos";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await connectDB(
    "mongodb+srv://Nahean:nahean@cluster0.zb2uq.mongodb.net/nextTodo?retryWrites=true&w=majority"
  );

  switch (method) {
    case "GET":
      try {
        const data = await Todos.findById(id);
        console.log(data, "asdd");
        res.status(200).json({ title: id });
      } catch (error) {
        console.log(error);
        res.status(400).json({ title: id, status: "failed" });
      }
      break;
    case "POST":
      try {
      } catch (error) {}
      break;
    case "PATCH":
      try {
        const response = await Todos.findByIdAndUpdate(id, {
          title: req.body.title,
          descreption: req.body.descreption,
        });
        console.log(id);
        await res.status(200).json({ title: id, status: "success" });
      } catch (error) {
        await res.status(400).json({ title: id, status: "failed" });
      }
      break;
    case "DELETE":
      try {
        console.log(req.body, id);

        const response = await Todos.deleteOne({ _id: id });

        res.status(200).json({ title: "success" });
      } catch (error) {
        console.log(req.body, id);

        res.status(200).json({ title: "error" });
      }
      break;

    default:
      break;
  }
}
