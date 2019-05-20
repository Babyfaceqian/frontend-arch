import React from 'react';
import GraphVisWidget from './graphVisWidget';
import _ from 'lodash';
export default class Graph extends React.Component {
    componentDidMount() {
        this.Graph = GraphVisWidget({
            element: document.getElementById('graph')
        });
        this.Graph.setNodes([{
            id: '1',
            x: 10,
            y: 10
        }, {
            id: '2',
            x: 20,
            y: 10
        }]);
        this.Graph.redraw();
    }
    render() {
        return (
            <div id="graph">
                <button onClick={this.changeNodes}>change nodes</button>
            </div>
        )
    }
    changeNodes = () => {
        let nodes = this.Graph.getNodes();
        let newNodes = [{
            id: '1',
            x: 10,
            y: 10
        },
        {
            id: '2',
            x: 20,
            y: 20
        }, {
            id: '3',
            x: 10,
            y: 50
        }];
        nodes = newNodes.concat(nodes); // 去重时优先选前面的
        nodes = _.uniqBy(nodes, 'id');
        this.Graph.setNodes(nodes);
        this.Graph.redraw();
    }
}