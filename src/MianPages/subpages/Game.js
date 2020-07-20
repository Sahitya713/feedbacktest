import React,{useState} from "react"

function Game(props) {
    // const [options, setOptions] = useState(props.data.options)
    // const [selected, setSelected] = useState([])
    const [chosen, setChosen] = useState([])
    const [disclaimer, setDisclaimer] = useState("Please Choose 3 Team Members")

    const {qnno, questions} = props.data 
    const qn = questions[qnno-1].question
    const quality = questions[qnno-1].quality
    const qualitylvl = questions[qnno-1].qualitylvl
    const quality2 = questions[qnno-1].quality2
    const qualitylvl2 = questions[qnno-1].qualitylvl2
    const quality3 = questions[qnno-1].quality3
    const qualitylvl3 = questions[qnno-1].qualitylvl3
    let options = []
    for (let i = 0; i<props.data.options.length; i++){
        options.push(props.data.options[i].name)
    }
    // let bg = chosen.includes(option)
    const buttons = options.map(option => 
        // console.log("hllooo")
        // console.log("helloo2")
        // let bg = chosen.includes(option) && "#F6511D";
        <button className="options" key={option} id={option} name={option} style= {{background: chosen.indexOf(option) > -1 && "#F6511D" }}
            onClick={()=>{
                // let x = chosen.slice()
                // if (x.includes(option)) {
                //     let index = x.indexOf(option)
                //     if (index > -1) {x.splice(index,1)}
                // } else if (x.length<3){x.push(option);}
                // setChosen(x)
                // setChosen(option)
                let x = chosen.slice()
                let index = x.indexOf(option)
                if (index > -1) {
                    x.splice(index,1)
                    setDisclaimer("Please Choose 3 Team Members")
                } else if (x.length<3){
                    x.push(option);
                    if (x.length === 3) {setDisclaimer("")} else {setDisclaimer("Please Choose 3 Team Members")}
                } else {setDisclaimer("You can only choose 3 Team Members")}
                
                setChosen(x)
            }}
        >{option}</button>)
    // const width = (600/props.qnlength * qnno).toString()
    const width = (600/props.totalQns1 * (qnno + (props.totalQns1 - props.qnlength))).toString()
    return(
        <div>
            <div className="qn-status-wrap">
                <div className="qn-status" style={{width: width + "px"}}></div>
                <span className="status">Part 1: Question {qnno + (props.totalQns1 - props.qnlength)} of {props.totalQns1}</span>
            </div>
            <h1 className = "qn">{qn}</h1> 
            <div className = "options-wrap">
                {buttons}
            </div>
            
            <br />
            <div className = "len-disclaimer" style = {{right: props.qnlength === qnno && "21%"}}>{disclaimer}</div>
            
            <button className="next" style = {{opacity: chosen.length<3 && 0.5, width: props.qnlength === qnno && "15%", left: props.qnlength === qnno && "80%"}} disabled = {chosen.length<3 && true} onClick={()=>{
                if (chosen.length === 3) {
                    for (let i = 0; i < 3; i++) {
                        props.addAns({player:chosen[i], quality:quality, qualitylvl:qualitylvl, quality2:quality2, qualitylvl2: qualitylvl2,quality3:quality3, qualitylvl3: qualitylvl3 });
                        
                    }
                    props.updatedone({question:qn});
                }
                setChosen([]);
                props.next();
            } }>{props.qnlength === qnno ? "Proceed to Part 2" : "next"}</button>
        </div>
       
    )
}

export default Game