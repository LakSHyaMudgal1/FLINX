const { MongoClient } = require('mongodb');

let db;

const connectToDatabase = async () => {
  if (db) {
    return db; // Return existing connection if already connected
  }

  const uri = 'mongodb+srv://Lakshya_14:lakshyaQY123456@namastenode.ydqyi.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNode'; // Replace with your connection string
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    db = client.db('College_project'); // Replace with your database name
    console.log('Connected to MongoDB!');
    return db;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};

module.exports = { connectToDatabase };
