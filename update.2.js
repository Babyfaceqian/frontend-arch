/**
 * 知识点：update，enter, exit
 * 默认使用数组下标作为键值进行更新
 */
(function () {
  let div = d3.select('body').append('div');
  // 原始数据
  let data = [1, 2, 3];
  // 绑定数据到节点，也就是update，会直接更新该节点。这里还没有p元素，所以并没有更新
  let eles_data = div.selectAll('p').data(data);
  // 获取新节点，也就是enter。这里获得了3个enter
  let enter = eles_data.enter();
  // 根据新节点插入元素并更新文本。这里插入了3个p元素并更新了对应的text
  let eles = enter.append('p').text(function (d) {
    return d;
  });
  // 执行update前，已存在三个p元素
  update();

  function update() {
    let data = [4, 5];
    // 绑定数据到节点，也就是update，会直接更新该节点，这里默认使用数组index作为键值对应更新。这里更新了index为0，1的元素
    let eles_data = div.selectAll('p').data(data).text(function (d) {
      return d;
    });
    // 这里没有enter
    let enter = eles_data.enter();
    // 这里没有插入元素p
    let eles = enter.append('p').text(function (d) {
      return d;
    });;
    // 这里删除了index为2的元素，因为已存在p元素的数量比data多了1个
    eles_data.exit().remove();
  }
})()