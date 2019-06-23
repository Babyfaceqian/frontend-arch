! function () {

  /**
   * d3.transition([name])
   * 返回一个新的transition。
   * selection.transition([name])
   * 返回以name为名字的transition，如果没有，则返回新的。
   */
  var t = d3.transition('first')
    .duration(2000)
    .ease(d3.easeLinear);

  var data = [0, 1];
  var d = d3.select('body').selectAll('.block').data(data);
  var block = d.enter().append('div').attr('class', 'block');
  block.style('width', '100px').style('height', '100px');
  block.style('background', 'grey');
  block.transition('second').duration(2000).style('background', 'blue');
  block.transition(t).style('width', '200px');
  /**
   * selection.interrupt([name])
   * d3.interrupt(node[, name]) // 只能对单个node
   */
  block.interrupt('first');
  d3.interrupt(block.node(), 'second')

  /**
   * transition.select(selector)
   * selector可以为选择器也可以function，如果为function则参数为d, i, this，需要返回selection；返回匹配的第一个selection。
   * transition.selectAll(selector)
   * 返回匹配的所有selection。
   */
  block.transition('third').duration(2000).select(function (d, i) {
    if (i !== 0) {
      return this;
    }
  }).style('height', '200px')

  /**
   * transition.filter(filter)
   * filter可以为选择器也可以function，如果为function则参数为d, i, this，需要返回selection；
   */
  block.transition('fourth').duration(2000).filter(function (d, i) {
    return i == 0;
  }).style('margin-left', '50px')

  /**
   * transition.merge(other) 
   */
  var fifth = block.transition('fifth').duration(2000);
  block.transition(fifth).merge(fifth.delay(2000)).style('margin-top', '50px');
  // block.transition(fifth).delay(2000).style('margin-top', '50px'); 同上

  /**
   * transition.transition()
   */
  var sixth = d3.transition().duration(2000).delay(2000);
  block.transition(sixth).style('margin-left', '100px').transition(sixth).style('margin-left', '150px')
  /**
   * d3.active(node[, name])
   * 返回激活的transition
   */
}()