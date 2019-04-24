import React, { Component } from "react";
import { LineChart } from "react-d3-components";

// Components
import AddButton from "src/components/AddButton/AddButton";

export default class DynamicGraph extends Component {
  state = {
    line1: 1,
    line2: 2,
    line3: 3,
    line1Graph: [0],
    line2Graph: [0],
    line3Graph: [0]
  };

  componentDidMount() {
    var intervalId = setInterval(this.updateGraphValue, 5000);
    this.setState({intervalId});
 }
 
 componentWillUnmount() {
     const { intervalId } = this.state;
    clearInterval(intervalId);
 }

  increaseLineHeight = type => {
    const lineNo = "line" + type;
    const { [lineNo]: line } = this.state;
    this.setState({
        [lineNo]: line+1
    });
  };

  decreaseLineHeight = type => {
    const lineNo = "line" + type;
    const { [lineNo]: line } = this.state;
    this.setState({
        [lineNo]: line-1
    });
  };

  updateGraphValue = () => {
    const { line1, line2, line3, line1Graph, line2Graph, line3Graph } = this.state;
    line1Graph.unshift(line1);
    line2Graph.unshift(line2);
    line3Graph.unshift(line3);
    this.setState({
        line1Graph,
        line2Graph,
        line3Graph
    });
  };

  getGraphData = (line) => {
      const { [line]: lineGraph } = this.state;
      return lineGraph.map((points, index) => ({
        x: index * 5,
        y: points
      }));
  }

  render() {
    
    const buttonList = [1, 2, 3];
    const data = [
      {
        label: "line1",
        values: this.getGraphData('line1Graph')
      },
      {
        label: "line2",
        values: this.getGraphData('line2Graph')
      },
      {
        label: "line3",
        values: this.getGraphData('line3Graph')
      },
    ];
    return (
      <div className="graph-container">
        <div className="chart-view">
          <LineChart
            data={data}
            width={600}
            height={400}
            margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
          />
        </div>
        <div className="button-container">
          <div className="button-group">
            {buttonList.map(button => (
              <AddButton
                key={button}
                onClick={this.increaseLineHeight}
                line={button}
                buttonName={`list${button}+`}
              />
            ))}
          </div>
          <div className="button-group">
            {buttonList.map(button => (
              <AddButton
                key={button}
                onClick={this.decreaseLineHeight}
                line={button}
                buttonName={`list${button}-`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
