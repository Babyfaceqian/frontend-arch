(function () {
    var svg = d3.select('svg'),
        width = +svg.attr('width'),
        height = +svg.attr('height');
    var center_x = width / 2;
    var center_y = height / 2;
    //d3 code goes here 
    var nodes_data = [
        { "name": "Travis", "sex": "M" },
        { "name": "Rake", "sex": "M" },
        { "name": "Diana", "sex": "F" },
        { "name": "Rachel", "sex": "F" },
        { "name": "Shawn", "sex": "M" },
        { "name": "Emerald", "sex": "F" }
    ];

    //Create links data 
    var links_data = [
        { "source": "Travis", "target": "Rake", "type": "A" },
        { "source": "Diana", "target": "Rake", "type": "B" },
        { "source": "Diana", "target": "Rachel", "type": "A" },
        { "source": "Rachel", "target": "Rake", "type": "B" },
        { "source": "Rachel", "target": "Shawn", "type": "A" },
        { "source": "Emerald", "target": "Rachel", "type": "A" }
    ];
    var radius = 20;

    var simulation = d3.forceSimulation()
        .nodes(nodes_data);

    // set strength
    var manyBody = d3.forceManyBody()
        .strength(-100)
    // .distanceMax(100)
    // .distanceMin(10)

    var force_collide = d3.forceCollide()
        .radius(20);
    var force_center = d3.forceCenter(center_x, center_y);
    // apply the force to simulation
    simulation.force('charge_force', manyBody)
        .force('center_force', force_center)
    // .force('collide_force', force_collide)
    // change color according to attributes
    function circleColor(d) {
        if (d.sex === 'M') {
            return 'blue';
        } else if (d.sex === 'F') {
            return 'pink'
        }
    }

    function linkColor(d) {
        if (d.type === 'A') {
            return 'yellow';
        } else if (d.type === 'B') {
            return 'green';
        }
    }
    var link_force = d3.forceLink(links_data)
        .id(function (d) {
            return d.name;
        })
        .distance(200)
        .strength(0.3); // 0 - 1
    simulation.force('links', link_force)

    var link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(links_data)
        .enter()
        .append('line')
        .attr('stroke-width', 2)
        .style('stroke', linkColor);
    var nodeObj = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('g')
        .data(nodes_data)
        .enter()
        .append('g')
    var foreignObject = nodeObj
        .append('foreignObject')
        .attr('transform', function () {
            return 'translate(' + -radius + ',' + -radius + ')';
        })
        .attr('width', radius * 2)
        .attr('height', radius * 2)
    var node = foreignObject
        .append('xhtml:div')
        .attr('class', 'node')
        .style('background', circleColor)
        .style('width', radius * 2)
        .style('height', radius * 2)
        .append('span')
        .style('line-height', radius * 2 + 'px')
        .html(function (d) {
            return d.name;
        })
    //custom force to put stuff in a box 
    // function box_force() {
    //     for (var i = 0, n = nodes_data.length; i < n; ++i) {
    //         curr_node = nodes_data[i];
    //         curr_node.x = Math.max(radius, Math.min(width - radius, curr_node.x));
    //         curr_node.y = Math.max(radius, Math.min(height - radius, curr_node.y));
    //     }
    // }

    function tickActions() {
        // node.attr('cx', function (d) {
        //     return d.x;
        // })
        //     .attr('cy', function (d) {
        //         return d.y
        //     });
        //constrains the nodes to be within a box；the other way is apply a custom force.
        nodeObj.attr("transform", function (d) {
            d.x = Math.max(radius, Math.min(width - radius, d.x));
            d.y = Math.max(radius, Math.min(height - radius, d.y));
            return 'translate(' + d.x + ',' + d.y + ')';
        })

        link.attr('x1', function (d) {
            return d.source.x
        })
            .attr('y1', function (d) {
                return d.source.y
            })
            .attr('x2', function (d) {
                return d.target.x
            })
            .attr('y2', function (d) {
                return d.target.y
            })

        //adds 1 to the center position
        // center_x += 1;
        // center_y += 1;

        //updates the center position
        // force_center.x(center_x);
        // force_center.y(center_y);
    }
    simulation.on('tick', tickActions);

    //create drag handler with d3.drag()
    //only interested in "drag" event listener, not "start" or "end"        
    // var drag_handler = d3.drag()
    //     .on("drag", function (d) {
    //         d3.select(this)
    //             .attr("cx", d.x = d3.event.x)
    //             .attr("cy", d.y = d3.event.y);
    //     });
    var drag_handler = d3.drag()
        .on('start', function (d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        })
        .on('drag', function (d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;

        })
        .on('end', function (d) {
            if (!d3.event.active) simulation.alphaTarget(0).restart();
            d.fx = d.x;
            d.fy = d.y;
        })
    drag_handler(nodeObj);

    // apply force on X direction
    // var force_X = d3.forceX(400)
    //     .strength(0.2);
    // simulation.force('force_x', force_X);

    //make sure you can't drag the circle outside the box
    // function drag_drag(d) {
    //     d.fx = Math.max(radius, Math.min(width - radius, d3.event.x));
    //     d.fy = Math.max(radius, Math.min(height - radius, d3.event.y));
    // }

    //specify what to do when zoom event listener is triggered 
    function zoom_actions() {
        nodeObj.attr("transform", d3.event.transform);
        link.attr("transform", d3.event.transform);
        // var transform = d3.zoomTransform(this);
        // // same as  this.setAttribute("transform", "translate(" + transform.x + "," +
        // //                             transform.y + ") scale(" + transform.k + ")");
        // this.setAttribute("transform", transform)
    }
    //create zoom handler 
    //zoom actions is a function that performs the zooming. 
    var zoom_handler = d3.zoom()
        .on("zoom", zoom_actions);
    // zoom_handler(svg);
})()