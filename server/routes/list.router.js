const express = require('express');
const router = express.Router();
const pool = require ('../modules/pool');

//GET
router.get('/',(req, res)=>{
    console.log('list route GET');
    let queryString = `SELECT * FROM "list" ORDER BY "id"`;
    pool.query(queryString).then(results =>{
        res.send(results.rows)
    }).catch(error =>{
        console.log('error getting list', error);
        res.sendStatus(500);
    })
})


//POST
router.post('/',(req, res)=>{
    console.log('list route POST');
    let queryString = `INSERT INTO "list" (task, complete) VALUES ($1, $2)`;
    pool.query(queryString, [req.body.task, req.body.complete]).then((results)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})


//PUT
router.put('/:id', (req, res)=>{
    console.log('list route PUT');
    let queryString = `UPDATE "list" SET "complete"= TRUE WHERE "id"=$1`;
    pool.query(queryString, [req.params.id]).then((results)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})

//DELETE
router.delete('/:id', (req,res)=>{
    console.log('list route DELETE', req.params);
    let queryString = `DELETE FROM "list" WHERE "id"=$1`;
    pool.query(queryString, [req.params.id]).then((results)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})

module.exports = router;