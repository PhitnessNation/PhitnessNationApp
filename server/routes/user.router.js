const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = 'INSERT INTO "user" (username, password, name) VALUES ($1, $2, $1) RETURNING id';
  pool.query(queryText, [username, password])
    .then(() => {res.send(req.body)})
    .catch((e) => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});
//user: update user profile send: { id: int, name: "String", pronouns: "String", phone: "String", email: "String", emergency contact name: "String", emergency contact phone: "String", age/DOB: "String"}
router.put('/', (req, res) =>{
  let queryText = `UPDATE "user" SET "name" = $1, "pronouns" = $2, "phone" = $3, "email" = $4, "emergency_contact_name" = $5, "emergency_contact_phone" = $6, "age" = $7, "email_option" = $8 WHERE "id" = $9;`
  let queryInfo = [req.body.name, req.body.pronouns, req.body.phone, req.body.email, req.body.emergencyContactName, req.body.emergencyContactPhone, req.body.dateOfBirth, req.body.email_option, req.body.id ];

  pool.query(queryText, queryInfo)
      .then(() =>{
          res.sendStatus(200);
      }).catch((error) =>{
          res.sendStatus(500);
          console.log('PUT USER INFO ERROR:', error);
      })
})

//req.body is an array with one just index (the user's id)
router.put('/reactivate', (req, res) =>{
  console.log("req: ", req.body);
  let userid = req.body;
  let queryText = `UPDATE "user" SET "active" = true WHERE id = $1`
  let queryValues = [userid[0]]
  pool.query(queryText, queryValues)
      .then(() =>{
          res.sendStatus(200);
      }).catch((error) =>{
          res.sendStatus(500);
          console.log('REACTIVATE USER INFO ERROR:', error);
      })
})

//req.body is an array with one just index (the user's id)
router.put('/archive', (req, res) =>{
  console.log("req: ", req.body);
  let userid = req.body;
  let queryText = `UPDATE "user" SET "active" = false WHERE id = $1`
  let queryValues = [userid[0]]
  pool.query(queryText, queryValues)
      .then(() =>{
          res.sendStatus(200);
      }).catch((error) =>{
          res.sendStatus(500);
          console.log('REACTIVATE USER INFO ERROR:', error);
      })
})

router.post('/phil', (req, res) => {
  console.log("req: ", req.body.philosophy.philosophy, req.body.philosophy.selectedId);
  let userid = req.body.philosophy.selectedId;
  let philosophy = req.body.philosophy.philosophy

  let queryText = `UPDATE "user" SET "philosophy" = $1 WHERE id = $2`
  let queryValues = [philosophy,userid]
  pool.query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    }).catch((error) => {
      res.sendStatus(500);
      console.log('REACTIVATE USER INFO ERROR:', error);
    })
})


router.put('/phil', (req, res) => {
  console.log("req: ", req.body);
  let userid = req.body;
  let queryText = `UPDATE "user" SET "philosophy" = $1 WHERE id = $2`
  let queryValues = [userid[0]]
  pool.query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    }).catch((error) => {
      res.sendStatus(500);
      console.log('REACTIVATE USER INFO ERROR:', error);
    })
})

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "user" WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id])
      .then((result) => {
          res.sendStatus(200);
      }).catch((err) => {
          console.log(err);
          res.sendStatus(500);
      })
})

module.exports = router;
