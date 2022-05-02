const moment = require('moment');

const formatMessages = (data) => {
  const { username, text } = data;
  return {
    username,
    text,
    time: moment().format('DD-MM-YYYY HH:mm:ss'),
  };
};

module.exports = {
  formatMessages,
};
