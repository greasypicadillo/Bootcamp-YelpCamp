const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60e518aa808729aa5889a5b2',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price, 
            geometry: {
                type: "Point",
                coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dn6ugsdaa/image/upload/v1625696632/YelpCamp/dnffr397vha1hwbzcg6j.jpg',
                  filename: 'YelpCamp/dnffr397vha1hwbzcg6j'
                },
                {
                  url: 'https://res.cloudinary.com/dn6ugsdaa/image/upload/v1625696632/YelpCamp/hq57lq5qvv1lvtfnnbcc.jpg',
                  filename: 'YelpCamp/hq57lq5qvv1lvtfnnbcc'
                },
                {
                  url: 'https://res.cloudinary.com/dn6ugsdaa/image/upload/v1625696632/YelpCamp/tqcbh5pt4ui0m139cy06.jpg',
                  filename: 'YelpCamp/tqcbh5pt4ui0m139cy06'
                },
                {
                  url: 'https://res.cloudinary.com/dn6ugsdaa/image/upload/v1625696632/YelpCamp/qjodvotu7i979fihbzny.jpg',
                  filename: 'YelpCamp/qjodvotu7i979fihbzny'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})