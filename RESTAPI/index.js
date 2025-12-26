const express = require("express");
const fs = require("fs");
let users = require("./MOCK_DATA.json");
const app = express(); //Initialise express application instance used to start server and implement middleware

const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.get("/users", (req, res) => {
  const html = `
  <ul>
      ${users.map((user) => `<li> ${user.first_name} </li>`).join("")}
  </ul>
  `;
  res.send(html);
  return;
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  let user = users.find((user) => user.id === id);
  return res.json(user);
});

app.post("/api/users", (req, res) => {
  //TODO : Create new users
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.patch("/api/users/:id", (req, res) => {
  //TODO : Edit the user with id
});

app.delete("/api/users/:id", (req, res) => {
  //TODO : Delete the user with id
  const id = Number(req.params.id);
  let initialLength = users.length;
  users = users.filter((user) => user.id !== id);
  if (users.length === initialLength) {
    return res.status(404).json({ message: "User not found" });
  }
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    if (err) {
      return res.status(500).json({ message: "File write failed" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
