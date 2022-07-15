import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
//Chart.js
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
  //react-chart.js
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  ); 
  
   

//   const config = {
//     type: 'radar',
//     data: data,
//     options: {
//       scales:{
//         r:{

//         }
//       }
//       }
//     },
//   };

export default function CCPlayerHub(){
    const dispatch = useDispatch()
    const playerData = useSelector(store => store.playerHub)
    
    let skillDemonstrated = [];
    let skillToImprove = [] 
    

    for(let player of playerData){
       skillDemonstrated = [...skillDemonstrated,player.skillDemonstrated]
    }

    for(let player of playerData){
        skillToImprove = [...skillToImprove,player.skillToImprove]
    }


    console.log("skills",skillDemonstrated.flat(1));

    const skillDemonstratedCount = [0,0,0,0,0,0,0,0]
    const skillToImproveCount = [0,0,0,0,0,0,0,0]

    const skills = skillDemonstrated.flat(1)
    const iSkills = skillToImprove.flat(1)
    console.log(iSkills);

    for(let skill of skills){
        switch (skill) {
            case 'offense':
                skillDemonstratedCount[0] += 1 
                break;
            case 'defense':
                skillDemonstratedCount[1] += 1
                break;
            case 'spacing':
                skillDemonstratedCount[2] += 1 
                break;
            case 'footsies':
                skillDemonstratedCount[3] += 1 
                break;
            case 'match-up Knowledge':
                skillDemonstratedCount[4] += 1 
                break;
            case 'punishes':
                skillDemonstratedCount[5] += 1
                break;
            case 'combo':
                skillDemonstratedCount[6] += 1
                break;
            case 'anti-air':
                skillDemonstratedCount[7] += 1
                break;
            default:
                break;
        }
    }

    for(let skill of iSkills){
        switch (skill) {
            case 'offense':
                skillToImproveCount[0] += 1 
                break;
            case 'defense':
                skillToImproveCount[1] += 1
                break;
            case 'spacing':
                skillToImproveCount[2] += 1 
                break;
            case 'footsies':
                skillToImproveCount[3] += 1 
                break;
            case 'match-up Knowledge':
                skillToImproveCount[4] += 1 
                break;
            case 'punishes':
                skillToImproveCount[5] += 1
                break;
            case 'combo':
                skillToImproveCount[6] += 1
                break;
            case 'anti-air':
                skillToImproveCount[7] += 1
                break;
            default:
                break;
        }
    }

    console.log('demo skill',skillDemonstratedCount);
    console.log('improve:',skillToImproveCount);
    const data = {
        labels: ['Offense', 'Defense', 'Spacing', 'Footsies', 'Match-up Knowledge', 'Punishes','Combo Execution','Anti-Air'],
        datasets: [
          {
            label: 'Skill Doing Well',
            data: skillDemonstratedCount,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Skill Note Doing Well',
            data: skillToImproveCount,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1,
          }
        ],
      };
    
    useEffect(()=>{
        dispatch({
            type:"FETCH_PLAYER_HUB"
        })
    },[])

    return(
        <div>
            <h1>Player Hub</h1>
            
               { playerData && playerData[0] && 
               <div>
               <h3> Gamertag: {playerData[0].gamertag}</h3>
               <h3> Total Tournaments Entered: {playerData.reduce((total) =>( total += 1),0)}</h3>
               <h3> Total Matches Played: {playerData.reduce((total, matches) =>( total + Number(matches.nummatches)),0)}</h3>
                
                    <Radar  data={data} />
                
               </div>
               }
            
        </div>
    )
}