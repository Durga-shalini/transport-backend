const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(process.env.MONGODB_URL, {
  })
    .then(() => console.log('DB Connected'))
    .catch(err => {
      console.error(' DB Connection Error:', err);
      process.exit(1);
    });
};