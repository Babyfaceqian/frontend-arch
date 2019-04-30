export default function (options) {
  let containerId = options.containerId || 'cy';
  var cy = cytoscape({
    container: document.getElementById(containerId), // container to render in

    elements: [ // list of graph elements to start with
      { // node a
        data: { id: 'a', pattern: 1 }
      },
      { // node b
        data: { id: 'b', pattern: 2 }
      },
      { // edge ab
        data: { id: 'a_b', source: 'a', target: 'b' }
      },
      { // edge ab
        data: { id: 'b_a', source: 'b', target: 'a' }
      }
    ],

    style: [ // the stylesheet for the graph
      {
        selector: 'node[pattern = 1]', // 通过属性区分节点
        style: {
          'background-color': '#666',
          'label': 'data(id)'
        }
      },
      {
        selector: 'node[pattern = 2]',
        style: {
          'background-color': '#333',
          'label': 'data(id)'
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle'
        }
      }
    ],

    layout: {
      name: 'grid',
      rows: 1
    }

  });

  return cy;
}