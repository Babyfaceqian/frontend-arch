! function () {

  /**
   * Modifying Elements
   */

  var svg = d3.select('body').append('svg');
  var circle = svg.append('circle').attr('r', 20).attr('cx', 50).attr('cy', 50);
  transition = circle.transition();

  /**
   * transition.attr(name, value)
   */

  /**
   * transition.attrTween(name[, factory])
   * function返回interpolate插值器
   */

  transition.attrTween("fill", function () {
    return d3.interpolateRgb("red", "blue");
    // return d3.interpolateRgb(this.getAttribute("fill"), "blue");
  });

  /**
   * transition.style(name, value[, priority])
   */

  /**
   * transition.styleTween(name[, factory[, priority]]))
   */

  // transition.styleTween("fill", function() {
  //   return d3.interpolateRgb(this.getAttribute("fill"), "green");
  //   return d3.interpolateRgb(this.style.fill, "blue");
  // });

  /**
   * transition.text(value)
   * value可以为function(d, i, this)
   */

  /**
   * transition.remove()
   * 动画结束后将元素删除
   */

  var circle2 = svg.append('circle').attr('cx', 100).attr('cy', 50).attr('r', 10);
  circle2.transition().duration(1000).attr('r', 2).remove();

  /**
   * transition.tween(name[, value])
   * value为function时返回动画函数
   */


  transition.tween("attr.r", function () {
    var i = d3.interpolate(this.getAttribute("r"), 40);
    return function (t) {
      this.setAttribute("r", i(t));
    };
  });
}()