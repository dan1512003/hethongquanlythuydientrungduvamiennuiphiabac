

const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();
const router = require('./src/router/router.js');
app.use(cors());
app.use(express.json())
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'src', 'views','page'));
// app.use('/public',express.static(path.join(__dirname,'src','public')))
app.use('/upload',express.static(path.join(__dirname,'src','upload')))
// app.use('/bootstrap',express.static(path.join(__dirname,'src','assets','bootstrap','dist','css')))
app.use('/admin',router);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});