! function () {
  /**
   * 区域生成器
   */
  let svg = d3.select('body').append('svg').attr('width', 600).attr('height', 600);
  /**
   * d3.area()
   * 返回区域生成器
   * x为自变量，y0，y1是因变量，两个y围合成的area
   * area(data)，传入一系列[x,y1]点组成的数组
   */
  let data = [
    [10, 50],
    [30, 30],
    [50, 40],
    [70, 100],
    [90, 30],
    [110, 100],
  ];
  let areaGen = d3.area();
  svg.append('path')
    .attr('d', areaGen(data))

  /**
   * area.x([x])
   * x访问器
   * area.y1([y])
   * y1访问器
   */
  let areaGen2 = d3.area().x(function (d) {
    return d[0] + 150;
  }).y1(function (d) {
    return d[1] + 20;
  })
  svg.append('path')
    .attr('d', areaGen2(data))

  /**
   * area.defined([defined])
   * 控制是否渲染某个数据，传入defined访问器，参数为d，i，返回true则渲染，返回false则不渲染
   */
  let areaGen3 = d3.area().defined(function (d, i, data) {
    return i !== 2;
  })
  svg.append('path')
    .attr('d', areaGen3(data))
    .attr('transform', 'translate(0, 200)');

  /**
   * area.curve([curve])
   * 曲线
   */

  /**
   * area.context([context])
   * 绑定上下文
   */

  /**
   * area.lineX0()
   * 返回该线段生成器，x0 - y0
   */

  /**
   * area.lineY0()
   * 返回该线段生成器，x0 - y0
   */

  /**
   * area.lineX1()
   * 返回该线段生成器，x1 - y0
   */

  /**
   * area.lineY1()
   * 返回该线段生成器，x0 - y1
   */

  /**
   * d3.areaRadial()
   * 返回以角半径为数据的区域生成器，
   * areaRadial(data)，data为[angle, radius]点的数组
   */
  let per = (2 * Math.PI) / 12;
  let data2 = [
    [per, 100],
    [per * 2, 50],
    [per * 3, 60],
    [per * 4, 80],
    [per * 5, 70],
    [per * 6, 90],
  ];
  let areaRadialGen = d3.areaRadial();
  svg.append('path')
    .attr('d', areaRadialGen(data2))
    .attr('transform', 'translate(200,200)');

  /**
   * areaRadial.angle([angle])
   * Equivalent to area.x, except the accessor returns the angle in radians, with 0 at -y (12 o’clock)
   */

  /**
   * areaRadial.startAngle([angle])
   * Equivalent to area.x0, except the accessor returns the angle in radians, with 0 at -y (12 o’clock). Note: typically angle is used instead of setting separate start and end angles
   */

  /**
   * areaRadial.endAngle([angle])
   * Equivalent to area.x1, except the accessor returns the angle in radians, with 0 at -y (12 o’clock). Note: typically angle is used instead of setting separate start and end angles
   */

  /**
   * areaRadial.radius([radius])
   * Equivalent to area.y, except the accessor returns the radius: the distance from the origin ⟨0,0⟩.
   */

  /**
   * areaRadial.innerRadius([radius])
   * Equivalent to area.y0, except the accessor returns the radius: the distance from the origin ⟨0,0⟩.
   */

  /**
   * areaRadial.outerRadius([radius])
   * Equivalent to area.y1, except the accessor returns the radius: the distance from the origin ⟨0,0⟩.
   */

  /**
   * areaRadial.defined([defined])
   */

  /**
   * areaRadial.curve([curve])
   */

  /**
   * areaRadial.context([context])
   */

  /**
   * areaRadial.lineStartAngle()
   * areaRadial.lineInnerRadius() 
   * areaRadial.lineEndAngle()
   */

  /**
   * areaRadial.lineOuterRadius()
   */
}()