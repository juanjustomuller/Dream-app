const router = require("express").Router();
const multer = require("multer");
const Listing = require("../models/Listing");
const User = require("../models/User");

/* Configuracion de Multer para la subida de files */
const storage = multer.diskStorage({
  // Configuración del destino donde se almacenarán los archivos
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); //'public/uploads' es el directorio donde se guardarán los archivos subidos
  },
  // Configuración del nombre del archivo
  filename: function (req, file, cb) {
    cb(null, file.originalname); //Se utiliza el nombre original del archivo
  },
});

const upload = multer({ storage });

/*CREATE LISTING*/
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    /*la info del form*/
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const listingPhotos = req.files;

    if (!listingPhotos) {
      return res.status(400).send("No file uloaded.");
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    await newListing.save();

    res.status(200).json(newListing);
  } catch (error) {
    res
      .status(409)
      .json({ message: "Fail to create Listing", error: error.message });
    console.log(error);
  }
});

/*GET LISTING BY CATEGORY*/
router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      listings = await Listing.find().populate("creator");
    }

    res.status(200).json(listings);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: error.message });
    console.log(error);
  }
});

/* GET LISTINGS BY SEARCH */
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;

  try {
    let listings = [];

    if (search === "all") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
        ],
      }).populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
});

/*GET LISTING DETAILS*/
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const listings = await Listing.findById(listingId).populate("creator");
    res.status(200).json(listings);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Listing can not be found!", error: error.message });
  }
});

module.exports = router;
