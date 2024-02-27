const { Router } = require("express");
// ?------------------------------------------------------ Videogames

const postVideogame = require("../controllers/postVideogame");
const getDbVideogames = require("../controllers/getDbVideogames");
const getVideogameByName = require("../controllers/getVideogameByName");
const getVideogameById = require("../controllers/getVideogameById");
const getAllVideogames = require("../controllers/getAllVideogames");
const getApiVideogames = require("../controllers/getApiVideogames");
const getVideogameByIdAPI = require("../controllers/getApiVideogamesByIdAPI");

// ?------------------------------------------------------ Genres

const getGenres = require("../controllers/getGenres");
const getAllGenres = require("../controllers/getAllGenres");

// ?------------------------------------------------------ Platforms

const getPlatforms = require("../controllers/getPlatforms");
const getAllPlatforms = require("../controllers/getAllPlatforms");

// !------------------------------------------------------ Router ----------------------------------------------------------------

const router = Router();

// ?------------------------------------------------------ Videogames

router.get("/apivideogames", getApiVideogames);
router.get("/dbvideogames", getDbVideogames);
router.get("/videogames/id/:id", getVideogameById);
router.get("/videogames/idapi/:id", getVideogameByIdAPI);
router.get("/videogames/name", getVideogameByName);
router.get("/videogames", getAllVideogames);
router.post("/videogames", postVideogame);

// ?------------------------------------------------------ Genres

router.get("/genres", getGenres);
router.get("/getallgenres", getAllGenres);
// ?------------------------------------------------------ Platforms

router.get("/platforms", getPlatforms);
router.get("/getallplatforms", getAllPlatforms);

module.exports = router;
