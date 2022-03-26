const bookingController = require('./../controllers/bookingController');
const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/checkout-session/:tourid',authController.protect,bookingController.getCheckoutSession)


router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);


module.exports = router;
