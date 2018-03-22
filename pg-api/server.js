let express = require('express');
let bodyParser = require('body-parser');
let pg = require('pg');
let app = express();
let router = express.Router()
const PORT = 2000;

let pool = new pg.Pool({
  user: 'postgres',
  database: 'carpool',
  password: 'mattwuxuan7',
  host: 'localhost',
  port:5432,
  max: 10
});

// pool.connect((err, db, done) => {
//   if (err) {
//     return console.log(err);
//   }
//   else {
//     db.query('SELECT * from users', (err, table) => {
//       if (err) {
//         return ;console.log(err)
//       }
//       else {
//         console.log(table.rows[0].username);
//       }
//     })
//   }
// })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', router);

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/users')
  .get(function(request, response) {
    pool.connect((err, db, done) => {
      if (err) {
        return response.status(400).send(err);
      }
      else {
        db.query('SELECT * FROM Users', (err, table) => {
          if (err) {
            return response.status(400).send(err);
          }
          else {
            return response.status(200).send(table.rows);
            db.end();
          }
        })
      }
    })
  });

  router.route('/user/loginSuccess')
    .get(function(request, response) {
      pool.connect((err, db, done) => {
        if (err) {
          return response.status(400).send(err);
        }
        else {
          db.query('SELECT * FROM Users WHERE icnum = $1', [request.query.ic], (err, table) => {
            if (err) {
              return response.status(400).send(err);
            }
            else {
              return response.status(200).send(table);
              db.end();
            }
          })
        }
      })
    });

  router.route('/user/login')
    .post(function(request, response) {
      var email = request.body.email;
      var password = request.body.password;
      pool.connect((err, db, done) => {
        if (err) {
          return response.status(400).send(err);
        }
        else {
          db.query('SELECT * FROM Users WHERE email=$1 AND userpassword=$2', [email, password], (err, table) => {
            if (err) {
              return response.status(400).send(err);
            }
            else {
              return response.status(200).send(table);
            }
          })
        }
      })
    });

  router.route('/user/create')
    .post(function(request, response) {
      var email = request.body.email;
      var password = request.body.password;
      var ic = request.body.ic;
      var firstname = request.body.firstname;
      var lastname = request.body.lastname;
      var username = request.body.username;
      var phonenumber = request.body.phonenumber;
      let values = [email, password, ic, firstname, lastname, username, phonenumber];
      pool.connect((err, db, done) => {
        if (err) {
          return response.status(400).send(err);
        }
        else {
          db.query('INSERT INTO Users (email,userPassword,ICNum,firstName,lastName,userName,phoneNum) VALUES ($1,$2,$3,$4,$5,$6,$7);', [...values] ,(err, table) => {
            if (err) {
              return response.status(400).send(err);
            }
            else {
              console.log('DATA INSERTED');
              db.end();
            }
          })
        }
      })
    });

app.listen(PORT, ()=>console.log('listening on Port ' + PORT));
