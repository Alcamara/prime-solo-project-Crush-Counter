const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios')
require('dotenv').config()
/**
 * GET route template
 */
router.get('/', (req, res) => {
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
                distance:"2000mi"
              }
              past:false
              upcoming: true
              videogameIds: [7,10055]
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
router.post('/:id',(req,res)=>{
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
router.get('/search', (req, res) => {
  
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
            perPage:300
            page:1
            filter:{
              videogameIds: [7,10055]
              addrState:""
              afterDate: 1657201146
              past:false
              upcoming: true
              location:{
                distance: "2000mi"
                distanceFrom: "44.97803522723541,-93.26320829751128"
              }
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
});

module.exports = router;
