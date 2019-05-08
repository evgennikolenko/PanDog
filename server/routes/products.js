const express = require('express');

const products = require('./../controllers/products');

const router = express.Router();

router.get('/animals', products.getAnimals);

router.get('/animals/:id', products.getAnimal);

router.post('/animals/create', products.addAnimals);

router.post('/animals/createReview', products.addReviewToAnimal);

router.post('/animals/createOrder', products.createOrder);

module.exports = router;