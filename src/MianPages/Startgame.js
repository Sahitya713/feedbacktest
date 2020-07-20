import React, {Component} from "react"
import Game from "./subpages/Game"
import Endgame from "./subpages/Endgame"
import Suggestions from "./subpages/Suggestions"
import Quiz from "./subpages/Quiz"

class Startgame extends Component {
    state = {
        qnno: 0,
        membercount: 0,
        options: this.props.data.options,
        questions:this.props.data.questions,
        suggestions: this.props.data.suggestions
    }

    // componentDidMount() {
    //     this.setState({questions: this.props.questions})
    // }

    next = () => {
        this.setState(prevState => {
            return {
                qnno: prevState.qnno + 1
            }    
        })
    }
    proceed = () => {
        this.setState(prevState => {
            return {
                membercount: prevState.membercount + 1,
                qnno: 1
            }    
        })
    }
    render() {
        // console.log("start page rendered")
        // console.log(this.state.questions)
        const totalQns = this.props.data.totalQns2*4
        const length = this.state.options.length + this.state.questions.length
        const qnlength = this.state.options.length*4 
        console.log(totalQns)
        // const sugglength = this.options.length
        return(
            <div>
                
                {this.state.membercount >= 0 && this.state.membercount < this.state.options.length && this.state.qnno === 0 && 
                    <div>
                        <div className= "quality-board-wrap middle">
                            <p className = "quality-board title">Assessment Tips</p>
                        </div>
                        <ol className = "rules">
                            <li><span className= "rules one"> {qnlength === totalQns ? "Each round of scoring consists of " + totalQns + " questions. It will take you about 10 minutes to complete the assessment." :
                            "You have " + qnlength + " question(s) left."}</span></li>
                            <li>There will be 4 questions per team member. for the first 3 questions, select 1-3 of the listed statements that best describe the team member. For the last question, select 1-3 Suggestions you would give to the team member.</li>
                            <li>Select accordingly for yourself as well.</li>
                        </ol>
                    <button className="play" onClick={this.next}>{qnlength === totalQns ? "BEGIN" : "CONTINUE" }</button>
                    </div>
                }
                {/* {this.state.qnno > 0 && this.state.qnno <= qnlength && 
                    <Game 
                        totalQns1 = {this.props.data.totalQns1}
                        data={this.state} 
                        next={this.next} 
                        addAns={this.props.addAns} 
                        updatedone={this.props.updatedone} 
                        qnlength = {qnlength}
                    />
                }
                {this.state.qnno > qnlength && this.state.qnno <= length && 
                    <Suggestions 
                        data={this.state} 
                        next={this.next} 
                        qnlength = {qnlength}
                        totalQns1 = {this.props.data.totalQns1}
                        totalQns2 = {this.props.data.totalQns2}
                        updatedone_sugg={this.props.updatedone_sugg} 
                        user = {this.props.data.user}
                        addSuggSelf = {this.props.addSuggSelf}
                        addSuggOthers = {this.props.addSuggOthers}
                        doneall = {this.props.doneall}
                    />
                } */}
                {this.state.membercount >= 0 && this.state.membercount < this.state.options.length && this.state.qnno>0&& 
                    <Quiz 
                        data={this.state} 
                        next={this.next}
                        proceed={this.proceed} 
                        // qnlength = {qnlength}
                        totalQns1 = {this.props.data.totalQns1}
                        totalmembers = {this.props.data.totalQns2}
                        updatedone_sugg={this.props.updatedone_sugg} 
                        user = {this.props.data.user}
                        addSuggSelf = {this.props.addSuggSelf}
                        addSuggOthers = {this.props.addSuggOthers}
                        addAns={this.props.addAns}
                        addQns = {this.props.addQns}
                        doneall = {this.props.doneall}
                    />
                }
                {this.state.membercount >= this.state.options.length && <Endgame/>}
            </div>
        )
    }
    
}

export default Startgame