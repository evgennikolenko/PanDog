const uid = require('node-uid');
const Products = require('./../models/products');
const AnimalsReviews = require('./../models/animalsRevies');
const Order = require('./../models/order');
const User = require('./../models/user');

/*
 * Get all animals /api/animals
 */
module.exports.getAnimals = async function (req, res) {

    try {
      let animals = await Products.find({}).sort([['createdAt', -1 ]]);

      animals = animals.map( (item) => {
          const { available, animalId, src, type, breed, age, cost, location, discount} = item;
          return {
              available,
              id: animalId,
              src,
              type,
              breed,
              age,
              cost,
              location,
              discount
          };
      });
      res.status(200);
      res.send(animals);
    } catch (e) {
        console.log(e);
    }
};

/*
 * Function return animal from /api/animals/:id with reviews
 */
module.exports.getAnimal = async function (req, res) {
    try {

        let animal = await Products.findOne({ animalId: req.params.id});

        const reviews =  await  AnimalsReviews.findOne({ id: animal.reviews}).sort([['createdAt', -1 ]]);

        const { available, animalId, src, type, breed, age, cost, location, discount} = animal;

            animal =  {
                available,
                id: animalId,
                src,
                type,
                breed,
                age,
                cost,
                location,
                discount
            };

       const rebAnimal = {
           ...animal,
           reviews: {
               body: reviews.reviews,
               create: reviews.createdAt,
               lastMod: reviews.updatedAt
           }
       };
        res.status(200);
        res.send(rebAnimal);
    } catch (e) {
        console.log(e);
    }
};

/*
 * Add animal (only admin) /api/animals/create
 */
module.exports.addAnimals = async function (req, res) {
    const animal = {
        ...req.body,
        animalId: uid(),
        photos: uid(),
        reviews: uid()
    };

    const animals = await new Products(animal);
    const reviews = await new AnimalsReviews({ id: animal.reviews });

    try {
        await animals.save();
        await reviews.save();
        res.status(201);
        res.send({message: 'created'})
    } catch (e) {
      console.log(e);
        res.status(403);
    }
};

/*
 * Function to add reviews after api/animals/createReview
 */
module.exports.addReviewToAnimal = async function (req, res) {
    const { review } = req.body;

    let animal = await Products.findOne({ animalId: req.params.id});

    try {
        await AnimalsReviews.updateOne(
            { id: animal.reviews },
            { reviews: review },
            (err) => {
                if(err) {
                    res.status(400);
                }
            });
    } catch (e) {
        console.log(e);
    }

};

/*
 * Function adds user`s order ---> api/animals/createOrder
 * Order has moderatorId, and userId
 */
module.exports.createOrder = async function (req, res) {
    const clientOrder = req.body;

    const moderators = await User.find({role: 'moderator'});
    const rand = Math.floor(Math.random() * moderators.length);
    const currModer = moderators[rand];

    const orderObj = {
        ...clientOrder,
        id: uid(),
        moderatorId: currModer._id
    };

    const order = new Order(orderObj);

    try {
        order.save();
        res.status(201);
        res.send({message: ' Order was created'})
    } catch (e) {
        console.log(e);
    }
};