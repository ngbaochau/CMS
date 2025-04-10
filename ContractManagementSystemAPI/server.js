const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./src/routers/auth'); 
require('dotenv').config();
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
