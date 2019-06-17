! function () {
  /**
   * links生成器
   */
  let svg = d3.select('body').append('svg').attr('width', 600).attr('height', 600);

  /**
   * d3.linkVertical()
   * 竖直切线
   */
  let data = {
    source: [10, 10],
    target: [100, 100]
  }
  let linkGen = d3.linkVertical()
  svg.append('path')
    .attr('d', linkGen(data))
    .style('stroke', 'black')
    .style('fill', 'none')

  /**
   * d3.linkHorizontal()
   * 水平切线
   */
  let linkGen1 = d3.linkHorizontal()
  svg.append('path')
    .attr('d', linkGen1(data))
    .style('stroke', 'black')
    .style('fill', 'none')
    .attr('transform', 'translate(100, 0)')

  /**
   * link(arguments…)
   * 返回d
   */

  /**
   * link.source([source])
   * 设置source访问器
   * link.target([target])
   * 设置target访问器
   */

  let data1 = {
    x0: 10,
    y0: 10,
    x1: 100,
    y1: 100
  }
  let linkGen2 = d3.linkHorizontal().source(function (d) {
    return [d.x0, d.y0];
  }).target(function (d) {
    return [d.x1, d.y1];
  })

  svg.append('path')
    .attr('d', linkGen2(data1))
    .style('stroke', 'black')
    .style('fill', 'none')
    .attr('transform', 'translate(200, 0)')

  /**
   * link.x([x])
   * 设置x访问器
   * link.y([y])
   * 设置y访问器
   */
  let data2 = {
    source: {
      x: 10,
      y: 10
    },
    target: {
      x: 100,
      y: 100
    }
  }
  let linkGen3 = d3.linkHorizontal().x(function (d) {
    return d.x;
  }).y(function (d) {
    return d.y;
  })
  svg.append('path')
    .attr('d', linkGen3(data2))
    .style('stroke', 'black')
    .style('fill', 'none')
    .attr('transform', 'translate(300, 0)')

  /**
   * link.context([context])
   */

  /**
   * d3.linkRadial()
   * 回以角半径为数据的区域生成器
   */
  let per = (2 * Math.PI) / 12;
  let data3 = {
    source: [per, 100],
    target: [per * 5, 100]
  }
  var linkGen4 = d3.linkRadial()
    .angle(function (d) {
      return d[0];
    })
    .radius(function (d) {
      return d[1];
    });
  svg.append('path')
    .attr('d', linkGen4(data3))
    .style('stroke', 'black')
    .style('fill', 'none')
    .attr('transform', 'translate(400, 0)')

  /**
   * linkRadial.angle([angle])
   * 角度访问器
   * linkRadial.radius([radius])
   * 半径访问器
   */
}()