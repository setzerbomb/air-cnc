const Booking = require("../models/Booking");

module.exports = {
  async store(req, res) {
    const { booking_id } = req.params;
    const booking = await Booking.findById(booking_id).populate("spot");

    const { user } = booking.spot;
    const { user_id } = req.headers;

    if (user == user_id) {
      booking.approved = true;

      await booking.save();

      const bookingUserSocket = req.connectedUsers[booking.user];

      if (bookingUserSocket) {
        req.io.to(bookingUserSocket).emit("booking_response", booking);
      }

      return res.json(booking);
    }

    return res.status(401).json({
      error: "Somente o dono do spot pode realizar essa operação"
    });
  }
};
