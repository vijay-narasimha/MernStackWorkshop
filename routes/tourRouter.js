const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRouter');

const Router = express.Router();


Router.use('/:tourid/reviews', reviewRouter);

Router.route('/top-5-tours').get(
  tourController.aliasTopTour,
  tourController.getAllTours
);

Router.route('/tour-stats').get(tourController.getTourStats);
Router.route('/monthly-plan/:year').get(
  authController.protect,
  authController.restrictTo('admin', 'lead-guide', 'guide'),
  tourController.getMonthlyPlan
);
Router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(
  tourController.getTourWithin
);

Router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

Router.route('/')
  .get(tourController.getAllTours)
  .post(
     authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

Router.route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = Router;
