const express = require("express");
const cors = require("cors");
const axios = require("axios");
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  const pk = process.env.PRIVATE_KEY
  try {
    const r = await axios.put(
        "https://api.chatengine.io/users/", {
            username: username,
            secret: username,
            first_name: username
        },
        {headers: {"Private-key": pk}}
    );
    return res.status(r.status).json(r.data)
  } catch (error) {
    if (error.response) {
      // If error has a response object
      return res.status(error.response.status).json(error.response.data);
    } else {
      // If error does not have a response object
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.listen(3001);