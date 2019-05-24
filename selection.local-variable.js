/**
 * 知识点：selections
 * local variable, 局部变量
 */
(function () {
  let div = d3.select('body').append('div');
  // 添加id为1,2,3的节点
  let btn1 = d3.select('body').append('button').text('添加节点[1,2,3]').on('click', function () {
    let data = [{
      id: 1,
      text: 1
    }, {
      id: 2,
      text: 2
    }, {
      id: 3,
      text: 3
    }];
    update(data);
  });

  // selection.local()，声明并返回一个本地变量，该变量作为DOM元素的属性；类似selection.property方法。
  // local.set(node, value)
  // local.get(node)
  // local.remove(node)
  // local.toString()

  function update(data) {
    // 绑定数据到节点，也就是update，会直接更新该节点
    let eles_data = div.selectAll('p').data(data, function (d) {
      return d.id;
    }).text(function (d) {
      return d.text;
    });
    // 新的数据会enter
    let enter = eles_data.enter();
    let eles = enter.append('p').text(function (d) {
      return d.text;
    });;
    // 丢失的数据会exit & remove
    eles_data.exit().remove();
  }
})()