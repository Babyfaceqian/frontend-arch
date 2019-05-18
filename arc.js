/**
 * 知识点：Arc，圆形或环形
 */
(function () {
  let svg = d3.select('body').append('svg').attr('id', 'svg').attr('width', 100).attr('height', 100);
  // 根据默认配置创建arc生成器
  let arc = d3.arc();
  // arc({arguments...})，传入属性生成图形，也可以使用链式调用对应修改属性的方法。返回path的d属性

  // arc.centroid([x,y])，设置图形中心点，默认 (startAngle + endAngle) / 2 and (innerRadius + outerRadius) / 2

  // arc.innerRadius([radius])，内半径
  // arc.outerRadius([radius])，外半径
  // arc.cornerRadius([radius])， 圆角半径
  // arc.startAngle([angle])，起始角度
  // arc.endAngle([angle])，结束角度
  // arc.padAngle([angle])，间隔角度，仅用于环形
  // arc.padRadius([radius])，间隔半径
  // arc.context([context])，将图形应用于某个上下文
  arc.innerRadius(0)
    .outerRadius(20)
    .startAngle(0)
    .endAngle(Math.PI);
  let path = arc();
  console.log('path', path)
  svg.append('path').attr('d', path).style('stroke', 'black')
})()