! function () {

  /**
   * selection.transition([name])
   */
  var t = d3.transition()
    .duration(2000)
    .ease(d3.easeLinear);

  var data = [0, 1];
  var d = d3.select('body').selectAll('.block').data(data);
  var block = d.enter().append('div').attr('class', 'block');
  block.style('width', '100px').style('height', '100px');
  block.style('background', 'white');
  block.transition(t).style('background', 'blue');
  /**
   * selection.interrupt([name])
   * d3.interrupt(node[, name]) // 只能对单个node
   */
  setTimeout(function () {
    block.interrupt()
    // d3.interrupt(block.node())
  }, 500);

  /**
   * d3.transition([name])
   */

  /**
   * transition.select(selector)
   */

  /**
   * transition.filter(filter)
   */

  var t2 = d3.transition().duration(2000)
    .ease(d3.easeLinear);
  block.transition(t2).filter(function (d, i) {
    console.log('filter', d, i)
    return i !== 0;
  }).style('background', 'red');

  /**
   * transition.merge(other) 
   */
  var block2 = d3.select('body').append('div').attr('class', 'block2');
  var t3 = d3.transition().duration(2000)
  block2.transition(t3);
  /**
   * d3.active(node[, name])
   */
}()