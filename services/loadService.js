const repo = require('../repositories/loadRepository');
const { sendNotification } = require('../utils/notificationService');

exports.createLoad = async (data, userId) => {
  const load = await repo.createLoad({ ...data, createdBy: userId });

  sendNotification(`${data.origin} → ${data.destination}`);

  return load;
};

exports.getLoads = (role, userId) => {

  if (role === 'ADMIN') return repo.getAll();

  if (role === 'BUYSELL') return repo.getByUser(userId);

  if (role === 'TRANSPORTER') return repo.getAll();
};

exports.deleteLoad = (id) => repo.deleteLoad(id);