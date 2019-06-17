! function () {
  /**
   * Stacks
   */
  let svg = d3.select('body').append('svg').attr('width', 600).attr('height', 600);

  /**
   * d3.stack()
   * 堆栈生成器
   * stack(data[, arguments…])，data必传
   * Generates a stack for the given array of data, returning an array representing each series
   */
  let data = [{
    a: 10,
    b: 10
  }, {
    a: 20,
    b: 20
  }, {
    a: 30,
    b: 30
  }, {
    a: 40,
    b: 20
  }]
  let stack = d3.stack().keys(['a', 'b']);
  console.log(stack(data))
}()