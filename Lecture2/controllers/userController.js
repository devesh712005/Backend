let users = [
  {
    id: 1,
    name: "Devesh singh chauhan",
    email: "dschauhan8987@gmail.com",
  },
  {
    id: 2,
    name: "Aryan singh",
    email: "aryan@gmail.com",
  },
];

//get all users
exports.getUsers = (req, res) => {
  res
    .status(200)
    .json({ message: "users get successfully", success: true, users });
};

//get single user using id

exports.getUser = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    res.status(500).json({ message: "User not found", success: false });
  }
  res
    .status(200)
    .json({ message: "user get successfully", success: true, user });
};

//add user or create user
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: 1, name, email };
  users.push(newUser);
  res
    .status(200)
    .json({ message: "User added successfully", success: true, newUser });
};

//updateUser

exports.updateUser = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    res.status(500).json({ message: "user not found", success: false });
  }
  const { name, email } = req.body;
  if (name) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }
  res
    .status(200)
    .json({ message: "User updated successfully", success: true, user });
};

//delete user using id

exports.deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const exist = users.find((u) => u.id === id);
  if (!exist) {
    res
      .status(500)
      .json({ message: `User not found with id ${id}`, success: false });
  }
  users = users.filter((user) => user.id !== id);
  res.status(200).json({
    message: `user with id ${id} deleted successfully`,
    success: true,
    users,
  });
};
