import express from "express";
import { assignStudents,createMentor, displayStudentsbyMentor,displayMentor } from '../service/mentors.service.js'
const mentorsRouter = express.Router();

mentorsRouter.get("/", async (request, response) => {
  const result = await displayMentor();
  result
    ? response.send(result)
    : response.status(404).send({ message: "Failed !!!" });
});

//Task 5 : To show all the Students for a particular mentor
mentorsRouter.get("/:id", async (request, response) => {
  const { id } = request.params;
  const result = await displayStudentsbyMentor(id);
  result
    ? response.send(result)
    : response.status(404).send({ message: "Failed to Load the data" });
});

//Task 1 : To create a new Mentor
mentorsRouter.post("/", async (request, response) => {
  const newMentor = request.body;
  const result = await createMentor(newMentor);
  result
    ? response.send({ message: "Mentor added Successfully" })
    : response.status(404).send({ message: "Failed !!!" });
});

//TASK 3 : Assigning Students to a Mentor
mentorsRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const update = request.body;
  // console.log(update.students.length);
  const result = await assignStudents(id, update);

  if (update.students.length < 2)
    response.status(400).send({
      message: "Please assign more than One Student to a Mentor !!!!",
    });
  else {
    result || update.students.length >= 2
      ? response.send({ message: "Mentor Successfully updated" })
      : response.status(404).send(
          { message: "Failed to update Mentor data !!!!" },
          {
            studentsCount:
              "Please note Students count less than 2 shall not be shown",
          }
        );
  }
});

export default mentorsRouter;

