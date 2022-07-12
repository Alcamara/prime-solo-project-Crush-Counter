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

router.post('/savedMatchNote/:id',rejectUnauthenticated,(req,res)=>{
    const id = req.params.id
    console.log(id);

    const fetchQuery = `
        SELECT "matchNote".id, "tournamentId", "win", "skillDemonstrated", "skillToImprove", "note" FROM "matchNote"
        JOIN "user" ON "user".id = "matchNote"."userId"
        WHERE "matchNote".id = $1;
    `
    const sqlParam = [
        id
    ]

    pool.query(fetchQuery,sqlParam)
        .then((dbRes)=>{
            const id = dbRes.rows[0].tournamentId;
            console.log('tournamentID', id);

            const endpoint = "https://api.start.gg/gql/alpha";

            const headers = {
                "content-type": "application/json",
                "Authorization": "Bearer " + process.env.STARTGG_API_KEY
            };

            const graphqlQuery = {
                "query": `
                    query{
                        tournament(id:${id}){
                        name
                    }
                    }
                `,
            };

            axios({
                url:endpoint,
                method:"POST",
                headers:headers,
                data: graphqlQuery
              }).then((resp)=>{
                console.log('here:',resp.data.data.tournament.name);
                res.send({name: resp.data.data.tournament.name, dbResult: dbRes.rows[0]})
              }).catch((err)=>{
                console.error("axios failed",`${err}`);
              })

        }).catch((err)=>{
            console.error(`${err}`);
        })


})

router.get('/',rejectUnauthenticated,(req,res)=>{

    const userId = req.user.id
    console.log(req.user.id);

    const getQuery = `
        SELECT "matchNote".id as "matchNotId", "user".id as "userId", "tournamentId", "win", "skillDemonstrated", "skillToImprove", "note", "date" FROM "matchNote"
        JOIN "user" ON "user".id = "matchNote"."userId"
        WHERE "user".id = $1
        ORDER by "date" DESC;
    `

    const sqlParam = [
        userId
    ]

    pool.query(getQuery, sqlParam)
        .then((dbRes)=>{
            console.log(dbRes.rows)
         const tournamentIds =   dbRes.rows.map(evt =>(
                evt.tournamentId
            ))

            console.log(tournamentIds);

            


            let query = { "query": ``};

            for(let i = 0; i < tournamentIds.length; i++){
            if(i === 0 && tournamentIds.length === 1){
                query["query"] += `query{
                    t${i+1}: tournament(id:${tournamentIds[i]}){
                    id
                    name
                    images{
                        url
                      }
                    },
                }
                    ` 
            }else if(i === 0){
                query["query"] += `query{
                    t${i+1}: tournament(id:${tournamentIds[i]}){
                    id
                    name
                    images{
                        url
                      }
                    },
                    ` 
            }else if(i === tournamentIds.length - 1){
                query["query"] += `t${i+1}: tournament(id:${tournamentIds[i]}){
                    id
                    name
                    images{
                        url
                      }
                }
            }
                `
            }else{
                query["query"] += `t${i+1}: tournament(id:${tournamentIds[i]}){
                id
                name
                images{
                    url
                  }
                },
                `
            }
                
            }

            console.log(query);

            const endpoint = "https://api.start.gg/gql/alpha";

            const headers = {
                "content-type": "application/json",
                "Authorization": "Bearer " + process.env.STARTGG_API_KEY
            };

            axios({
                url:endpoint,
                method:"POST",
                headers:headers,
                data: query
              }).then((resp)=>{
                
                let queryArr = []
                let num = 1;

                for(let i = 0; i < Object.keys(resp.data.data).length; i++){
                    queryArr.push(resp.data.data["t"+num])
                    ++num
                    console.log(num);
                }

                console.log(queryArr);
                res.send({apiQueryResults:queryArr, dbResults:dbRes.rows})
              }).catch((err)=>{
                console.error("axios failed",`${err}`);
              })


            
        }).catch((err)=>{
            console.error(`${err}`);
        })
})

router.delete('/:id',rejectUnauthenticated,(req,res)=>{
    const id = req.params.id

    const deleteQuery = `
        DELETE FROM "matchNote" 
        WHERE "id" = $1 ;
    `

    const sqlParam = [
        id
    ]

    pool.query(deleteQuery,sqlParam)
        .then(()=>{
            res.sendStatus(200)
        }).catch((err)=>{
            console.error(`${err}`);
        })
})

router.put('/savedMatchNote/:id',(req,res)=>{
    const id = req.params.id
    console.log('in put',id, 'payload', req.body );

    const updateQuery = `
        UPDATE "matchNote"
        SET "win" = $1, "skillDemonstrated" = $2, "skillToImprove" = $3, "note" = $4
        WHERE "matchNote".id = ${req.body.id} ;
    `

    const sqlParam = [
        req.body.win,
        req.body.skillDemonstrated,
        req.body.skillToImprove,
        req.body.note
    ]

    pool.query(updateQuery,sqlParam)
        .then(()=>{
            res.sendStatus(200)
        }).catch((err)=>{
            console.error(`${err}`);
        })

})


module.exports = router;