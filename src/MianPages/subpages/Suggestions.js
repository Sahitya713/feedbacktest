import React,{useState} from "react"

function Suggestions(props) {
    // const [options, setOptions] = useState(props.data.options)
    // const [selected, setSelected] = useState([])
    const [suggestions, setSuggestions] = useState(props.data.suggestions)
    const [chosen, setChosen] = useState([])
    const [disclaimer, setDisclaimer] = useState("Please Choose 3 Suggestions")

    // const {qnno} = props.data 
    const qnno = props.data.qnno - props.qnlength
    
    const name = props.data.options[qnno-1].name
    const email = props.data.options[qnno-1].email
    const qn = "Select the top 3 suggestions you would like to give "  + name + "."
    console.log(suggestions)
    const buttons = suggestions.map((suggestion, i) => 
        <button className="options" key={i} id={suggestion} name={suggestion} style= {{background: chosen.includes("suggestion"+i) && "#F6511d", width: "85%", marginLeft: "45px", marginBottom: "30px"}}
            onClick={()=>{
                // document.getElementById(option).disabled = true;
                // let b = options.indexOf(option)
                // let a = options.slice(0)
                // let b = a.indexOf(option)
                // a.splice(b,1)
                // setSelected(a)
                let x = chosen.slice()
                let index = x.indexOf("suggestion"+i)
                if (index > -1) {
                    x.splice(index,1)
                    setDisclaimer("Please Choose 3 Suggestions")
                } else if (x.length<3){
                    x.push("suggestion"+i);
                    if (x.length === 3) {setDisclaimer("")} else {setDisclaimer("Please Choose 3 Suggestions")}
                } else {setDisclaimer("You can only choose 3 Suggestions")}
                
                setChosen(x)
            }
            }>{i}</button>)
    // const width = (600/props.data.options.length * qnno).toString()
    const width = (600/props.totalQns2 * (qnno + (props.totalQns2 - props.data.options.length))).toString()
    return(
        <div>
            <div className="qn-status-wrap">
                <div className="qn-status" style={{width: width + "px"}}></div>
                <span className="status">Part 2: Question {(qnno + (props.totalQns2 - props.data.options.length))} of {props.totalQns2}</span>
            </div>
            <h1 className = "qn">{qn}</h1> 
            <div className = "options-wrap">
                {buttons}
            </div>
            <div className = "len-disclaimer" style= {{color: "red"}}>{disclaimer}</div>
            <br />
            <button className="next" style = {{opacity: chosen.length<3 && 0.5}} disabled = {chosen.length<3 && true} onClick={()=>{
                console.log(chosen)
                // chosen !== "" && props.addAns({player:chosen, quality:quality, qualitylvl:qualitylvl, quality2:quality2, qualitylvl2: qualitylvl2,quality3:quality3, qualitylvl3: qualitylvl3 }); 
                // chosen !== "" && props.updatedone({question:qn});
                if (chosen.length === 3) {
                    if (email === props.user.email) {props.addSuggSelf({name:name, suggestions:chosen})}
                    else {props.addSuggOthers({name:name, suggestions:chosen})}
                    // for (let i = 0; i < 3; i++) {
                    //     props.addAns({player:chosen[i], quality:quality, qualitylvl:qualitylvl, quality2:quality2, qualitylvl2: qualitylvl2,quality3:quality3, qualitylvl3: qualitylvl3 });
                        
                    // }
                    props.updatedone_sugg({name:name});
                    if (props.data.options.length === qnno) {props.doneall()}
                }
                setChosen([]);
                props.next();} }>{props.data.options.length === qnno ? "done" : "next"}</button>
        </div>
       
    )
}

export default Suggestions