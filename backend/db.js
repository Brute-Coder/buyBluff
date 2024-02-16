const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://soumya_sekhar:Soumya4mongod@cluster0.qxqw8ei.mongodb.net/sillycartdb?retryWrites=true&w=majority&appName=AtlasApp';
const collectionName = 'cart_items';

const mongoConnect = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB Atlas');

    //Access the collection and fetch data
    const collection1 = mongoose.connection.db.collection("cart_items");
    const itemData = await collection1.find({}).toArray();
    const collection2 = mongoose.connection.db.collection("item_category");
    const itemCategory = await collection2.find({}).toArray();


    
    global.cart_items = itemData
    global.item_category = itemCategory

    //console.log(global.cart_items)
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

module.exports = mongoConnect;
