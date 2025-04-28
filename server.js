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
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


mongoose
.connect("mongodb+srv://dacrafter247:W2Z6mFYEdRHIIAEe@dacrafter1cluster.wzgbxks.mongodb.net")
.then(() => {
  console.log("connected to mongodb");
})
.catch((error) => { 
  console.log("couldn't connect to mongodb");
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
  res.sendFile(__dirname + "/index.html");
});


app.get("/api/deities", (req, res)=>{
    const deities = [
            {
              "name": "Auronix, The Keeper of Laylines",
              "elemental_affinity": "Arcana",
              "description": "Auronix is the eternal guardian of the Laylines, the roots of magical energy that span the world of Arconia. Known as the creator of arcane magic, Auronix is believed to be one of the oldest and most powerful of the deities. With a gaze as sharp as a spellcaster's incantation, Auronix watches over the balance of magic, ensuring that it flows freely and harmoniously throughout the realms. Auronix holds domains over: Arcane Magic, Intelligent Creatures, Natural Elements, and Enchanting.",
              "gender": "Male",
              "side": "Radiance",
              "alignment": "Lawful Neutral",
              "personality": "Intelligent, Just, Protective, Guiding, Stern at times",
              "devoted_guilds": ["The Arcane Order", "The Arcanist's Lure", "The Enchanters Exalted"],
              "image": "Arcana--AuronixTheKeeperOfLaylines.JPG"
            }
            ,
            {
              "name": "Mertis, Creator of Planes",
              "elemental_affinity": "Creation",
              "description": "Mertis is the divine architect who forged the very fabric of existence, shaping planes and dimensions with boundless creativity. With each stroke of divine inspiration, Mertis breathes life into new worlds, crafting intricate tapestries of reality that teem with the wonders of creation. Mertis holds domains over: Creation of New Life, Invention, Assembly and Manufacturing, and Architecture.",
              "gender": "Male",
              "side": "Neutral",
              "alignment": "Neutral Good",
              "personality": "Wise, patient, and creative.",
              "devoted_guilds": ["Artisans Guild", "Architects Guild"],
              "image": "Creation--MertisCreatorOfPlanes.jpg"
            }
            ,
            {
              "name": "Dryntias, Queen of The Void",
              "elemental_affinity": "Darkness",
              "description": "Dryntias is the enigmatic ruler of the void, shrouded in darkness and mystery. With eyes that pierce the veil of shadows, she commands the forces of darkness, wielding their power with an air of regal authority that inspires awe and fear in equal measure. Dryintias holds domain over: Night, The Moon, Arachnids, Assassins, and Thieves.",
              "gender": "Female",
              "side": "Deceiver",
              "alignment": "Neutral Evil",
              "personality": "Cunning, Elusive, Deceiving, Observant, Tactical",
              "devoted_guilds": ["Artemis' Recurve", "Claw of the Wraith", "Cry of the Beast", "Deals with the Devil", "Joker's Apprentice", "Void Walkers"],
              "image": "Darkness--DryntiasQueenOfTheVoid.jpg"
            }
            ,
            {
              "name": "Baelzir, The Wrathful Worldeater",
              "elemental_affinity": "Destruction",
              "description": "Baelzir is the embodiment of destruction, a titanic force of chaos and upheaval that sweeps across the cosmos like a raging tempest. With every cataclysmic event, Baelzir's insatiable hunger consumes entire worlds, leaving nothing but desolation in its wake. Baelzir holds domain over: War, Famine, Strength, Victory, Death, and Vengeance.",
              "gender": "Male",
              "side": "Deceiver",
              "alignment": "Chaotic Evil",
              "personality": "Wrathful, Chaotic, Egotistical, Overconfident",
              "devoted_guilds": ["Call of the Reaper", "The Fortress Brotherhood"],
              "image": "Destruction--BaelzirTheWrathfulWorldeater.jpg"
            }
            ,
            {
              "name": "Alterr, The Great Earthbound",
              "elemental_affinity": "Earth",
              "description": "Alterr is the stalwart guardian of the earth, a towering colossus whose presence reverberates through the bedrock itself. With hands as vast as mountains, Alterr shapes the very landscape, sculpting mountains, valleys, and caverns with the patient precision of a master sculptor. Alterr holds domain over: Planets, Mountains, Durability, Patience, Foundation, and Strength.",
              "gender": "Male",
              "side": "Radiance",
              "alignment": "True Neutral",
              "personality": "Steadfast, Calm, Stoic, Wise, Patient, Bold",
              "devoted_guilds": ["Cry of the Beast", "Lunks", "Tekken Coalition"],
              "image": "Earth--AlterrTheGreatEarthbound.JPG"
            }
            ,
            {
              "name": "Ergovits, Champion of The Current",
              "elemental_affinity": "Energy",
              "description": "Ergovits is the embodiment of raw energy, a blazing beacon of power that illuminates the darkest corners of the universe. With every surge of electricity and burst of flame, Ergovits channels that boundless energy of creation, fueling their fire of life and voracity. Ergovits holds domain over: Thievery, Renewal, Cunning, Conquest, Ambition, Balance, and Freedom",
              "gender": "Male",
              "side": "Deceiver",
              "alignment": "Chaotic Neutral",
              "personality": "Spiteful, Overconfident, Cunning, Ambitoius",
              "devoted_guilds": ["Cry of the Beast", "The Way of the Current"],
              "image": "Energy--ErgovitsChampionOfTheCurrent.jpg"
            }
            ,
            {
              "name": "Ukpyrrha, Flame of The Ancients",
              "elemental_affinity": "Fire",
              "description": "Ukpyrrha is the eternal flame, a blazing inferno that burns with the fury of a thousand suns. With a blazing courage that echoes across the heavens, Ukpyrrha spreads warmth and light to all who bask in her radiance, igniting the passions of mortals and gods alike. Ukpyrrha holds domain over: Hearth, Courage, Forge, Warmth, Valor, Hope, Love, Passion, and Summer.",
              "gender": "Female",
              "side": "Radiance",
              "alignment": "Lawful Neutral",
              "personality": "Kind, Valorous, Courageous, Passionate, Caring",
              "devoted_guilds": ["Cry of the Beast", "The Bountiful Feast", "The Crested Catch", "The Iron Hearth", "The Phoenix Armament", "The Sea Dogs"],
              "image": "Fire--UkpyrrhaFlameOfTheAncients.jpg"
            }
            ,
            {
              "name": "Esso'ektu, The Unbounded Changeling",
              "elemental_affinity": "Form",
              "description": "Esso'ektu is the master of form, a shape-shifting enigma whose true nature eludes mortal comprehension. With a thousand faces and a thousand forms, Esso'ektu weaves illusions and alters perceptions, blurring the boundaries between reality and imagination. Esso'ektu holds domain over: Spies, Change, Beauty, Freedom, Adaptation, and Evolution.",
              "gender": "Non-Binary",
              "side": "Both",
              "alignment": "Chaotic Neutral",
              "personality": "Varies greatly, typically always Highly Intelligent",
              "devoted_guilds": ["The Shifter's Conclave"],
              "image": "Form--EssoektuTheUnboundedChangeling.jpg"
            }
            ,
            {
              "name": "Legyryx, The Planetary Force",
              "elemental_affinity": "Gravity",
              "description": "Legyryx is the cosmic anchor, a gravitational behemoth whose presence holds the very fabric of reality together. With a pull as inescapable as fate itself, Legyryx shapes the orbits of worlds and the trajectories of stars, guiding the dance of celestial bodies through the void. Legyryx holds domain over: Celestial Bodies, Attraction, Fate, and Pressure.",
              "gender": "Female",
              "side": "Radiance",
              "alignment": "Lawful Neutral",
              "personality": "Mystic, Thoughtful, Omnipresent, Resolute",
              "devoted_guilds": ["Cry of the Beast", "Force of Ardor", "Skywalker Kin"],
              "image": "Gravity--LegyryxThePlanetaryForce.jpg"
            }
            ,
            {
              "name": "Seirl-Ocryos, The Frozen Blade",
              "elemental_affinity": "Ice",
              "description": "Seirl-Ocryos is the icy sentinel, a frosty specter whose touch freezes the very marrow of the bones. With a gaze as cold as the heart of winter, Seirl-Ocryos blankets the world in a shimmering veil of ice, transforming landscapes into glittering expanses of frost and snow. Seirl-Ocryos holds domain over: Winter, Blizzards, Bitterness, Melancholy, and Fragility.",
              "gender": "Male",
              "side": "Deceiver",
              "alignment": "Neutral Evil",
              "personality": "Bitter, Vengeful, Stubborn, Ruthless, Keen",
              "devoted_guilds": ["Cry of the Beast", "The Glaciate Guard", "Whet Walkers"],
              "image": "Ice--Seirl-OcryosTheFrozenBlade.jpg"
            }
            ,
            {
              "name": "Mystliertis, The Vehement Trickster",
              "elemental_affinity": "Illusion",
              "description": "Mystliertis is the master of illusion, a cunning trickster whose deceptions confound even the most astute minds. With a mischievous glint in her eye, Mystliertis weaves illusions and fantasy, ensnaring mortals in a web of lies and deceit. Mystliertis holds domain over: Trickery, Imagination, Curiosity, Hope, and Playfulness.",
              "gender": "Female",
              "side": "Deceiver",
              "alignment": "Chaotic Evil",
              "personality": "Wily, Playful, Astute, Observant, Perceptive, Deceitful, Curious",
              "devoted_guilds": ["Holo Grandeur", "Occult of Laverna", "The Highland Shroud"],
              "image": "Illusion--MystliertisTheVehementTrickster.jpg"
            }
            ,
            {
              "name": "Seraline, The Undying Star",
              "elemental_affinity": "Light",
              "description": "Seraline is the radiant beacon, a luminous presence whose brilliance pierces the darkness of the night. With a glow as radiant as the sun itself, Seraline illuminates the heavens, guiding lost souls and weary travelers with her unwavering light. Seraline holds domain over: Healing, Divine Magic, The Sun, Peace, Kindness, and Charity.",
              "gender": "Female",
              "side": "Radiance",
              "alignment": "Lawful Good",
              "personality": "Motherly, Kind, Peaceful, Charitous, Heavenly",
              "devoted_guilds": ["Cry of the Beast", "Echo of the Wild", "The Divine Touch", "The Starlight Knights"],
              "image": "Light--SeralineTheUndyingStar.jpg"
            }
            ,
            {
              "name": "Orathis, The Eminent Stormborn",
              "elemental_affinity": "Lightning",
              "description": "Orathis is the storm incarnate, a tempestuous force of nature whose fury crackles across the skies. With a roar as thunderous as a war drum, Orathis unleashes bolts of lightning and torrents of rain, heralding the coming of the tempest with awe-inspiring majesty. Orathis holds domain over: Storms, Ionization, Electricity, Tenacity, Swiftness, Zeal, and Teleportation",
              "gender": "Male",
              "side": "Radiance",
              "alignment": "True Neutral",
              "personality": "Stoic, Zealous, Patriotic, Unyeilding when provoked, Tenacious",
              "devoted_guilds": ["Cry of the Beast", "Rage of the Wake", "Sanguine Wolverines", "The Blitz Riders", "The Clasp of Steel"],
              "image": "Lightning--OrathisTheEminentStormborn.jpg"
            }
            ,
            {
              "name": "Ferr'satox, The Mighty Shield",
              "elemental_affinity": "Metal",
              "description": "Ferr'satox is the unyielding fortress, a bastion of strength and resilience forged from the finest metals. With a clangor as resounding as a hammer on an anvil, Ferr'satox shapes steel and iron into impenetrable bulwarks, defending the realms from the ravages of war and strife. Ferr'satox holds domain over: Mines/Quarries, Minerals, Protection, Strength, Vigor, Knights, Forge, and Polarity.",
              "gender": "Male",
              "side": "Radiance",
              "alignment": "True Neutral",
              "personality": "Unyeilding, Resourceful, Defensive, Stoic, Protective, Vigorous",
              "devoted_guilds": ["The Taker's Refuge", "The Fortress Brotherhood", "The Iron Hearth", "Thread of Ariadne"],
              "image": "Metal-FerrsatoxTheMightyShield.jpg"
            }
            ,
            {
              "name": "Jelaneur, The Grand Eye Seer",
              "elemental_affinity": "Mind",
              "description": "Jelaneur is the omniscient observer, a seer whose gaze pierces the veil of time and space. With a wisdom as deep as the ocean's abyss, Jelaneur unravels the secrets of the cosmos, peering into the minds of mortals and gods alike with a clarity of vision that transcends mortal understanding. Jelaneur holds domain over: Dreams, Psychology, Fortune, Fate, Emotion, Choices, Telepathy, Intuition, Wisdom, Strategy",
              "gender": "Male",
              "side": "Deceiver",
              "alignment": "True Neutral",
              "personality": "Omnicient, Intelligent, Perceptive, Intuitive, Wise, Strategic",
              "devoted_guilds": ["Sight of the Neural"],
              "image": "Mind--JelaneurTheGrandEyeSeer.jpg"
            }
            ,
            {
              "name": "Viristyn, The Wild Mother",
              "elemental_affinity": "Nature",
              "description": "Viristyn is the nurturing embrace of the natural world, a verdant goddess whose essence suffuses every leaf and flower. With a touch as gentle as a breeze through the trees, Viristyn fosters life and growth, cultivating forests and meadows with the tender care of a loving parent. Viristyn holds domain over: Vitality, Flora, Fauna, Agriculture, Healing, Kindness, Patience, Druidic Magic, Spring, and Medicine.",
              "gender": "Female",
              "side": "Radiance",
              "alignment": "Lawful Good",
              "personality": "Motherly, Kind, Nurturing, Caring, Peaceful, Resourceful",
              "devoted_guilds": ["Cry of the Beast", "Echo of the Wild", "The Great Yield", "Thread of Ariadne"],
              "image": "Nature--ViristynTheWildMother.jpg"
            }
            ,
            {
              "name": "Venolisk, Corruptor of Realms",
              "elemental_affinity": "Poison",
              "description": "Venolisk is the toxic embrace, a venomous presence whose touch withers and decays all that it encounters. With a venom as potent as the deadliest serpent's bite, Venolisk spreads corruption and decay, poisoning the very essence of life itself. Venolisk holds domain over: Snakes, Disease, Corruption, Thieves, Toxins, Antidotes, Alchemy, and Spiders.",
              "gender": "Female",
              "side": "Deceiver",
              "alignment": "Neutral Evil",
              "personality": "Corruptive, Deceitful, Malignant, Toxic, Spiteful, Defensive",
              "devoted_guilds": ["Art of the Brew", "The Serpent Brotherhood"],
              "image": "Poison--VenoliskCorruptorOfRealms.jpg"
            }
            ,
            {
              "name": "Kershna, The Masked Espionage",
              "elemental_affinity": "Shadow",
              "description": "Kershna is the shadowy whisperer, a master of stealth and subterfuge whose presence eludes mortal detection. With a cloak as dark as midnight, Kershna slips through the shadows, weaving intricate webs of espionage and intrigue that ensnare mortals in a labyrinth of secrets. Kershna holds domain over: Thieves, Balance, Eclipses, Secrets, and Assassins.",
              "gender": "Female",
              "side": "Deceiver",
              "alignment": "Chaotic Evil",
              "personality": "Reclusive, Precise, Secretive, Silent",
              "devoted_guilds": ["Artemis' Recurve", "Claw of the Wraith", "Cry of the Beast", "Eyes of Pellonia", "The Hidden Blade", "The Hunt of the Gods", "The Shadows of Salem", "Vestige of the Eagle"],
              "image": "Shadow--KershnaTheMaskedEspionage.jpg"
            }
            ,
            {
              "name": "Yuk'Sylnor, The Shrouded Hunter",
              "elemental_affinity": "Smoke",
              "description": "Yuk'Sylnor is the elusive predator, a phantom of smoke and mist whose form flickers and wanes like a candle in the wind. With a scent as elusive as a whisper on the breeze, Yuk'Sylnor stalks the night, hunting with silent precision and lethal grace. Yuk'Sylnor holds domain over: Fog, Blindness, Messages, Survival, Warnings, and Shapelessness.",
              "gender": "Male",
              "side": "Deceiver",
              "alignment": "Chaotic Evil",
              "personality": "Savage, Relentless, Predatory, Elusive",
              "devoted_guilds": ["Claw of the Wraith", "Cry of the Beast", "The Black Rose Pirates", "Vail of the Shrouded"],
              "image": "Smoke--YukSylnorTheShroudedHunter.jpg"
            }
            ,
            {
              "name": "Madris, The Celestial Muse",
              "elemental_affinity": "Sound",
              "description": "Madris is the harmonic resonance, a symphony of sound and melody whose voice echoes through the cosmos. With a song as sweet as the morning birdsong, Madris inspires mortals to heights of creativity and expression, infusing the world with the transcendent power of music. Madris holds domain over: Music, Discord, Harmony, Echoes, and Communication.",
              "gender": "Male",
              "side": "Radiance",
              "alignment": "Neutral Good",
              "personality": "Passionate, Creative, Chatty, Extrovertive",
              "devoted_guilds": ["Lyre of the Gods", "The Madric Muse", "The Tide of Hades"],
              "image": "Sound--MadrisTheCelestialMuse.jpg"
            }
            ,
            {
              "name": "Verokinetis, Messenger of the Gods",
              "elemental_affinity": "Speed",
              "description": "Verokinetis is the swift-footed herald, a messenger whose speed rivals the very winds themselves. With a stride as swift as a lightning bolt, Verokinetis races across the realms, delivering tidings and prophecies with the urgency of a thunderclap. Verokinetis holds domain over: Messages, Haste, Travelers, and Velocity.",
              "gender": "Male",
              "side": "Radiance",
              "alignment": "Chaotic Good",
              "personality": "Fidgety, Social, Chronically Restless",
              "devoted_guilds": ["Boots of Hermes", "The Atlas Driven"],
              "image": "Speed--VerokinetisMessengerOfTheGods.jpg"
            }
            ,
            {
              "name": "Haedronmir, The Deep Mystic",
              "elemental_affinity": "Water",
              "description": "Haedronmir is the fathomless depths, a mystical presence whose waters hold the secrets of the universe. With a current as ancient as time itself, Haedronmir flows through the realms, shaping oceans and rivers with the wisdom of the ages. Haedronmir holds domain over: Bodies of Water, Rain, Storms, Aquatic Creatures, Sailors, Hurricanes, Rainy Season, Healing",
              "gender": "Male",
              "side": "Radiance",
              "alignment": "Lawful Neutral",
              "personality": "Stoic, Adaptable, Fair, Ruthless if provoked, Kind if gratified",
              "devoted_guilds": ["The Call of the Tides", "The Archeon Scourgers, Ralkor Shipping Co."],
              "image": "Water--HaedronmirTheDeepMystic.jpg"
            }
            ,
            {
              "name": "Aeropirr, The Four Winds",
              "elemental_affinity": "Wind",
              "description": "Aeropirr is the swirling tempest, a whirlwind of air and sky whose breath sweeps across the heavens. With a gust as mighty as a hurricane's roar, Aeropirr commands the four winds, guiding ships and birds alike with the invisible hand of fate. Aeropirr holds domain over: Clouds, Air Currents, Freedom, Archers, Tornadoes, and Autumn.",
              "gender": "Female",
              "side": "Radiance",
              "alignment": "Chaotic Neutral",
              "personality": "Ethereal, Calm, Sweet, Shy, Guiding, Artistic",
              "devoted_guilds": ["Cry of the Beast", "The Black Rose Pirates", "The Cyclone's Reach", "The Tide of Hades"],
              "image": "Wind--AeropirrTheFourWinds.jpg"
            },
          ]
    res.send(deities);
});


