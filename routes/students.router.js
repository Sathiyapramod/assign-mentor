import express from "express";
import {
  changeMentor,
  createStudent,
  displaystudent,
} from "../service/students.service.js";
const studentsRouter = express.Router();

//Task 2 : To create a Student
studentsRouter.get("/", async (request, response) => {
  const result = await displaystudent();
  result
    ? response.send(result)
    : response.status(404).send({ message: "Failed !!!" });
});
studentsRouter.post("/", async (request, response) => {
  const newStudent = request.body;
  const result = await createStudent(newStudent);
  result
    ? response.send({ message: "Success" })
    : response.status(404).send({ message: "Failed !!!!" });
});

//Task4 : To Assign or Change a Mentor for a particular Student

studentsRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const update = request.body;
  const result = await changeMentor(id, update);
  if (update.mentor.length == 1)
    response.send({ message: "(Default) Mentor assigned Successfully !!!!" });
  else if (update.mentor.length == 0)
    response
      .status(400)
      .send({ message: "Error ! Assign Atleast One Mentor " });
  else {
    result
      ? response.send({ message: "Mentor - Updation Done Successfully !!" })
      : response.status(404).send({ message: "Failed to Update !!! " });
  }
});

export default studentsRouter;
