! function () {
  /**
   * 曲线生成器
   * Curves不想line直接拿来用，而是要传入到line.curve()、area.curve()中使用
   */
  let svg = d3.select('body').append('svg').attr('width', 600).attr('height', 600);

  /**
   * d3.curveBasis(context)
   */
  let data = [
    [10, 10],
    [20, 20],
    [30, 10],
    [40, 30],
    [50, 10],
    [60, 20],
    [70, 10],
  ]
  let lineGen = d3.line()
    .curve(d3.curveBasis);

  svg.append('path')
    .attr('d', lineGen(data))
    .style('stroke', 'black')
    .style('fill', 'rgba(0,0,0,0)')

  /**
   * d3.curveBasisClosed(context)
   */
  let lineGen2 = d3.line()
    .curve(d3.curveBasisClosed);

  svg.append('path')
    .attr('d', lineGen2(data))
    .style('stroke', 'black')
    .style('fill', 'rgba(0,0,0,0)')
    .attr('transform', 'translate(100, 0)')

  /**
   * d3.curveBasisOpen(context)
   */
  let lineGen3 = d3.line()
    .curve(d3.curveBasisOpen);

  svg.append('path')
    .attr('d', lineGen3(data))
    .style('stroke', 'black')
    .style('fill', 'rgba(0,0,0,0)')
    .attr('transform', 'translate(200, 0)')

  /**
   * d3.curveBundle(context)
   */
  let lineGen4 = d3.line()
    .curve(d3.curveBundle);

  svg.append('path')
    .attr('d', lineGen4(data))
    .style('stroke', 'black')
    .style('fill', 'rgba(0,0,0,0)')
    .attr('transform', 'translate(300, 0)')

  /**
   * d3.curveCardinal(context)
   */

  let lineGen5 = d3.line()
    .curve(d3.curveCardinal);

  svg.append('path')
    .attr('d', lineGen5(data))
    .style('stroke', 'black')
    .style('fill', 'rgba(0,0,0,0)')
    .attr('transform', 'translate(400, 0)')
  /**
   * d3.curveCardinalClosed(context)
   */

  let lineGen6 = d3.line()
    .curve(d3.curveCardinalClosed);

  svg.append('path')
    .attr('d', lineGen6(data))
    .style('stroke', 'black')
    .style('fill', 'rgba(0,0,0,0)')
    .attr('transform', 'translate(500, 0)')

  /**
   * d3.curveCardinalOpen(context)
   */

  let lineGen7 = d3.line()
    .curve(d3.curveCardinalOpen);

  svg.append('path')
    .attr('d', lineGen7(data))
    .style('stroke', 'black')
    .style('fill', 'rgba(0,0,0,0)')
    .attr('transform', 'translate(0, 50)')

  /**
   * d3.curveCatmullRom(context)
   */

  let lineGen8 = d3.line()
    .curve(d3.curveCatmullRom);

  svg.append('path')
    .attr('d', lineGen8(data))
    .style('stroke', 'black')
    .style('fill', 'rgba(0,0,0,0)')
    .attr('transform', 'translate(100, 50)')
  /**
   * d3.curveCatmullRomClosed(context)
   */

  let lineGen9 = d3.line()
    .curve(d3.curveCatmullRomClosed);

  svg.append('path')
    .attr('d', lineGen9(data))
    .style('stroke', 'black')
    .style('fill', 'rgba(0,0,0,0)')
    .attr('transform', 'translate(200, 50)')
  /**
   * d3.curveCatmullRomOpen(context)
   */

  let lineGen10 = d3.line()
    .curve(d3.curveCatmullRomOpen);

  svg.append('path')
    .attr('d', lineGen10(data))
    .style('stroke', 'black')
    .style('fill', 'rgba(0,0,0,0)')
    .attr('transform', 'translate(300, 50)')

  /**
   * d3.curveLinear(context)
   */

  let lineGen11 = d3.line()
    .curve(d3.curveLinear);

  svg.append('path')
    .attr('d', lineGen11(data))
    .style('stroke', 'black')
    .style('fill', 'rgba(0,0,0,0)')
    .attr('transform', 'translate(400, 50)')

  /**
   * d3.curveLinearClosed(context)
   */

  let lineGen12 = d3.line()
    .curve(d3.curveLinearClosed);

  svg.append('path')
    .attr('d', lineGen12(data))
    .style('stroke', 'black')
    .style('fill', 'rgba(0,0,0,0)')
    .attr('transform', 'translate(500, 50)')
  /**
   * d3.curveMonotoneX(context)
   */

  let lineGen13 = d3.line()
    .curve(d3.curveMonotoneX);

  svg.append('path')
    .attr('d', lineGen13(data))
    .style('stroke', 'black')
    .style('fill', 'rgba(0,0,0,0)')
    .attr('transform', 'translate(0, 100)')

  /**
   * d3.curveMonotoneY(context)
   */

  let lineGen14 = d3.line()
    .curve(d3.curveMonotoneY);

  svg.append('path')
    .attr('d', lineGen14(data))
    .style('stroke', 'black')
    .style('fill', 'rgba(0,0,0,0)')
    .attr('transform', 'translate(100, 100)')

  /**
   * d3.curveNatural(context)
   */

  let lineGen15 = d3.line()
    .curve(d3.curveNatural);

  svg.append('path')
    .attr('d', lineGen15(data))
    .style('stroke', 'black')
    .style('fill', 'rgba(0,0,0,0)')
    .attr('transform', 'translate(200, 100)')

  /**
   * d3.curveStep(context)
   */

  let lineGen16 = d3.line()
    .curve(d3.curveStep);

  svg.append('path')
    .attr('d', lineGen16(data))
    .style('stroke', 'black')
    .style('fill', 'rgba(0,0,0,0)')
    .attr('transform', 'translate(300, 100)')

  /**
   * d3.curveStepAfter(context)
   */

  let lineGen17 = d3.line()
    .curve(d3.curveStepAfter);

  svg.append('path')
    .attr('d', lineGen17(data))
    .style('stroke', 'black')
    .style('fill', 'rgba(0,0,0,0)')
    .attr('transform', 'translate(400, 100)')


  /**
   * d3.curveStepBefore(context)
   */

  let lineGen18 = d3.line()
    .curve(d3.curveStepBefore);

  svg.append('path')
    .attr('d', lineGen18(data))
    .style('stroke', 'black')
    .style('fill', 'rgba(0,0,0,0)')
    .attr('transform', 'translate(500, 100)')
}()