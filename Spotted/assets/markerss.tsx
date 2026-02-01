const { MongoClient } = require('mongodb');

async function runGetStarted() {
  // Replace the uri string with your connection string
  const uri = "mongodb+srv://hafsadvani_db_user:63YEoYdLMwBnbeiV@spotted.nphv9a7.mongodb.net/";
  const client = new MongoClient(uri);

  try {
    const database = client.db('spotted_data');
    const movies = database.collection('buildings');

    // Queries for a movie that has a title value of 'Back to the Future'
    const query = { name: 'Vari Hall' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    await client.close();
  }
}
runGetStarted().catch(console.dir);
