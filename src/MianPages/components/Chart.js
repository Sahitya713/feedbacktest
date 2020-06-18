



import React, {Component} from "react"
import * as d3 from "d3"

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
  
    componentDidMount() {
    let dataset = (this.props.data[0].qualitylvls).slice(0,5).reverse();
    let labels = (this.props.data[0].qualities).slice(0,5).reverse();
    let negative = []
    for (var i = 0; i< labels.length; i++) {
        if (labels[i].includes("(-)")) { 
            negative.push(i);
            labels[i] = labels[i].substring(3)}

    }
    // let a = 0
    // while (a<5){
    //     console.log(labels[a])
    //     if (!labels[a]) {
    //         labels[a] = " "; 
    //         dataset[a]=2;
    //     }
    //     a++;
    // }

    if (!labels[0]){labels[0] = ""; dataset[0]=0;}
    if (!labels[1]){labels[1] = "  "; dataset[1]=0;}
    if (!labels[2]){labels[2] = "   "; dataset[2]=0;}
    if (!labels[3]){labels[3] = "    "; dataset[3]=0;}
    if (!labels[4]){labels[4] = "     "; dataset[4]=0;}
    
    var margin = {
        top: 8,
        right: 2,
        bottom: 5,
        left: 100
    };
    var width = 420 - margin.left - margin.right,
        height = 190 - margin.top - margin.bottom;
    var svg = d3
        .select(this.refs.chart)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        // .attr("class", "bar");

    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(dataset)]);

    var y = d3.scaleBand()
        .rangeRound([height, 0])
        .padding(0.15)
        .domain(labels);
    
    var yAxis = d3.axisLeft(y)
        //no tick marks
        .tickSize(0)
        
    
    svg.append("g")
        .attr("class", "y axis")
        .style("font-family","Ubuntu")
        .style("font-size", "15px")
        .style("font-weight", "bold")
        .style("color", "black")
        .call(yAxis)
    
    // var filter = svg.append("filter")
    //     .attr("id", "drop-shadow");
    //     // .attr("height", "125%")
    //     // .attr("width", "150%");
    // filter.append("feColorMatrix")
    //         .attr("type", "matrix")
    //         .attr("values","0 0 0 1 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0");
    // filter.append("feGaussianBlur")
    //     .attr("in", "SourceAlpha")
    //     .attr("stdDeviation", 1)
    //     .attr("result", "colouredBlur");

    // filter.append("feOffset")
    //     // .attr("fill", "#00B4EB")
    //     .attr("in", "blur")
    //     .attr("dx", 1)
    //     .attr("dy", 2)
    //     .attr("result", "offsetBlur");

    // var feMerge = filter.append("feMerge");

    // feMerge.append("feMergeNode")
    //     .attr("in", "offsetBlur");
    // feMerge.append("feMergeNode")
    //     .attr("in", "SourceGraphic");
    var bars = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("g")
    bars.append("rect")
        .attr("fill", (d,i) => negative.includes(i) ? "#FFAA00": "#00B4EB")
        .attr("class", "bar")
        .attr("y", function (d,i) {
            return y(labels[i]);})
        .attr("height", y.bandwidth())
        .attr("x", 0)
        .attr("width", function (d) {
            return x(d);
        })
        // .style("filter", "url(#drop-shadow)")
        
        .append("title")
        .text(d => "score: " + d)

        
    }
    render() {
        return (
            <div className="score-wrap">
                <div ref="chart"></div>
                <h1 className= "player">{this.props.player}</h1>
            </div>
        
        );
    }
  }






export default Chart;
