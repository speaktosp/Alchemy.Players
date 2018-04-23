const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
require('dotenv').config()


app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());
 
app.listen(3000);
console.log('Running on port 3000...');
