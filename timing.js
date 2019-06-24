! function () {
  /**
   * Timing
   */

  var data = [0, 1];
  var d = d3.select('body').selectAll('.item').data(data)
  d.enter().append('div').attr('class', 'item').style('width', '20px').style('height', '20px').style('background', 'black');
  var transition = d3.selectAll('.item').transition();
  /**
   * transition.delay([value])
   * value可以为function
   */

  transition.delay(function (d, i) {
    return i * 1000;
  }).style('margin-left', '50px');

  /**
   * transition.duration([value])
   * value可以为function
   */

  /**
   * transition.ease([value])
   */
}()