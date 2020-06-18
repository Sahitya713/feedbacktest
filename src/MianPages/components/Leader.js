



import React, {Component} from "react"
import * as d3 from "d3"

class Leader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
  
    componentDidMount() {
    // let labels = Object.keys(this.props.data)
    let dataset = Object.values(this.props.data).sort((a,b)=>b-a).slice(0,3)

    let labels = []
    let a
    let copy = this.props.data
    function getKeyByValue(object, value) {
                return Object.keys(object).find(key => object[key] === value)}
    for (var i = 0; i<dataset.length; i++){
        a = getKeyByValue(copy,dataset[i])
        delete copy[a];
        labels.push(a)
    }

    if (!labels[0]){labels[0] = ""; dataset[0]=0;}
    if (!labels[1]){labels[1] = "  "; dataset[1]=0;}
    if (!labels[2]){labels[2] = "   "; dataset[2]=0;}
    function shift(array){
        let temp = array[2]
        array[2]=array[1]
        array[1]= array[0]
        array[0] = temp
    }
    shift(labels)
    shift(dataset)
       
    // var svgWidth = 500, svgHeight = 300, barPadding = 5;
    // var barWidth = (svgWidth / dataset.length);
    // var svg = d3
    //     .select(this.refs.chart)
    //     .append("svg")
    //     .attr("width", svgWidth)
    //     .attr("height", svgHeight)
    //     // .attr("class", "something");
    // var yScale = d3.scaleLinear()
    //     .domain([0, d3.max(dataset)])
    //     .range([0, svgHeight]);
    // var barChart = svg
    //     .selectAll("rect")
    //     .data(dataset)
    //     .enter()
    //     .append("rect")
    //     .attr("fill", "white")
    //     .attr("class", "sBar")
    //     // .attr("x", (d, i) => i * 60)
    //     .attr("y", (d) => (svgHeight - yScale(d)))
    //     .attr("width", barWidth = barPadding)
    //     .attr("height", (d, i) => d)
    //     .attr("transform", function (d, i) {
    //         var translate = [barWidth * i, 0]; 
    //         return "translate("+ translate +")";
    //     })
    //     .append("title")
    //     .text(d => d);
    // // svg
    // //     .selectAll("text")
    // //     .data(dataset)
    // //     .enter()
    // //     .append("text")
    // //     .style("font-size", 18)
    // //     .attr("fill", "red")
    // //     .attr("x", (d, i) => i * barWidth)
    // //     .attr("y", (d, i) => svgHeight - d -2 )
    // //     .text(d => d);

    // }
    // dataset = [2,3,4]
    // labels = ["a","b","c"]

    var margin = {
        top: 40,
        right: 3,
        bottom: 1,
        left: 3,
    };
    var width = 250 - margin.left - margin.right,
        height =280 - margin.top - margin.bottom;
    var svg = d3
        .select(this.refs.chart)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        // .attr("class", "bar");

    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(dataset)]);

    var x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.2)
        .domain(labels);
    
    // var xAxis = d3.axisBottom(x)
    //     //no tick marks
    //     .tickSize(0)
        
    
    // svg.append("g")
    //     .attr("class", "y axis")
    //     .style("font-family","Ubuntu")
    //     .style("font-size", "15px")
    //     .style("font-weight", "bold")
    //     .style("color", "black")
    //     .call(xAxis)
    var bars = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("g")
    bars.append("rect")
        .attr("fill", (d,i)=> i === 1 ? "#FFAA00" : "#00b4eb")
        .attr("class", "bar")
        .attr("x", function (d,i) {
            return x(labels[i]);})
        .attr("width", x.bandwidth())
        .attr("y", function (d) {
            return y(d);
        })
        .attr("height", function (d) {
            return height -  y(d);
        })
        .append("title")
        .text(d => "score: " + d);
    bars.selectAll("text")
        .data(labels)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .style("font-size", 20)
        .attr("fill", "black")
        .attr("x", (d) => x(d)+x.bandwidth()/2)
        .attr("y", function (d, i) {
            return y(dataset[i]) -5;
        })
        .text(d => d);

        
    }
      
    render() {
        // console.log(this.props.values)
        // console.log(this.props.labels)
        // console.log(this.props.data)
        return (
            <div className = "quality-wrap">
                <div ref="chart"></div>
                <h1 className= "quality">{this.props.quality.includes("(-)") ? this.props.quality.substring(3) : this.props.quality}</h1>
            </div>
        
        );
    }
  }






export default Leader;
