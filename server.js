const fs = require('fs');
const path = require('path');
const express = require ('express');
const app = express();
const PORT = process.env.PORT || 3001;

const allNotes = require('./Develop/db/db.json');

