const GraphVisWidget = function (options) {
    const graphVis = function (options) {
        let self = this;
        self.container = d3.select(options.element);
        self.nodes = [];
    }
    graphVis.prototype = {
        init: function () {
            this.initGraph();
        },
        initGraph: function () {
            let self = this;
            self.svg = self.container.append('svg');
            self.svg.attr('width', options.element.clientWidth);
            self.svg.attr('height', options.element.clientHeight);
            self.nodeGroup = self.svg.append('g').attr('class', 'nodeGroup');
            self.zoom = d3.zoom().on('zoom', function () {
                let { x, y, k } = d3.event.transform
                // self.nodeGroup.attr('transform', `translate(${x},${y}) scale(${k})`)
                self.nodeGroup.selectAll('.node').attr('transform', `translate(${x},${y}) scale(${k})`)
            });
            self.svg.call(self.zoom);
        },
        redraw: function () {
            let self = this;
            let nodeData = self.nodeGroup.selectAll('.node').data(self.nodes, function (d) {
                return d.id;
            });
            let updateNodes = nodeData.transition().duration(1000).attr('cx', function (d) {
                return d.x;
            }).attr('cy', function (d) {
                return d.y;
            }); // update
            let newNodes = nodeData.enter().append('circle').attr('class', 'node').attr('r', 5).attr('cx', function (d) {
                return d.x;
            }).attr('cy', function (d) {
                return d.y;
            }).style('opacity', 0).transition().duration(1000).style('opacity', 1); // enter
            let removedNodes = nodeData.exit().transition().duration(1000).style('opacity', 0).remove(); // exit
        },
        setNodes: function (nodes) {
            let self = this;
            self.nodes = nodes;
        },
        getNodes: function () {
            let self = this;
            return self.nodes;
        }
    };
    let graph = new graphVis(options);
    graph.init()
    return {
        redraw: function () {
            graph.redraw.apply(graph, arguments);
        },
        setNodes: function () {
            graph.setNodes.apply(graph, arguments);
        },
        getNodes: function () {
            return graph.getNodes.apply(graph, arguments);
        }
    }
}

export default GraphVisWidget;