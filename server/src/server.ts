import app from "./app";
const express = require('express');

const PORT = 5005;

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
