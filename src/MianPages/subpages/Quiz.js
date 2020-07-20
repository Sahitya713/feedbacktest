import React,{useState} from "react"

function Suggestions(props) {
    // const [options, setOptions] = useState(props.data.options)
    // const [selected, setSelected] = useState([])
    // const [suggestions, setSuggestions] = useState(props.data.suggestions)
    const [chosen, setChosen] = useState([])
    const [disclaimer, setDisclaimer] = useState("Please Choose 1-3 Options")
    const [compiled, setCompiled] = useState([])
    // const [questions, setQuestions]

    // const {qnno} = props.data 
    // const qnno = props.data.qnno - props.qnlength
    const suggestions = props.data.suggestions
    const questions_t = props.data.questions
    const qnno = props.data.qnno
    const membercount = props.data.membercount
    const name = props.data.options[props.data.membercount].name
    const email = props.data.options[props.data.membercount].email
    const n = props.totalQns1/3
    let questions
    if (qnno === 1) {questions = questions_t.slice(0,n)}
    else if (qnno === 2) {questions = questions_t.slice(n,2*n)}
    else if (qnno === 3) {questions = questions_t.slice(2*n,props.totalQns1)}
    else {questions = questions_t.slice()}
    let qn
    if (qnno === 4) {
        qn = "Select 1-3 suggestions you would like to give "  + name + "."
    } else {qn= "Please select 1-3 statements that best describes " + name + " from the list below."}
    
    const buttons_q = questions.map((question, i) => 
        <button className="options" key={i} id={i} name={i} style= {{background: chosen.includes(question) && "#F6511d", width: "85%", marginLeft: "45px", marginBottom: "30px"}}
            onClick={()=>{
                let x = chosen.slice()
                let index = x.indexOf(question)
                if (index > -1) {
                    x.splice(index,1)
                    if (x.length === 0) {setDisclaimer("Please Choose 1-3 Options")}
                    else {setDisclaimer("")}
                } else if (x.length<3){
                    x.push(question);
                    if (x.length>0 && x.length<=3) {setDisclaimer("")} else {setDisclaimer("Please Choose 1-3 Options")}
                } else {setDisclaimer("You can only choose up to 3 Options")}
                
                setChosen(x)
                console.log(question)
            }
            }>{question.question}</button>)
    const buttons_s = suggestions.map((suggestion, i) => 
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
                    if (x.length === 0) {setDisclaimer("Please Choose 1-3 Options")}
                    else {setDisclaimer("")}
                } else if (x.length<3){
                    x.push("suggestion"+i);
                    if (x.length>0 && x.length<=3) {setDisclaimer("")} else {setDisclaimer("Please Choose 1-3 Options")}
                } else {setDisclaimer("You can only choose up to 3 Options")}
                
                setChosen(x)
            }
            }>{suggestion}</button>)
    // const width = (600/props.data.options.length * qnno).toString()
    const width = (600/(props.totalmembers*4) * (qnno + membercount*4 + (props.totalmembers - props.data.options.length)*4)).toString()
    return(
        <div>
            <div className="qn-status-wrap">
                <div className="qn-status" style={{width: width + "px"}}></div>
                <span className="status">Question {(qnno + membercount*4 + (props.totalmembers - props.data.options.length)*4)} of {props.totalmembers*4}</span>
            </div>
            <h1 className = "qn">{qn}</h1> 
            <div className = "options-wrap">
                {qnno === 4 ? buttons_s : buttons_q}
            </div>
            <div className = "len-disclaimer" style= {{color: "red"}}>{disclaimer}</div>
            <br />
            <button className="next" style = {{opacity: chosen.length === 0 && 0.5}} disabled = {chosen.length === 0 && true} onClick={()=>{
                if (qnno === 4) {
                    
                    if (email === props.user.email) {props.addSuggSelf({name:name, suggestions:chosen, questions: compiled})}
                    else {
                        props.addSuggOthers({name:name, suggestions:chosen})
                        props.addAns({player:name, questions: compiled})
                        props.addQns({player:name, questions: compiled})
                        }
                    props.updatedone_sugg({name:name});
                    if (props.data.options.length === membercount) {props.doneall()}
                    setCompiled([])
                    props.proceed()
                } else {
                    let x = compiled.slice()
                    for (let a = 0; a < chosen.length; a++){
                        x.push(chosen[a])
                    }
                    setCompiled(x)
                    props.next()
                }
                setChosen([]);
                setDisclaimer("Please Choose 1-3 Options")
        
                }
             }>{(props.data.options.length === membercount && qnno === 4) ? "done" : "next"}</button>
        </div>
       
    )
}

export default Suggestions