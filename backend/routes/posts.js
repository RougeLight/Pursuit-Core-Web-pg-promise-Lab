const express = require('express');
const router = express.Router();

const pgp = require('pg-promise')();
const connection = {
    host: 'localhost',
    port: 5432,
    database: 'facebook_db',
}
const db = pgp(connection);

router.get('/all', async (req, res) => {
   try {
       let posts = await db.any('SELECT * FROM posts');
       res.json({
           payload: posts,
           message: `success. retrieved all users posts`
       });
   } catch (error) {
       res.status(500);
       res.json({
           message: `Error. Something went wrong!`
       })
       console.log(error);
   }
})

router.post('/register', async (req, res) => {
  console.log(req.body);
  try {
      let insertQuery = `
      INSERT INTO posts(poster_id, body)
      VALUES($1, $2)  
      ` 
      
      await db.none(insertQuery, [req.body.poster_id , req.body.body]);
      res.json({
          payload: req.body,
          message: `Post was registered!`
      })
  } catch (error) {
      res.json({
          message: `There was an error!`
      })
  }
})
// router.post('/register', (req, res) => {
//   const posts = req.body;
//   db.none('INSERT INTO posts(poster_id, body) VALUES($1, $2)', [post.body.poster_id])
//   .then(() => {
//       let response = {
//           addedPost: req
//       }
//       res.send(response)
//   })
//   .catch(error => {
//       res.send("An error occurred: " + error)
//   });
// });
module.exports = router;