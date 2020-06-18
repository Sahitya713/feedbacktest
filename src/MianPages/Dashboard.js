import React, {useState} from "react"
import Chart from "./components/Chart"
import Leader from "./components/Leader"

function Dashboard(props) {
    const [choice, setChoice] = useState(true)
    // console.log(answers)
    // console.log(props.answers)
    let scores = {}
    let players = []
    let values = []
    // console.log(props.answers)
    // props.answers.map((player,index) => {
    //     players.push(Object.keys(player))
    //     values.push(Object.values(player))
    // })
    for (var a = 0; a<props.answers.length; a++){
        players[a] = Object.keys(props.answers[a])
        values[a] = Object.values(props.answers[a])
    }
    // console.log(players)
    // console.log(values)
    for (var i = 0; i<values.length; i++){
        let x = values[i][0].qualities
        // console.log(x)
        for (var j= 0;j<x.length;j++){
            if (scores[x[j]] === undefined) {scores[x[j]] = {}}
            scores[x[j]][players[i][0]] = values[i][0].qualitylvls[j]
        }
    }
    // console.log(scores)
    const qualities = Object.keys(scores)
    const dataset = Object.values(scores)
    // console.log(dataset)
    // console.log(props.answers)
    let leaderboards = dataset.map((data,index) => <Leader key={index} quality={qualities[index]} data={data} />) 
    // console.log(scores)
    let scoreboards = props.answers.map((player,index) => <Chart key={index} data={Object.values(player)} player={Object.keys(player)} />)
    return(
        <div>
            <button className= "member-board-wrap" style={{opacity:choice ? 1 : 0.4}} onClick = {() => setChoice(true)}>
                <p className = "member-board title" >Member Board</p>
            </button>
            <button className= "quality-board-wrap" style={{opacity:choice ? 0.4 : 1}} onClick = {() => setChoice(false)}>
                <p className = "quality-board title" >Trait Board</p>
            </button>
            <div className="scoreboard-wrap">
                {choice ? scoreboards : leaderboards}
                {/* {leaderboards} */}
            </div>
        
        
        </div>
    )
}

export default Dashboard