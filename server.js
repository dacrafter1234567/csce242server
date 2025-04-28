const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const mongoose = require("mongoose");
const multer = require("multer");

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use("/images", express.static("images"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Uploading file to ./public/images/");  // Log file upload destination
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    console.log(`Saving file with name: ${file.originalname}`);  // Log the file name
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

mongoose
.connect("mongodb+srv://dacrafter247:W2Z6mFYEdRHIIAEe@dacrafter1cluster.wzgbxks.mongodb.net/")
.then(() => {
  console.log("connected to mongodb");
})
.catch((error) => { 
  console.log("couldn't connect to mongodb", error);  // Log the error message
});


const characterSchema = new mongoose.Schema({
  name:String,
  classcomp:String,
  agerace:String,
  affinity:String,
  image:String
});

const Character = mongoose.model("Character", characterSchema);

app.get("/", (req, res) => {
  console.log("Serving the index.html page");
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/deities", (req, res) => {
  console.log("Fetching deities data");
  const deities = [
          // Add deities here
    ];
  res.send(deities);
});

app.get("/api/characters", async (req, res) => {
  console.log("Fetching characters from database");
  try {
    const characters = await Character.find();
    res.send(characters);
  } catch (error) {
    console.error("Error fetching characters:", error);  // Log any error while fetching characters
    res.status(500).send("Internal server error");
  }
});

app.post("/api/characters", upload.single("image"), async (req, res) => {
  console.log("Received POST request to create a new character");
  console.log("Received data:", req.body); // Log request body
  console.log("Received file:", req.file); // Log the file data

  const result = validateCharacter(req.body);

  if (result.error) {
    console.error("Validation error:", result.error.details[0].message);  // Log validation error
    return res.status(400).send(result.error.details[0].message);
  }

  const character = new Character({
    name: req.body.name,
    classcomp: req.body.classcomp,
    agerace: req.body.agerace,
    affinity: req.body.affinity,
  });

  if (req.file) {
    character.image = req.file.filename;
  }

  try {
    const newCharacter = await character.save();
    console.log("Character saved successfully:", newCharacter);
    res.status(200).send(newCharacter);
  } catch (error) {
    console.error("Error saving character:", error);  // Log any error while saving character
    res.status(500).send("Internal server error");
  }
});

app.put("/api/characters/:id", upload.single("image"), async (req, res) => {
  console.log(`Received PUT request to update character with id: ${req.params.id}`);
  
  const result = validateCharacter(req.body);
  if (result.error) {
    console.error("Validation error:", result.error.details[0].message);  // Log validation error
    return res.status(400).send(result.error.details[0].message);
  }

  const updatedCharacter = {
    name: req.body.name,
    classcomp: req.body.classcomp,
    agerace: req.body.agerace,
    affinity: req.body.affinity,
  };

  if (req.file) {
    updatedCharacter.image = req.file.filename;
  }

  try {
    const wentThrough = await Character.updateOne({ _id: req.params.id }, updatedCharacter);
    console.log(`Update result: ${wentThrough.modifiedCount} documents modified`);

    if (wentThrough.modifiedCount === 0) {
      console.warn("Character not found or no changes made.");
      return res.status(404).send("Character not found or no changes made.");
    }

    const character = await Character.findOne({ _id: req.params.id });
    console.log("Character updated successfully:", character);
    res.send(character);
  } catch (error) {
    console.error("Error updating character:", error);  // Log any error while updating character
    res.status(500).send("Internal server error");
  }
});

app.delete("/api/characters/:id", async (req, res) => {
  console.log(`Received DELETE request to delete character with id: ${req.params.id}`);
  
  try {
    const character = await Character.findByIdAndDelete(req.params.id);
    if (!character) {
      console.warn("Character not found for deletion.");
      return res.status(404).send("Character not found");
    }
    console.log("Character deleted successfully:", character);
    res.status(200).send(character);
  } catch (error) {
    console.error("Error deleting character:", error);  // Log any error while deleting character
    res.status(500).send("Internal server error");
  }
});

const validateCharacter = (character) => {
  const schema = Joi.object({
    _id:Joi.allow(""),
    name:Joi.string().required(),
    classcomp:Joi.string().required(),
    agerace:Joi.string().required(),
    affinity:Joi.string().required(),
    image:Joi.allow("")
  });

  return schema.validate(character);
};

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
