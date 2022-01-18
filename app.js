const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_oh_gadget'
  });

  app.get('/', (req, res) => {
    res.render('landing.ejs');
  });

  app.get('/index', (req, res) => {
    var budget = req.query.budget;
    var budget = parseInt(budget);
    budget =budget/14300;
    connection.query(
      `SELECT * FROM smartphone WHERE Harga < ${budget} AND Performance_Score > 7 ORDER BY Price_Score DESC LIMIT 3`,
      (error, results) => {
        res.render('index.ejs', {smartphone: results});
      }
    );
  });

  app.get('/smartphone', (req, res) => {
    res.render('smartphone.ejs');
  });

  app.get('/compare', (req, res) => {
    res.render('compare.ejs');
  });
app.listen(3000);