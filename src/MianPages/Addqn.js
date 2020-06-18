import React, {Component} from "react"

class Addqn extends Component {
    state = {
        question: "Please Enter a question",
        quality: "--please choose--",
        qualitylvl: "1",
        quality2: "--please choose--",
        qualitylvl2: "1",
        quality3: "--please choose--",
        qualitylvl3: "1",
        done: ""
    }
    handleChange = event => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.addQn(this.state);
        this.setState({
            question: "Please Enter a question",
            quality: "--please choose--",
            qualitylvl: "1",
            quality2: "--please choose--",
            qualitylvl2: "1",
            quality3: "--please choose--",
            qualitylvl3: "1",
            done: ""
        })
    }
    
    render() {
        const qualitylvls = [1,2,3]
        const qualities = this.props.qualities
        // for (var i = 0; i< qualities.length; i++) {
        //     if (qualities[i].includes("(-)")) { 
        //         qualities[i] = qualities[i].substring(3)}
        // }
        return(
            <div> 
                <div className= "add-wrap">
                    <h1 className="add">Add a question for your team members to play.</h1>
                </div>
            <form onSubmit={this.handleSubmit} style={{marginTop:"100px"}}>
                <input className="qnInput" type="text" value={this.state.question} name="question" onChange={this.handleChange}/>
                <div className ="traits_e">Add at least 1 trait associated with the question and its weight. <br/>These will be used to calculate trait scores for the team members.</div>
                <label className = "trait_l" style={{color: "#fff"}}>Trait:</label>
                <select 
                    className = "trait"
                    value={this.state.quality}
                    onChange={this.handleChange}
                    name="quality"
                >
                    {qualities.map(choice => <option key={choice} value={choice}>{choice.includes("(-)") ? choice.substring(3) : choice}</option>)}
                </select>
                <select 
                    className = "trait2"
                    value={this.state.quality2}
                    onChange={this.handleChange}
                    name="quality2"
                >
                    {qualities.map(choice => <option key={choice} value={choice}>{choice.includes("(-)") ? choice.substring(3) : choice}</option>)}
                </select>
                <select 
                    className = "trait3"
                    value={this.state.quality3}
                    onChange={this.handleChange}
                    name="quality3"
                >
                    {qualities.map(choice => <option key={choice} value={choice}>{choice.includes("(-)") ? choice.substring(3) : choice}</option>)}
                </select>
                
                <br />



                <label className="traitlvl_l">Trait Level:</label>
                <select 
                    className="traitlvl"
                    value={this.state.qualitylvl}
                    onChange={this.handleChange}
                    name="qualitylvl"
                    
                >
                    {qualitylvls.map(choicelvl => <option key={choicelvl} value={choicelvl}>{choicelvl}</option>)}
                </select>
                <select 
                    className="traitlvl2"
                    value={this.state.qualitylvl2}
                    onChange={this.handleChange}
                    name="qualitylvl2"
                    
                >
                    {qualitylvls.map(choicelvl => <option key={choicelvl} value={choicelvl}>{choicelvl}</option>)}
                </select>
                <select 
                    className="traitlvl3"
                    value={this.state.qualitylvl3}
                    onChange={this.handleChange}
                    name="qualitylvl3"
                    
                >
                    {qualitylvls.map(choicelvl => <option key={choicelvl} value={choicelvl}>{choicelvl}</option>)}
                </select>

                <button className="submit" style={{display : (this.state.question === "Please Enter a question" || this.state.quality === "--please choose--") && "none"}}>Submit</button>
            </form>
            </div>
        )
    }
    
}

export default Addqn

