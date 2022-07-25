const express = require("express");
const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send(`HTML Fetcher Running On Port ${port} `);
});

app.listen(port, () => console.log(`app listening on port ${port}`));
