const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
);


app.use(express.json());

app.use(cookieParser());
const port = process.env.PORT || 4000

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userAuth = [
    { email_id: "sample@gmail.com", password: "1234" },
    { email_id: "sample1@gmail.co", password: "9876" },
  ];
  const isMatchingCredential = userAuth.some(
    (credential) =>
      credential.email_id === email && credential.password === password
  );
  if (isMatchingCredential) {
    // email_id and password match a credential in userAuth
    res.json({ isMatchingCredential });
  } else {
    // email_id and password do not match any credentials in userAuth
    res.json({ isMatchingCredential });
  }
});

// insert text
app.post("/message", async (req, res) => {
  const { message } = req.body;
  res.cookie("message", message).json({ status: "true" });
});

// search text
app.get("/message", async (req, res) => {
  const query = req.query;
  const cookieMessage = req.cookies.message;
  const text = query.text;
  const searchString = query.text;
  if (cookieMessage.includes(searchString)) {
    res.json({ text: searchString });
  } else {
    res.json({ text: "Message Not Found" });
  }

});

// clear text
app.get("/clear", (req, res) => {
  res.clearCookie("message").json({ status: "true" });
});

// logout
app.get("/logout", async (req, res) => {
  res.json({ status: "true" });
});

app.get("/", (req, resp) => {
  resp.json("server start")
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
