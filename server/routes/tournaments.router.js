const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios')
require('dotenv').config()
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
/**
 * GET route template
 */
router.get('/',rejectUnauthenticated,(req, res) => {

  //add reject inside get as peram

  // GET route code here
  const endpoint = "https://api.start.gg/gql/alpha";


    const headers = {
        "content-type": "application/json",
        "Authorization": "Bearer " + process.env.STARTGG_API_KEY
    };

    const graphqlQuery = {
        "query": `
        query {
          tournaments(query:{
            perPage: 200
            page:1
            filter:{
              hasBannerImages:true
              location:{
                distanceFrom:"44.92380657348581,-93.21992492794612"
                distance:"1500mi"
              }
              past:false
              upcoming: true
              videogameIds: [7,10055,33990]
            }
          }){
            nodes{
              id
              name
              addrState
              isRegistrationOpen
              isOnline
              startAt
              endAt
              venueAddress
              numAttendees
              images {
                id
                url
              }
              
              
            }
          }
        }
        `,
    };

    console.time('tournament api request');

    axios({
        url:endpoint,
        method:"POST",
        headers:headers,
        data: graphqlQuery
    }).then((resp)=>{
      console.timeEnd('tournament api request');
       res.send(resp.data.data.tournaments.nodes)
    }).catch((err)=>{
        console.error(`${err}`);
    })




    
});

router.post('/search',(req, res) => {
    console.log('got from client:',req.body);

    const state = (req.body.state !== '')? `"${req.body.state}"` : `"${req.user.state}"`
    console.log(state);
    
    const setting = req.body.setting 
    // GET route code here
    const endpoint = "https://api.start.gg/gql/alpha";

    const headers = {
        "content-type": "application/json",
        "Authorization": "Bearer " + process.env.STARTGG_API_KEY
    };

    const graphqlQuery = {
        "query": `
        query{
          tournaments(query:{
            perPage:50
            page:1
            filter:{
              videogameIds: [7,10055,33990]
              hasOnlineEvents: ${setting}
              past:false
              upcoming: true
              addrState: ${state}
            }
          }){
            nodes{
              id
              name
              addrState
              startAt
              endAt
              isRegistrationOpen
              numAttendees
              venueName
              venueAddress
              isOnline
              images {
                url
              }
              
            }
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
      
     res.send(resp.data.data.tournaments.nodes)
    }).catch((err)=>{
      console.error(`${err}`);
    })


});


/*
  request tournament data using
  tournament id and return it to 
  the client
*/ 
router.post('/:id',rejectUnauthenticated,(req,res)=>{
  const id = req.params.id;
  console.log(id);

  const endpoint = "https://api.start.gg/gql/alpha";

  const headers = {
      "content-type": "application/json",
      "Authorization": "Bearer " + process.env.STARTGG_API_KEY
  };

  const graphqlQuery = {
    "query": `
    query{
      tournament(id:${id}){
        id
        name
        startAt
        endAt
        isRegistrationOpen
        numAttendees
        venueName
        venueAddress
        images {
          id
          url
        }
        rules
        url
        
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
  console.log(resp.data.data)
 res.send(resp.data.data)
}).catch((err)=>{
  console.error(`${err}`);
})

})

/**
 * 
 */
router.post('/bookmark/:id',(req,res)=>{
  const id = req.params.id
  console.log(id);
  const userId = req.user.id;


  const insertQuery = `
    INSERT INTO tournaments ("tournamentId")
    VALUES ($1) RETURNING id;
  `

  const sqlParm = [
    id,
  ]

  

  pool.query(insertQuery,sqlParm)
    .then((dbres)=>{
      const tournamentId = dbres.rows[0].id

      const insertJun = `
        INSERT INTO "userMatchNote" ("user_id", "tournament_id")
        VALUES ($1,$2) RETURNING id;
      `

      const sqlParam = [
          userId,
          tournamentId
      ]

      pool.query(insertJun,sqlParam)
        .then((dbres)=>{
          console.log(dbres.rows[0].id);
        })

      console.log(sqlParam);
      

    }).catch((err)=>{
      console.log(`${err}`);
    })
})



module.exports = router;
