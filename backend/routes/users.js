const express = require('express');
const router = express.Router();

const pgp = require('pg-promise')();
const connection = {
    host: 'localhost',
    port: 5432,
    database: 'facebook_db',
}
const db = pgp(connection);

router.get('/', async (req, res) => {
   try {
       let users = await db.any('SELECT * FROM users');
       res.json({
           payload: users,
           message: `success. retrieved all the users`
       });
   } catch (error) {
       res.status(500);
       res.json({
           message: `Error. Something went wrong!`
       })
       console.log(error);
   }
})

// router.get('/', (req, res) => {
//     db.any('SELECT * FROM users')
//     .then(function(data) {
//         const response = {
//             users: data
//         }
//         res.send(response);
//     })
//     .catch(function(error) {        
//         res.send('An error occurred: ' + error);
//     });
// });

router.post('/register', (req, res) => {
    const user = req.body;
    db.none('INSERT INTO users(firstname, lastname, age) VALUES($1, $2, $3)', [user.firstname, user.lastname, user.age])
    .then(() => {
        let response = {
            addedUser: req
        }
        res.send(response)
    })
    .catch(error => {
        res.send("An error occurred: " + error)
    });
});

module.exports = router;