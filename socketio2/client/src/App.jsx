import React from "react";
import { useEffect } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { io } from "socket.io-client";
import { useState } from "react";
import { useMemo } from "react";
export const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
      socket.on("receive-message", (data) => {
        console.log(data);
      });
      socket.on("welcome", (msg) => {
        console.log(msg);
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Container>
      <Typography variant="h1" component="div" gutterBottom>
        Welcome to socket.io
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Outlined"
          varient="outlined"
        />
        <Button type="submit" variant="conatined" color="primary">
          send
        </Button>
      </form>
    </Container>
  );
};
