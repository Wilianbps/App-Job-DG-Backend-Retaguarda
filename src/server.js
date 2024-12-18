import app from "./app.js";

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log("Server running on port 3005");
});
