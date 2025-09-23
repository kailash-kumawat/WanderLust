const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("Listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) //SHOW ROUTE
  .put(
    isLoggedIn,
    isOwner,
    upload.single("Listing[image]"),
    validateListing, 
    wrapAsync(listingController.updateListing)
  ) //UPDATE ROUTE
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); //DELETE ROUTE

//EDIT ROUTE
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
