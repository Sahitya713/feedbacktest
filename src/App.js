import React, {Component} from "react"
import Navbar from "./Navbar"
import Startgame from "./MianPages/Startgame"
import fire from "./fire"
import Login from "./Login"
import Endgame from "./MianPages/subpages/Endgame"

class App extends Component {
    constructor(){
        super()

        this.state = {
            totalQns1:null,
            totalQns2:null,
            questions: null,
            user:null,
            answers: [],
            options: null,
            suggestions: [],
            teammembers: null
        }
    }
    // firebase functions
    getQuestions = () => {
        var questionsRef = fire.database().ref('/questions/')
        return questionsRef.once('value', snapshot => {
            if (snapshot.val() != null){
                let x = Object.values(snapshot.val())
                let y = []
                this.setState({totalQns1: x.slice().length})
                if (this.state.user){
                    for (var i = 0; i <x.length; i++) {
                        if (x[i].done.includes(this.state.user.email) || x[i].done === this.state.user.email) y.push(i);}
                    for (var j = y.length -1; j > -1; j--) {
                        x.splice(y[j],1)}
                    this.setState({questions: x})
                    console.log(this.state.questions)
                }
                // } else {
                //     this.setState({questions: [{err: "insufficient"}]})
                }
            }
        )}
    
    getTeam = () => {
        var teamRef = fire.database().ref('/team/')
        return teamRef.once('value', snapshot => {
            if (snapshot.val() != null){
                let x = Object.values(snapshot.val())
                this.setState({totalQns2: x.slice().length,teammembers: x.slice()})
                let y = []
                if (this.state.user){
                    for (var i = 0; i <x.length; i++) {
                        if (x[i].done.includes(this.state.user.email) || x[i].done === this.state.user.email) y.push(i);}
                    for (var j = y.length -1; j > -1; j--) {
                        x.splice(y[j],1)}
                    this.setState({options: x})
                }
                }
    })}
    getSuggestions = () => {
        var optionsRef = fire.database().ref('/suggestions/')
        optionsRef.once('value', snapshot => {
            this.setState({suggestions: snapshot.val()})
        })
    }

