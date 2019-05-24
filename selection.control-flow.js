/**
 * 知识点：selections
 * control flow, 控制流
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
  // selection.each(function)，遍历每个元素
  let btn2 = d3.select('body').append('button').text('计算text总和').on('click', function () {
    let sum = 0;
    div.selectAll('p').each(function (d, i, g) {
      sum += d3.select(this).datum().text;
    });
    alert('总和为：', sum);
  });
  // selection.call(function[,arguments...])， 对selection调用方法，返回selection
  let btn3 = d3.select('body').append('button').text('call').on('click', function () {
    div.selectAll('p').call(function (selection, param1, param2) {
      selection.text(param1 + ' ' + param2);
    }, 'Michael', 'Zhang')
  });
  // selection.empty()，如果selection不包含元素则返回true
  let btn4 = d3.select('body').append('button').text('删除所有节点').on('click', function () {
    let data = [];
    update(data);
    alert('selection是否不包含元素：' + div.selectAll('p').empty());
  });
  // selection.nodes()，返回selection包含的元素
  // selection.node()，返回selection包含的第一个元素，如果selection为空，则返回null
  // selection.size()，返回selection包含的元素总数

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