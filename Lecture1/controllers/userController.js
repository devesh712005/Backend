let users = [
  { id: 1, name: "Devesh Singh", email: "devesh@gmail.com" },
  { id: 2, name: "Aryan Singh", email: "aryan@gmail.com" },
];

exports.getUsers = (req, res) => {
  res.status(200).json({ message: "Users fetched successfully", users });
};
