import React from 'react';
import GraphVisWidget from './graphVisWidget';
import _ from 'lodash';
import styles from './Graph.less';
export default class Graph extends React.Component {
    componentDidMount() {
        this.Graph = GraphVisWidget({
            element: document.getElementById('graph')
        });
    }
    render() {
        return (
            <div id="graph" className={styles.graph}>
                <button onClick={this.changeNodes}>change nodes</button>
            </div>
        )
    }
    changeNodes = () => {
        let nodes = this.Graph.getNodes();
        let newNodes = new Array(100).fill({});
        newNodes = newNodes.map((d, i) => {
            return {
                id: `${i}`,
                x: Math.random() * 1000,
                y: Math.random() * 600
            }
        });
        // let newNodes = [{
        //     id: '1',
        //     x: 10,
        //     y: 10
        // },
        // {
        //     id: '2',
        //     x: 20,
        //     y: 20
        // }, {
        //     id: '3',
        //     x: 10,
        //     y: 50
        // }];
        nodes = newNodes.concat(nodes); // 去重时优先选前面的
        nodes = _.uniqBy(nodes, 'id');
        this.Graph.setNodes(nodes);
        this.Graph.redraw();
    }
}