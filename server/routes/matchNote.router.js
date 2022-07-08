const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios')
require('dotenv').config()
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.post('/',rejectUnauthenticated,(req,res)=>{
    console.log(req.body);

    const userId = req.user.id

    console.log(userId);

    const insertQuery = `
        INSERT INTO "matchNote" ("userId","tournamentId","win","skillDemonstrated","skillToImprove","note")
        VALUES ($1,$2,$3,$4,$5,$6);
    `

    const sqlParam = [
        userId,
        Number(req.body.tournamentId),
        req.body.win,
        req.body.skillDemonstrated,
        req.body.skillToImprove,
        req.body.note
    ]

    pool.query(insertQuery,sqlParam)
        .then((dbres)=>{
            res.sendStatus(200)
        }).catch((err)=>{
            console.error(`${err}`)
        })
    
})




module.exports = router;