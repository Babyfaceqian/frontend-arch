import styles from './Graph.less';
import * as consts from './constants';
/**
 * 1. 没有继承
 * 2. 将zr实例保存到Graph对象中
 * 
 * 优点：
 * 1. Graph有自己的属性和方法，不会覆盖zr实例的属性和方法
 * 缺点：
 * 1. 在外部需要单独调用Graph.zr来获取zr实例
 */
const Graph = function (dom, opts = consts.INITIAL_OPTS) {
  if (!dom) throw 'A dom is required.'
  this.init(dom, opts);
}
Graph.prototype = {
  init: function (dom, opts) {
    this.zr = zrender.init(dom, opts);
    this.zr.on('click', e => {
      if (!e.target) {
        this.clearSelectedNodes();
        this.clearSelectedLinks();
      }
    })
    this.zr.on('mousewheel', e => {
      // 监听鼠标滚轮事件
      console.log('e', e);
      let z = this.nodeAndLinkGroup.scale;
      z = [z[0] - e.wheelDelta, z[1] - e.wheelDelta];
      let origin = [e.offsetX, e.offsetY];
      this.zoom(z, origin);
    })
    this.nodeAndLinkGroup = new zrender.Group();
    // 创建拖拽框
    this.dragRect = new zrender.Rect(consts.DRAG_RECT_OPT);
    this.dragRect.on('dragstart', e => {
      this._x = e.offsetX;
      this._y = e.offsetY;
    })
    this.dragRect.on('drag', e => {
      let target = e.target;
      let x = e.offsetX;
      let y = e.offsetY;
      let dx = x - this._x;
      let dy = y - this._y;
      this._x = x;
      this._y = y;
      this.transform(dx, dy);
    })
    this.nodeAndLinkGroup.add(this.dragRect);
    // 创建缩放框
    // this.zoomRect = new zrender.Rect(consts.ZOOM_RECT_OPT);
    // this.zoomRect.on('mousewheel', e => {
    //   // 监听鼠标滚轮事件
    //   let origin = [e.offsetX, e.offsetY];
    //   let z = this.nodeAndLinkGroup.scale;
    //   z = [z[0] - e.wheelDelta, z[1] - e.wheelDelta];
    //   this.zoomRect.attr('scale', z);
    //   console.log('zoomRect', this.zoomRect)
    //   // this.zoom(z, origin);
    // })
    this.nodeAndLinkGroup.add(this.zoomRect);
    this.zr.add(this.nodeAndLinkGroup);
    this.nodeGroup;
    this.linkGroup;
    this.selectedNodes = [];
    this.selectedLinks = [];
    this.highlighedNodes = [];
  },
  addNodes: function (opts) {
    if (!zrender.util.isArray(opts)) throw 'arguments must be an array.'
    if (!this.nodeGroup) {
      // 添加node容器
      this.nodeGroup = new zrender.Group();
      this.nodeAndLinkGroup.add(this.nodeGroup);
    }
    opts.forEach(opt => {
      let pattern = opt.pattern || 0; // 选择节点模板
      let _opt = zrender.util.clone(consts.NODE_OPT[pattern]);
      _opt.shape.cx = opt.x || _opt.shape.cx; // 转换数据
      _opt.shape.cy = opt.y || _opt.shape.cy;
      let node = new zrender.Circle({
        ..._opt,
        ...opt
      });
      node.on('click', e => {
          let c = e.target;
          let selectedNodes = this.selectedNodes;
          if (window.event.ctrlKey || window.event.metaKey) {
            // ctrl被按下时为多选, metaKey兼容mac
            if (!selectedNodes.find(s => s.id === c.id)) {
              selectedNodes.push(c);
            }
          } else {
            selectedNodes = [c];
          }
          this.clearSelectedLinks();
          this.setSelectedNodes(selectedNodes);
        })
        .on('drag', e => {
          // 拖拽时更新link位置
          let node = e.target;
          let link = node.link;
          if (!link) return;
          link.forEach(l => {
            if (node.id === l.source) {
              let shape = {
                ...l.shape,
                x1: node.shape.cx + node.position[0],
                y1: node.shape.cy + node.position[1]
              };
              l.attr('shape', shape);
            } else {
              let shape = {
                ...l.shape,
                x2: node.shape.cx + node.position[0],
                y2: node.shape.cy + node.position[1]
              };
              l.attr('shape', shape);
            }
          })
        })
      this.nodeGroup.add(node);
    })
  },
  getNodes: function () {
    return this.nodeGroup.children();
  },
  setSelectedNodes: function (nodes) {
    this.clearSelectedNodes();
    this.selectedNodes = nodes;
    console.log('this.selectedNodes.', this.selectedNodes);
    this.selectedNodes.forEach(s => {
      let style = {
        ...s.style,
        ...consts.SELECTED_NODE_OPT.style
      };
      s.attr('style', style);
    });
  },
  clearSelectedNodes: function () {
    this.nodeGroup && this.nodeGroup.children().forEach(s => {
      let pattern = s.pattern || 0; // 选择节点模板
      let style = {
        ...s.style,
        ...consts.NODE_OPT[pattern].style
      };
      s.attr('style', style);
    });
    this.selectedNodes = [];
  },
  setHighlightedNodes: function (nodes) {
    this.clearHighlightedNodes();
    this.highlighedNodes = nodes;
    this.highlighedNodes.forEach(s => {
      let style = {
        ...s.style,
        ...consts.HIGHLIGHTED_NODE_OPT.style
      };
      s.attr('style', style);
    });
  },
  clearHighlightedNodes: function () {
    this.nodeGroup && this.nodeGroup.children().forEach(s => {
      let style = {
        ...s.style,
        opacity: 1
      };
      s.attr('style', style);
    });
    this.highlighedNodes = [];
  },
  addLinks: function (opts) {
    if (!zrender.util.isArray(opts)) throw 'arguments must be an array.'
    if (!this.linkGroup) {
      // 添加link容器
      this.linkGroup = new zrender.Group();
      this.nodeAndLinkGroup.add(this.linkGroup);
    }
    opts.forEach(opt => {
      let pattern = opt.pattern || 0; // 选择link模板
      let _opt = zrender.util.clone(consts.LINK_OPT[pattern]);
      let sourceNode = this.nodeGroup.children().find(n => n.id === opt.source);
      let targetNode = this.nodeGroup.children().find(n => n.id === opt.target);
      let shape = {
        ..._opt.shape,
        x1: sourceNode.shape.cx + sourceNode.position[0],
        y1: sourceNode.shape.cy + sourceNode.position[1],
        x2: targetNode.shape.cx + targetNode.position[0],
        y2: targetNode.shape.cy + targetNode.position[1]
      };
      let link = new zrender.Line({
        ..._opt,
        shape,
        ...opt
      });
      link.on('click', e => {
        let c = e.target;
        let selectedLinks = this.selectedLinks;
        if (window.event.ctrlKey || window.event.metaKey) {
          // ctrl被按下时为多选, metaKey兼容mac
          if (!selectedLinks.find(s => s.id === c.id)) {
            selectedLinks.push(c);
          }
        } else {
          selectedLinks = [c];
        }
        this.setSelectedLinks(selectedLinks);
      })
      // 绑定node到link
      link.attr('sourceEle', sourceNode);
      link.attr('targetEle', targetNode);
      // 绑定link到node
      let sourceNode_link = sourceNode.link || [];
      sourceNode_link.push(link);
      let targetNode_link = targetNode.link || [];
      targetNode_link.push(link);
      sourceNode.attr('link', sourceNode_link);
      targetNode.attr('link', targetNode_link);

      this.linkGroup.add(link);
    })
  },
  getLinks: function () {
    return this.linkGroup.children();
  },
  setSelectedLinks: function (links) {
    this.clearSelectedLinks();
    this.clearSelectedNodes();
    this.selectedLinks = links;
    console.log('this.selectedLinks', this.selectedLinks);
    this.selectedLinks.forEach(s => {
      let style = {
        ...s.style,
        ...consts.SELECTED_LINK_OPT.style
      };
      console.log('style', style);
      s.attr('style', style);
      // 同时选中连接的两个节点
      this.setSelectedNodes([s.sourceEle, s.targetEle]);
    });
  },
  clearSelectedLinks: function () {
    this.linkGroup && this.linkGroup.children().forEach(s => {
      let pattern = s.pattern || 0; // 选择link模板
      let style = {
        ...s.style,
        ...consts.LINK_OPT[pattern].style
      };
      s.attr('style', style);
    });
    this.selectedLinks = [];
  },
  zoom: function (z, origin) {
    // FIXME: 缩放位置不正确    
    this.nodeAndLinkGroup.attr('origin', origin);
    this.nodeAndLinkGroup.attr('scale', z);
  },
  transform: function (dx, dy) {
    let position = this.nodeAndLinkGroup.position || [0, 0];
    position[0] += dx;
    position[1] += dy;
    this.nodeAndLinkGroup.attr('position', position);
    this.dragRect.attr('position', position);
  }
}

export default Graph;