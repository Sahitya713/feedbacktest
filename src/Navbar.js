import React from "react"
import home from "./MianPages/components/home-icon.svg"

function Navbar(props) {
    let x;
    let y;
    x = props.user.email;
    y = x.slice(0,x.indexOf("@"))

    return (
        <div className="navbar-wrap">
            <img className="home" src={home} onClick={props.mainClick} alt="Logo" style={{display: !props.status[0] && "none"}} name="home"/>
            <span className = "name">Welcome, {y}!</span>
            <button className="nav start-game" style={{display: !props.status[1] && "none"}} name="startgame" onClick={props.mainClick}>Start Game</button>
            <button className="nav add-qn" style={{display: !props.status[2] && "none"}} name="addqn" onClick={props.mainClick}>Add Question</button>
            <button className="logout" onClick={props.logout}>logout</button>        
        </div>
    )
}

export default Navbar