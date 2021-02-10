require('../models/User');

const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

beforeAll((done) => {
  done();
});

afterAll(async (done) => {
  console.log('Closing the mongoose connection...');
  // Closing the DB connection allows Jest to exit successfully.
  await mongoose.connection.close();
  done();
});
