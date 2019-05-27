(function () {
  /**
   * 定量比例尺
   */
  // 指数比例尺
  let pow = d3.scalePow()
    .exponent(2) // 设定指数
    .domain([0, 10]) // 定义域
    .range([0, 100]); // 值域
    console.log(pow(5)); // 25, 先对定义域做指数得到[0,100]，然后对传入值做指数并获得线性比例的值。
})()