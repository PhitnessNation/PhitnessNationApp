const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get workouts router, automatically gets the currently logged in users workouts
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "workouts" WHERE user_id = $1`
    pool.query(queryText, [req.user.id])
        .then((result) =>{
            res.send(result.rows)
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('GET WORKOUTS ERROR:', error);
        })
});
//update workouts router, send: { workout id: int, feedback: int }
router.put('/', (req, res) =>{
    let queryText = 'UPDATE "workouts" SET "feedback" = $1 WHERE "id" = $2;';
    let queryInfo = [ req.body.feedback, req.body.id ];
    pool.query(queryText, queryInfo)
        .then(() =>{
            res.sendStatus(200)
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('UPDATE WORKOUTS ERROR:', error);
        })
})

module.exports = router;