app.get("/api/characters", async (req, res) => {
  const characters = await Character.find();
  res.send(characters);
});


app.post("/api/characters", upload.single("image"), async(req, res) => {
  const result = validateCharacter(req.body);
  
  if (result.error) return res.status(400).send(result.error.details[0].message);

  const character = new Character ({
    name: req.body.name,
    classcomp: req.body.classcomp,
    agerace: req.body.agerace,
    affinity: req.body.affinity,
  });

  if(req.file){
    character.image = req.file.filename;
  }

  const newCharacter = await character.save();
  res.status(200).send(newCharacter);
});


app.put("/api/characters/:id", upload.single("image"), async (req, res) => {
  const result = validateCharacter(req.body);
  if (result.error) return res.status(400).send(result.error.details[0].message);

  const updatedCharacter = {
    name: req.body.name,
    classcomp: req.body.classcomp,
    agerace: req.body.agerace,
    affinity: req.body.affinity,
  }

  if (req.file) {
    updatedCharacter.image = req.file.filename;
  }

  const wentThrough = await Character.updateOne({ _id: req.params.id }, updatedCharacter);

  if (wentThrough.modifiedCount === 0) {
    return res.status(404).send("Character not found or no changes made.");
  }

  // Fetch the full updated character to send back to the client
  const character = await Character.findOne({ _id: req.params.id });

  res.send(character);  // Send back the full updated character object
});




app.delete("/api/characters/:id", async(req, res) => {
  const character = await Character.findByIdAndDelete(req.params.id);
  res.status(200).send(character);
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
  console.log("I'm listening");
});