const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/transportDB', {
  })
    .then(() => console.log('DB Connected'))
    .catch(err => {
      console.error(' DB Connection Error:', err);
      process.exit(1);
    });
};