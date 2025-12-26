const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express(); //Initialise express application instance used to start server and implement middleware

const PORT = 8000;

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
  res.json({ status: "pending" });
});

app.patch("/api/users/:id", (req, res) => {
  //TODO : Edit the user with id
});

app.delete("/api/users/:id", (req, res) => {
  //TODO : Delete the user with id
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
