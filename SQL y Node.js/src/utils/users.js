let users = [];

//Join User to CHat

const addUser = (id, username, room) => {
  const user = {
    id,
    username,
    room,
  };

  users.push(user);
};

const removeUser = (id) => {
  users = users.filter((aUser) => aUser.id !== id);
};

const getCurrentUser = (id) => {
  return users.find((aUser) => aUser.id === id);
};

const getRoomUsers = () => {
  return users;
};

module.exports = {
  addUser,
  removeUser,
  getCurrentUser,
  getCurrentUser,
  getRoomUsers,
};
