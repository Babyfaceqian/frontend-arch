import React from 'react';
import { connect } from 'react-redux';
import Node from '../node';
import Link from '../link';
import * as Act from '../model/actions';
import { updateSourceAndTarget } from '../lib/utils';
import RectSelect from '../rectSelect';
class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      links: [],
      options: {},
      transform: {
        x: 0,
        y: 0,
        k: 1
      },
      selectData: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      selectedNodeIds: []
    }
    // .clickDistance(10) // 设置之后不管鼠标移动多少位置，mouseup仍然会被调用，只能手动检测
  }
  componentWillMount() {
    this._initData(this.props);
  }
  componentDidMount() {
    let self = this;
    self.graph = d3.select('#graph');
    self.nodeLayer = d3.select('.nodeLayer');
    self.graphLayer = d3.select('.graphLayer');
    // 关闭默认右键菜单
    self.graph.node().oncontextmenu = function () {
      return false;
    }
    // 关闭默认zoom左键拖拽，使用自定义右键拖拽
    self.dragData = {
      ox: 0,
      oy: 0,
      x0: 0,
      y0: 0,
    };
    self.zoom = d3.zoom().on('zoom', () => {
      // 应用计算后的transform到graphLayer
      // this.graphLayer.attr('transform', d3.event.transform)
      self.setState({ transform: d3.event.transform });
    });
    self.graph.call(self.zoom)
      .on('mousedown.zoom', function () {
        // console.log('mousedown.zoom', d3.event.clientX)
        let which = d3.event.which;
        if (which == 3) {
          self.dragData.x0 = self.dragData.ox = d3.event.clientX;
          self.dragData.y0 = self.dragData.oy = d3.event.clientY;
        }
      }).on('mousemove.zoom', function () {
        // console.log('mousemove.zoom', d3.event)
        let which = d3.event.which;
        if (which == 3) {
          const { k } = self.state.transform;
          let x1 = d3.event.clientX;
          let y1 = d3.event.clientY;
          let dx = x1 - self.dragData.x0;
          let dy = y1 - self.dragData.y0;
          self.dragData.x0 = x1;
          self.dragData.y0 = y1;
          self.zoom.translateBy(self.graph, dx / k, dy / k); // 需要作用在绑定d3.zoom的元素上，d3.event才会同步
        }
      }).on('mouseup.zoom', function () {
        // console.log('mouseup.zoom', d3.event.clientX)
        let which = d3.event.which;
        if (which == 3) {
          let dx = d3.event.clientX - self.dragData.ox;
          let dy = d3.event.clientY - self.dragData.oy;
          if (Math.sqrt(dx * dx + dy * dy) < 4) {
            // TODO
            console.log('------------open chart menu----------')
          }
        }
      });

    /** 矩形选框 */
    // self.selectData = {
    //   x: 0,
    //   y: 0,
    //   width: 0,
    //   height: 0
    // };
    // self.graph.on('mousedown', function () {
    //   console.log('mousedown')
    //   let which = d3.event.which;
    //   if (which == 1) {
    //     self.selectData.x = d3.event.clientX;
    //     self.selectData.y = d3.event.clientY;
    //   }
    // }).on('mousemove', function () {
    //   console.log('mousemove')
    //   let which = d3.event.which;
    //   if (which == 1) {
    //     self.selectData.width = d3.event.clientX - self.selectData.x;
    //     self.selectData.height = d3.event.clientY - self.selectData.y;
    //     self.setState({ selectData: self.selectData });
    //   }
    // }).on('mouseup', function () {
    //   self.selectData.width = 0;
    //   self.selectData.height = 0;
    //   self.setState({ selectData: self.selectData });
    // })
    /** 矩形选框二 */
    self.selectData = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    self.drag = d3.drag().on('start', () => {
      // console.log('start', d3.event)
      self.selectData.x = d3.event.x;
      self.selectData.y = d3.event.y;
    }).on('drag', () => {
      // console.log('drag', d3.event.x, d3.event.y)
      self.selectData.width = Math.abs(d3.event.x - self.selectData.x);
      self.selectData.height = Math.abs(d3.event.y - self.selectData.y);
      let x = Math.min(d3.event.x, self.selectData.x);
      let y = Math.min(d3.event.y, self.selectData.y);
      console.log('self.selectData', self.selectData);
      self.setState({ selectData: { ...self.selectData, x, y } });
    }).on('end', () => {
      let selectedNodeIds = [];
      let startX = self.state.selectData.x;
      let startY = self.state.selectData.y;
      let width = self.selectData.width;
      let height = self.selectData.height;
      self.state.nodes.forEach(d => {
        if (d.x > startX && d.x < (startX + width) && d.y > startY && d.y < (startY + height)) {
          selectedNodeIds.push(d.id);
        }
      });
      self.selectData.width = 0;
      self.selectData.height = 0;
      self.setState({ selectData: self.selectData, selectedNodeIds });
    });
    self.graph.call(self.drag);

  }
  componentWillReceiveProps(nextProps) {
    this._initData(nextProps);
  }
  _initData = (props) => {
    const { nodes, links, options } = props;
    nodes.forEach(d => {
      d.x = d.x === undefined ? Math.random() * 800 : d.x;
      d.y = d.y === undefined ? Math.random() * 600 : d.y;
    })
    let newLinks = updateSourceAndTarget(links, nodes);
    this.setState({ nodes, links: newLinks, options });
  }
  render() {
    const { nodes, links, options, transform, selectData, selectedNodeIds } = this.state;
    console.log('selectedNodeIds', selectedNodeIds);
    console.log('------------render-------------', this.props);
    return (
      <svg
        id="graph"
        className="graph"
        width={'100%'}
        height={'100%'}
      >
        <g
          className="graphLayer"
          transform={`translate(${transform.x}, ${transform.y})scale(${transform.k})`}
        >
          <g className="nodeLayer">
            {nodes.map((d, i) => {
              const props = {
                data: d,
                size: options.size,
                onChange: (data) => this._onNodeChange(data, i),
                onClick: this._onNodeClick,
                actived: selectedNodeIds.includes(d.id)
              }
              return (
                <Node key={i} {...props} />
              )
            })}
          </g>
          <g className="linkLayer">
            {links.map(d => {
              const props = {
                data: d,
                size: options.size
              }
              return (
                <Link {...props} />
              )
            })}
          </g>
        </g>
        <RectSelect
          ref={el => this.rectSelect = el}
          {...selectData}
        />
      </svg>
    )
  }
  _onNodeClick = (d) => {
    let { selectedNodeIds } = this.state;
    if (selectedNodeIds.indexOf(d.id) == -1) {
      this.setState({ selectedNodeIds: [d.id] });
    }
    this.props.options.onNodeClick && this.props.options.onNodeClick(d)
  }
  _onNodeChange = (data, i) => {
    let nodes = this.state.nodes.map((d, index) => {
      if (i === index) {
        return data;
      }
      return d;
    });
    let links = updateSourceAndTarget(this.state.links, nodes);
    this.setState({ nodes, links });
  }
  addNodes = (nodes) => {
    this.props.dispatch(Act.addNodes(nodes));
  }
}
Graph.defaultProps = {
  nodes: [],
  links: []
}
export default connect(state => ({ graph: state.graph }))(Graph);