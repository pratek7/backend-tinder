import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Cards from "./dbCards.js";
import dotenv from "dotenv";
mongoose.set("strictQuery", true);

dotenv.config({ path: "./.env" });
//App Config
const app = express();

//Middlewares
app.use(express.json());
app.use(Cors());

//DB Config
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log("DB connection successful");
  });

//API Endpoints
app.get("/", (req, res) => res.status(200).send("FINALLLY GUYZ"));

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Listner
app.listen(process.env.PORTS, () =>
  console.log(`Listening on localhost: ${process.env.PORTS}`)
);

export default app;
