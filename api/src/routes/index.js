const { Router } = require("express");
const postVideogame = require("../controllers/postVideogame");
const getGenres = require("../controllers/getGenres");
const getAllGenres = require("../controllers/getAllGenres");
const getVideogames = require("../controllers/getVideogames");
const getVideogameByName = require("../controllers/getVideogameByName");
const getVideogameById = require("../controllers/getVideogameById");

const router = Router();

router.get("/videogames", getVideogames);
router.get("/videogames/id/:id", getVideogameById);
router.get("/videogames/name", getVideogameByName);
// http://localhost:3001/videogames/name?name=The%20Last%20Of%20Us
router.get("/genres", getGenres);
router.get("/getallgenres", getAllGenres);
router.post("/videogames", postVideogame);

module.exports = router;
