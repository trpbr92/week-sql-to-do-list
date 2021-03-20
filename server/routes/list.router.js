const express = require('express');
const router = express.Router();
const pool = require ('../modules/pool');

//POST
router.post('/',(req, res)=>{
    let queryString = `INSERT INTO "list" ("task", "complete") VALUES ($1, $2)`;
    pool.query(queryString, [req.body.task, req.body.complete]).then((results)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})



module.exports = router;