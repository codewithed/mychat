const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// project-id: d5dfcd96-7c17-4fa7-8aca-007e92b2989a
// private-key: 9966765c-0f0a-4e13-ac5f-a13831192e4a
app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const r = await axios.put(
        "https://api.chatengine.io/users/", {
            username: username,
            secret: username,
            first_name: username
        },
        {headers: {"Private-key": "9966765c-0f0a-4e13-ac5f-a13831192e4a"}}
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