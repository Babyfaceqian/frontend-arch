! function () {
  /**
   * 颜色生成器
   */
  /**
   * d3.color(specifier)
   * specifier支持一下css方式
   * rgb(255, 255, 255)
   * rgb(10%, 20%, 30%)
   * rgba(255, 255, 255, 0.4)
   * rgba(10%, 20%, 30%, 0.4)
   * hsl(120, 50%, 20%)
   * hsla(120, 50%, 20%, 0.4)
   * #ffeeaa
   * #fea
   * steelblue
   */
  let color = d3.color('rgba(200,200,200,0.5)');
  /**
   * color.opacity
   * get或set color的透明度值
   */
  color.opacity = 0.2;
  console.log('color.opacity:', color.opacity);
  /**
   * color.rgb()
   * 返回rgb生成器
   */
  console.log('color.rgb():', color.rgb());
  /**
   * color.brighter([k])
   * 返回一个通道值都乘以k的color生成器，k值为0-1，如果k不在这个范围，则保持不变
   */
  let colorBrighter = color.brighter(0.5);
  console.log('color brighter:', colorBrighter);
  /**
   * color.darker([k])
   * 返回一个color生成器，
   */
  let colorDarker = color.darker(0.5);
  console.log('color darker:', colorDarker);
  /**
   * color.displayable()
   * 判断是否符合颜色显示标准，如opacity大于1时，返回false
   */
  color.opacity = 1.2;
  console.log('color.displayable()', color.displayable());
  /**
   * color.hex()
   * 返回16进制颜色表示，如果displayable为false，则会自动返回合适的通道值，如r大于255则按照255来计算
   * v5支持
   */
  console.log('color.hex()', color.hex());
  /**
   * color.toString()
   * 返回css字符串，如果displayable为false，则会自动返回合适的通道值，如r大于255则按照255来计算
   */
  console.log('color.toString()', color.toString());
  /**
   * d3.rgb(r, g, b[, opacity])
   * d3.rgb(specifier)
   * d3.rgb(color)
   */
  let rgb = d3.rgb(244, 131, 210, 0.5);
  console.log('rgb:', rgb);
  let rgb2 = d3.rgb('rgb(100, 200, 300)');
  console.log('rgb2:', rgb2);
  let rgb3 = d3.rgb(color);
  console.log('rgb3:', rgb3);
  /**
   * d3.hsl(h, s, l[, opacity]) 
   * d3.hsl(specifier)
   * d3.hsl(color)
   */
  console.log('d3.hsl(color):', d3.hsl(color));
  /**
   * d3.lab(l, a, b[, opacity])
   * d3.lab(specifier)
   * d3.lab(color)
   */
  console.log('d3.lab(color)', d3.lab(color));
  /**
   * d3.gray(l[, opacity])
   */

  /**
   * d3.hcl(h, c, l[, opacity])
   * d3.hcl(specifier)
   * d3.hcl(color)
   */

  /**
   * d3.lch(l, c, h[, opacity])
   * d3.lch(specifier)
   * d3.lch(color)
   */

  /**
   * d3.cubehelix(h, s, l[, opacity])
   * d3.cubehelix(specifier)
   * d3.cubehelix(color)
   */
}()