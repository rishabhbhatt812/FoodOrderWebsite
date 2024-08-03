const mongoose = require("mongoose");

const URI = 'mongodb://localhost:27017/Food_app'

const mongoDB = async () => {
  await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
    console.log('connection sucessfully');
    const Fetched_data = await mongoose.connection.db.collection("Food_item");
    const data = await Fetched_data.find().toArray();
    const Fetched_Category = await mongoose.connection.db.collection("Food_category");
    const Category_data = await Fetched_Category.find().toArray();
    if (!data) {
      console.log('no data found');
    }
    if (!Category_data) {
      console.log('no category data found');
    }
    else {
      global.food_items = data;
      // console.log(global.food_items);
      global.food_category = Category_data;
    }
  }).catch((err) => console.log('no connection', err));
}


module.exports = mongoDB;
