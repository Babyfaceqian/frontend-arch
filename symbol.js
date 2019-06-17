! function () {
  /**
   * symbol生成器
   */

  /**
   * d3.symbol()
   * 返回一个symbol生成器，默认symbol为d3.symbolCircle
   * symbol(arguments…)
   */
  let svg = d3.select('body').append('svg').attr('width', 600).attr('height', 600);

  let symbolGen = d3.symbol()
  svg.append('path')
    .attr('d', symbolGen())
    .style('stroke', 'black')
    .style('fill', 'none')
    .attr('transform', 'translate(10, 10)')

  /**
   * symbol.type([type])
   * 设置symbol类型，有
   * d3.symbolCircle、d3.symbolCross、d3.symbolDiamond、d3.symbolSquare、d3.symbolStar、d3.symbolTriangle、d3.symbolWye
   */
  let symbolGen2 = d3.symbol().type(function (d) {
    return d3.symbolCross;
  })
  svg.append('path')
    .attr('d', symbolGen2())
    .style('stroke', 'black')
    .style('fill', 'none')
    .attr('transform', 'translate(30, 10)')

  /**
   * symbol.size([size])
   * 设置symbol大小
   */
  let symbolGen3 = d3.symbol().size(function () {
    return 200;
  })
  svg.append('path')
    .attr('d', symbolGen3())
    .style('stroke', 'black')
    .style('fill', 'none')
    .attr('transform', 'translate(60, 10)')

  /**
   * d3.pointRadial(angle, radius)
   * 根据角半径获取位置[x,y]
   */

  /**
   * Custom Symbol Types
   * symbolType.draw(context, size)
   */
}()