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
        console.log(resp.data.data.tournaments.nodes);
       res.send(resp.data.data.tournaments.nodes)
    }).catch((err)=>{
        console.error(`${err}`);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
