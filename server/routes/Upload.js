const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.post("/", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const author = req.body.username;
  db.query(
    "INSERT into Uploads (title , description , image , author) VALUES (? , ? , ? , ?);",
    [title, description, image, author],
    (err, results) => {
      console.log(err);
      res.send(results);
    }
  );
});

router.get("/", (req, res) => {
  db.query("SELECT * from Uploads;", (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});

router.get('/byuser/:username' , (req , res)=>{
    const username = req.params.username;
    console.log(req.body)
    db.query(
        "SELECT * from Uploads where author = ?",
        username,
        (err, results) => {
            console.log(results);
            res.send(results);
        }
        
      );

})

router.post("/like", (req, res) => {
  const userliking = req.body.userliking;
  const id = req.body.id;
  db.query(
    "insert into likes (userliking , postid) values(? , ?);",
    [userliking, id],
    (err, results) => {
      
    }
  );
  db.query(
    "UPDATE uploads set numlikes = numlikes+1 where id = ?",
    id,
    (err, results) => {
        res.send(results);
    }
    
  );
});


router.get("/comments/:postid" , (req , res)=>{
    const postid = req.params.postid;
    db.query("SELECT * from Comments where postid = ?" , postid , (err , results)=>{
        res.json(results);
        console.log(results);
    })
})


router.post("/comments" , (req , res)=>{
    const postid = req.body.postid;
    const author = req.body.author;
    const comment = req.body.comment;

    db.query("INSERT into Comments (author , comment , postid) values (?,?,?)" , [author , comment , postid], (err , results)=>{
        res.json(results);
        console.log(results);
    })
})
module.exports = router;
