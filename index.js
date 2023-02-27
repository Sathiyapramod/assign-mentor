import express from "express";
import studentsRouter from "./routes/students.router.js";
import mentorsRouter from "./routes/mentors.router.js";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;
export const client = new MongoClient(MONGO_URL); //dialing operation
await client.connect(); //This is a calling operation

app.use(express.json());  //to use as middleware 
app.get("/", (request, response) => {
  response.send({"message":"Hello World !!! 😉"})
});

app.use("/students", studentsRouter) //to route the Students data
app.use("/mentors",mentorsRouter); //to route the Mentors Data

app.listen(PORT, () =>
  console.log(`The Server is running on the port : ${PORT} 😉`)
);
