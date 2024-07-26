const router = require("express").Router();
const Booking = require("../models/Booking")

/*GET A TRIP LIST*/
router.get("/:userId/trips", async (req, res) => {
    try {
        const {userId} = req.params
        const trips = await Booking.find({ customerId: userId}).populate("customerId hostId listingId")
        res.status(200).json(trips)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Can not find trips", error: error.message})
    }
})

module.exports = router