import { client } from "../index.js";

export async function assignStudents(id, update) {
  return await client
    .db("mentorstudent")
    .collection("mentors")
    .updateMany({ id: id }, { $set: update });
}

export async function createMentor(newMentor) {
  return await client
    .db("mentorstudent")
    .collection("mentors")
    .insertMany(newMentor);
}

export async function displayStudentsbyMentor(id) {
  return await client
    .db("mentorstudent")
    .collection("mentors")
    .find({ id: id }, { _id: 0, id: 1, name: 1, topic: 0, students: 1 }).toArray();
}

export async function displayMentor() {
  return await client
    .db("mentorstudent")
    .collection("mentors")
    .find({})
    .toArray();
}