    updatedone = (props) =>{
        var questionsRef = fire.database().ref('/questions/')
        return questionsRef.orderByChild('question').equalTo(props.question).once('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                var childKey = childSnapshot.key;
                let answer = {done: childSnapshot.val().done +" " + this.state.user.email}
                fire.database().ref().child('questions').child(childKey).update(answer);
          });
    })}
    updatedone_sugg = (props) =>{
        var questionsRef = fire.database().ref('/team/')
        return questionsRef.orderByChild('name').equalTo(props.name).once('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                var childKey = childSnapshot.key;
                let answer = {done: childSnapshot.val().done +" " + this.state.user.email}
                fire.database().ref().child('team').child(childKey).update(answer);
          });
    })}
    doneall = () =>{
        var questionsRef = fire.database().ref('/done/')
        return questionsRef.once('value', snapshot => {
            let answer
            if (snapshot.val() === null) {
                answer = {done: this.state.user.email}
            }
            else {answer = {done: snapshot.val() + " " + this.state.user.email}}
            fire.database().ref().update(answer);
          });
    }
    // addAns = (props) => {
    //     const quality2 = "kindness"
    //     const qualitylvl2 = "4"
    //     const quality3 = "---Please choose---"
    //     const qualitylvl3 = "1"
    //     var answersRef = fire.database().ref('/answers/'+props.player+ '/' + props.quality)
    //     return answersRef.once('value', snapshot => {
    //         let answer
    //         if (snapshot.val() === null) {
    //             answer = {[props.quality]: parseInt(props.qualitylvl,10)}
    //         }
    //         else {answer = {[props.quality]: parseInt(props.qualitylvl,10) + parseInt(snapshot.val(),10)}}
    //         fire.database().ref().child('answers').child(props.player).update(answer);
    //       });
    // }
    addAns = (props) => {
        // const quality2 = props.quality2
        // const qualitylvl2 = props.qualitylvl2
        // const quality3 = props.quality3
        // const qualitylvl3 = props.qualitylvl3
        var answersRef = fire.database().ref('/answers/'+props.player+ '/traits/')
        return answersRef.once('value', snapshot => {
            let answer = {}
            let temp = {}
            console.log(props.questions)
            for (var i = 0; i<props.questions.length; i++) {
                let quality = props.questions[i].quality
                let qualitylvl = props.questions[i].qualitylvl
                let quality2 = props.questions[i].quality2
                let qualitylvl2 = props.questions[i].qualitylvl2
                let quality3 = props.questions[i].quality3
                let qualitylvl3 = props.questions[i].qualitylvl3
                if (temp[quality]) {temp[quality] = temp[quality] + parseInt(qualitylvl, 10)}
                else {temp[quality] = parseInt(qualitylvl, 10)}
                if (quality2 !== "--please choose--") {
                    if (temp[quality2]) {temp[quality2] = temp[quality2] + parseInt(qualitylvl2, 10)}
                    else {temp[quality2] = parseInt(qualitylvl2, 10)}
                }
                if (quality3 !== "--please choose--") {
                    if (temp[quality3]) {temp[quality3] = temp[quality3] + parseInt(qualitylvl3, 10)}
                    else {temp[quality3] = parseInt(qualitylvl3, 10)}    
                }
            }
            console.log(temp)
            let temp_keys
            temp_keys =  Object.keys(temp)
            for (var a = 0; a< temp_keys.length; a++){
                if (snapshot.val() === null) {
                    answer[temp_keys[a]] = temp[temp_keys[a]]
                }
                else {
                    if (snapshot.val()[temp_keys[a]] !== undefined) {answer[temp_keys[a]] = temp[temp_keys[a]] + parseInt(snapshot.val()[temp_keys[a]],10)}
                    else{answer[temp_keys[a]] = temp[temp_keys[a]]}
                } 
            }
            fire.database().ref().child('answers').child(props.player).child('traits').update(answer);
          });
    }
    addQns = (props) => {
        var qns = fire.database().ref('/answers/'+ props.player + '/qns/')
        return qns.once('value', snapshot => {
            let temp = []
            if (snapshot.val()) {temp = snapshot.val().slice()}
            for (var i = 0; i< props.questions.length; i++){
                temp.push(props.questions[i].question)
            }
            let answer = {"qns": temp}
            fire.database().ref().child('answers').child(props.player).update(answer);
          });
    }
    addSuggSelf = (props) => {
        var SuggSelfRef = fire.database().ref('/answers/'+ props.name + '/')
        return SuggSelfRef.once('value', snapshot => {
            let temp = []
            for (var i = 0; i< props.questions.length; i++){
                temp.push(props.questions[i].question)
            }
            let answer = {"suggestions(self)": props.suggestions, "qns(self)": temp}
            fire.database().ref().child('answers').child(props.name).update(answer);
          });
    }
    addSuggOthers = (props) => {
        // const suggestion1 = props.suggestions[0]
        // const suggestion2 = props.suggestions[1]
        // const suggestion3 = props.suggestions[2]
        var answersRef = fire.database().ref('/answers/'+props.name+ '/suggestions/')
        return answersRef.once('value', snapshot => {
            let answer = {}
            for (let i = 0; i< props.suggestions.length; i++) {
                if (snapshot.val() === null) {
                    answer[props.suggestions[i]] = 1
                }
                else {
                    if (snapshot.val()[props.suggestions[i]] === undefined) {answer[props.suggestions[i]] = 1}
                    else {answer[props.suggestions[i]] = 1 + parseInt(snapshot.val()[props.suggestions[i]],10)}
                }  
            }
            // if (snapshot.val() === null) {
            //     answer = {[suggestion1]: 1, [suggestion2]:1, [suggestion3]:1}
            // }
            // else {
            //     if (snapshot.val()[suggestion1] === undefined) {answer[suggestion1] = 1}
            //     else {answer[suggestion1] = 1 + parseInt(snapshot.val()[suggestion1],10)}
            //     if (snapshot.val()[suggestion2] === undefined) {answer[suggestion2] = 1}
            //     else {answer[suggestion2] = 1 + parseInt(snapshot.val()[suggestion2],10)}
            //     if (snapshot.val()[suggestion3] === undefined) {answer[suggestion3] = 1}
            //     else {answer[suggestion3] = 1 + parseInt(snapshot.val()[suggestion3],10)}
            // }
            fire.database().ref().child('answers').child(props.name).child('suggestions').update(answer);
          });
    }

    authListener() {
        fire.auth().onAuthStateChanged((user)=>{
            if(user) {
                this.setState({ user });
            } else {
                this.setState({user: null});
            }
        })
    }
    logout = () => {
        this.setState({
            questions: null,
            options: null,
            suggestions: [],
            totalQns1: null,
            totalQns2: null})
        fire.auth().signOut();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.user !== prevState.user) {
            this.getQuestions()
            this.getTeam()
            this.getSuggestions()
            console.log("updated")
        }

    }
    
    componentDidMount() {
        this.authListener()
        this.getQuestions()  
        this.getTeam()
        this.getSuggestions()
    }
    
    
    render() {
        // console.log("rendered")
        // console.log(this.state.questions)
        
        return(
            <div>

                {this.state.user ? (<div>
                    {this.state.teammembers && <Navbar 
                        logout={this.logout}
                        user = {this.state.user}
                        teammembers = {this.state.teammembers}
                    />}
                    {this.state.totalQns1 && this.state.totalQns2 && this.state.questions && this.state.options && this.state.options.length + this.state.questions.length > 0 ?
                        ( this.state.suggestions.length > 0 && <Startgame 
                            // questions={this.state.questions}
                            addAns={this.addAns}
                            addQns = {this.addQns}
                            addSuggSelf={this.addSuggSelf}
                            addSuggOthers={this.addSuggOthers}
                            updatedone={this.updatedone}
                            updatedone_sugg={this.updatedone_sugg}
                            doneall={this.doneall}
                            // options = {this.state.options}
                            // suggestions = {this.state.suggestions}
                            // user = {this.state.user}
                            // totalQns1 = {this.state.totalQns1}
                            // totalQns2 = {this.state.totalQns2}
                            data = {this.state}
                            />): (<Endgame/>)}
                    </div>) : (<Login />)}
            </div>
        )
    }
}





export default App