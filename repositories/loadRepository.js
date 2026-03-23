const Load = require('../models/Load');

exports.createLoad = (data) => Load.create(data);

exports.getAll = () => Load.find();

exports.getByUser = (userId) => Load.find({ createdBy: userId });

exports.deleteLoad = (id) => Load.findByIdAndDelete(id);