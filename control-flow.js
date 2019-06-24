! function () {
  /**
   * Control Flow
   */

  /**
   * transition.on(typenames[, listener])
   */

  var data = [0, 1];
  var d = d3.select('body').selectAll('.item').data(data)
  d.enter().append('div').attr('class', 'item').style('width', '20px').style('height', '20px').style('background', 'black');
  var transition = d3.selectAll('.item').transition();

  
}()