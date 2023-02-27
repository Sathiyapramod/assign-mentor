import { client } from "../index.js";

export async function changeMentor(id, update) {
  return await client
    .db("mentorstudent")
    .collection("students")
    .updateMany({ id: id }, { $set: update });
}

export async function createStudent(newStudent) {
  return await client
    .db("mentorstudent")
    .collection("students")
    .insertMany(newStudent);
}

export async function displaystudent() {
  return await client
    .db("mentorstudent")
    .collection("students")
    .find({})
    .toArray();
}
