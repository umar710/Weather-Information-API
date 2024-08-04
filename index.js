const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();

// Use CORS to handle cross-origin requests
const cors = require("cors");
app.use(cors());

const WEATHERSTACK_API_KEY = process.env.API_KEY;
const PORT = process.env.PORT;

app.get("/weather", async (request, response) => {
  try {
    const city = request.query.city;

    if (city === "") {
      response.status(400).json("City name is required..");
    } else {
      const weatherresponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHERSTACK_API_KEY}&units=metric`
      );
      const data = await weatherresponse.data;
      response.status(200).json(data);
    }
  } catch (e) {
    response.status(500).json(`Internal Server Error ${e.message}`);
  }
});

app.listen(PORT, () => {
  console.log("Server is Runinig http://localhost:3000/");
});
