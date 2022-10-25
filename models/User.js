const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  courses: {
    name: String,
    type: {
      courseId: {type: String, required: true},
      courseName: {type: String, required: true},
      startDate: {type: String, required: true},
      endDate: {type: String, required: true},
    }
  }
});
