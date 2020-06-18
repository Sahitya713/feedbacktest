import React, {Component} from "react"
import Navbar from "./Navbar"
import Dashboard from "./MianPages/Dashboard"
import Addqn from "./MianPages/Addqn"
import Startgame from "./MianPages/Startgame"
// import "./assets/style.css"
import fire from "./fire"
import Login from "./Login"
import Insufficient from "./MianPages/Insufficient"
// import * as Firebase from "firebase";
import Noresults from "./MianPages/Noresults"

class App extends Component {
    constructor(){
        super()

        this.state = {
            navStatus: [0,1,1],
            page: "home",
            questions: [],
            user:null,
            answers: [],
            options: [],
            qualities: [],
            dataset: []
        }
    }
    // firebase functions
    getQuestions = () => {
        var questionsRef = fire.database().ref('/questions/')
        return questionsRef.once('value', snapshot => {
            if (snapshot.val() != null){
                let x = Object.values(snapshot.val())
                let y = []
                for (var i = 0; i <x.length; i++) {
                    if (x[i].done.includes(this.state.user.email) || x[i].done === this.state.user.email) y.push(i);}
                for (var j = y.length -1; j > -1; j--) {
                    x.splice(y[j],1)}
                if (x.length > 9) {
                    let final = []
                    let index = []
                    let randNo
                    var a = 0
                    while (a < 10) {
                        randNo = Math.floor(x.length * Math.random())
                        if (!index.includes(randNo)){
                            index.push(randNo);
                            final.push(x[randNo]);
                            a++;
                        }
                        }
                    this.setState({questions: final})
                } else {
                    this.setState({questions: [{err: "insufficient"}]})
                }
            }
          });
        
    }

    getAnswers = () => {
        var answersRef = fire.database().ref('/answers/')
        answersRef.orderByValue().once('value', snapshot => {
            if (!snapshot.val()) {this.setState({answers:[-1]})}
            else {
                snapshot.forEach(childSnapshot => {
                    let values = Object.values(childSnapshot.val()).sort((a,b)=>b-a)
                    let keys = []
                    let x
                    let copy = childSnapshot.val()
                    function getKeyByValue(object, value) {
                            return Object.keys(object).find(key => object[key] === value)}
                    for (var i = 0; i<values.length; i++){
                        x = getKeyByValue(copy,values[i])
                        delete copy[x];
                        keys.push(x)
                    }
                    let item = {}
                    item = {[childSnapshot.key]: {qualities: keys, qualitylvls: values}}
                    let answer = this.state.answers
                    answer.push(item)
                    this.setState({answers:answer})
                    })
                    this.setState({dataset:this.state.answers})
                }
            
            
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
    addQn = (obj) => {
        var newPostKey = fire.database().ref().child('questions').push().key;
        var updates = {};
        updates['/questions/' + newPostKey] = obj;
        fire.database().ref().update(updates);
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
        const quality2 = props.quality2
        const qualitylvl2 = props.qualitylvl2
        const quality3 = props.quality3
        const qualitylvl3 = props.qualitylvl3
        var answersRef = fire.database().ref('/answers/'+props.player+ '/')
        return answersRef.once('value', snapshot => {
            let answer = {}
            if (snapshot.val() === null) {
                answer = {[props.quality]: parseInt(props.qualitylvl,10)}
                if (quality2 !== "--please choose--") {answer[quality2] = parseInt(qualitylvl2, 10)}
                if (quality3 !== "--please choose--") {answer[quality3] = parseInt(qualitylvl3, 10)}
            }
            else {
                if (snapshot.val()[props.quality] !== undefined) {answer[props.quality] = parseInt(props.qualitylvl,10) + parseInt(snapshot.val()[props.quality],10)}
                if (snapshot.val()[props.quality] === undefined) {answer[props.quality] = parseInt(props.qualitylvl,10)}
                else {answer[props.quality] = parseInt(props.qualitylvl,10) + parseInt(snapshot.val()[props.quality],10)}
                if (quality2 !== "--please choose--") 
                    {
                        if (snapshot.val()[quality2] === undefined) {answer[quality2] = parseInt(qualitylvl2,10)}
                        else {answer[quality2] = parseInt(qualitylvl2,10) + parseInt(snapshot.val()[quality2],10)}
                    }
                if (quality3 !== "--please choose--") 
                    {
                        if (snapshot.val()[quality3] === undefined) {answer[quality3] = parseInt(qualitylvl3,10)}
                        else {answer[quality3] = parseInt(qualitylvl3,10) + parseInt(snapshot.val()[quality3],10)}
                    }
            }
            fire.database().ref().child('answers').child(props.player).update(answer);
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
        this.setState({navStatus: [0,1,1],
            page: "home"})
        fire.auth().signOut();
    }
    getOptions = () => {
        var optionsRef = fire.database().ref('/options/')
        optionsRef.once('value', snapshot => {
            this.setState({options: snapshot.val()})
        })
    }
    getQualities = () => {
        var qualitiesRef = fire.database().ref('/qualities/')
        qualitiesRef.once('value', snapshot => {
            this.setState({qualities: snapshot.val()})
        })
    }
    componentDidMount() {
        this.authListener()
        this.getAnswers()
        this.getOptions()
        this.getQualities()   
    }
    
    mainClick = (event) => {
        
        let status
        const {name} =event.target
        if (name === "addqn") {
            status= [1,1,0]} 
        if (name === "startgame") {
            this.setState({questions: []})
            this.getQuestions()
            status = [1,0,1]}
        if (name === "home") {
            this.setState({answers: []})
            this.getAnswers()
            status = [0,1,1]}
        this.setState({navStatus: status, page: name})
    }
    render() {
        return(
            <div>
                {this.state.user ? (<div>
                    <Navbar 
                        mainClick={this.mainClick.bind(this)}
                        status={this.state.navStatus}
                        logout={this.logout}
                        user = {this.state.user}
                    />
                    {this.state.page === "home" && this.state.dataset.length>0 && this.state.answers[0] !== -1 && <Dashboard answers={this.state.dataset}/>}
                    {this.state.page === "home" && this.state.answers[0] === -1 && <Noresults />}
                    {this.state.page === "addqn" && this.state.qualities.length > 0 && <Addqn addQn={this.addQn} qualities={this.state.qualities} />}
                    {this.state.page === "startgame" && this.state.questions.length>9 && this.state.options.length > 0 && 
                        <Startgame mainClick={this.mainClick} 
                            questions={this.state.questions}
                            addAns={this.addAns}
                            updatedone={this.updatedone}
                            options = {this.state.options}
                            />}
                    {this.state.page === "startgame" && this.state.questions.length === 1 && 
                        <Insufficient />}
                    </div>) : (<Login />)}
            </div>
        )
    }
}





export default App