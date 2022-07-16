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

    const state = (req.body.state !== '')? `"${req.body.state}"` : `""`
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
            perPage:200
            page:1
            filter:{
              countryCode: "US"
              videogameIds: [7,10055,33990]
              hasOnlineEvents: ${setting}
              past:false
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
    INSERT INTO tournaments ("tournamentId","userId")
    VALUES ($1,$2) RETURNING id;
  `

  const sqlParm = [
    id,
    userId,
  ]

  

  pool.query(insertQuery,sqlParm)
    .then((dbres)=>{
      console.log(dbres.rows);
      
      res.sendStatus(200)

    }).catch((err)=>{
      console.log(`${err}`);
      res.sendStatus(500)
    })
})

/*
 
*/

router.delete('/bookmark/:id',(req,res)=>{
   console.log(req.params.id);

   const deleteQuery = `
    DELETE FROM "tournaments"
    WHERE "tournaments"."tournamentId" = $1 ;
   `

   pool.query(deleteQuery,[req.params.id])
    .then(()=>{
      res.sendStatus(200)
    }).catch((err)=>{
      res.sendStatus(500)
    })
})




router.get('/bookmark',(req,res)=>{

  console.log(req.user.id);

  const fetchBookmarkedTournaments = `
    SELECT * FROM "tournaments"
    Where "userId" = $1;
  `

  pool.query(fetchBookmarkedTournaments,[req.user.id])
      .then((dbRes)=>{
         console.log(dbRes.rows);
         return dbRes.rows.map( tournament =>(
          tournament.tournamentId
         ))
      })
      .then((tournamentIds)=>{
        console.log(tournamentIds);
        

        let query = { "query": ``};

            for(let i = 0; i < tournamentIds.length; i++){
            if(i === 0 && tournamentIds.length === 1){
                query["query"] += `query{
                    t${i+1}: tournament(id:${tournamentIds[i]}){
                    id
                    name
                    addrState
                    isRegistrationOpen
                    startAt
                    endAt
                    numAttendees
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
                    addrState
                    isRegistrationOpen
                    startAt
                    endAt
                    numAttendees
                    images{
                        url
                      }
                    },
                    ` 
            }else if(i === tournamentIds.length - 1){
                query["query"] += `t${i+1}: tournament(id:${tournamentIds[i]}){
                    id
                    name
                    addrState
                    isRegistrationOpen
                    startAt
                    endAt
                    numAttendees
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
                addrState
                isRegistrationOpen
                startAt
                endAt
                numAttendees
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



            return axios({
              url:endpoint,
              method:"POST",
              headers:headers,
              data: query
            })

      })
      .then((apiResults)=>{
        console.log(apiResults.data);
        
          let queryArr = []
          let num = 1;

          for(let i = 0; i < Object.keys(apiResults.data.data).length; i++){
              queryArr.push(apiResults.data.data["t"+num])
              ++num
              console.log(num);
          }

          res.send(queryArr);

         
      }).catch((err)=>{
        res.sendStatus(`${err}`)
      })
})





module.exports = router;
