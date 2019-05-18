/**
 * 知识点：update，enter
 * 可以自定义键值作为更新的依据，如id
 */
(function () {
  let div = d3.select('body').append('div');
  // 原始数据
  let data = [{
    id: 1,
    text: '1'
  }, {
    id: 2,
    text: '2'
  }, {
    id: 3,
    text: '3'
  }];
  // 绑定数据到节点，也就是update，会直接更新该节点。这里还没有p元素，所以并没有更新
  let eles_data = div.selectAll('p').data(data, function (d) {
    return d.id;
  });
  // 获取新节点，也就是enter。这里获得了3个enter
  let enter = eles_data.enter();
  // 根据新节点插入元素并更新文本。这里插入了3个p元素并更新了对应的text
  let eles = enter.append('p').text(function (d) {
    return d.text;
  });
  // 执行update前，已存在三个p元素
  update();

  function update() {
    let data = [{
      id: 1,
      text: '1 updated'
    }, {
      id: 2,
      text: '2 updated'
    }, {
      id: 4,
      text: '3 updated'
    }];
    // 绑定数据到节点，也就是update，会直接更新该节点，这里设置使用id作为键值对应更新。这里更新了已存在的id为1和2的元素。
    let eles_data = div.selectAll('p').data(data, function (d) {
      return d.id;
    }).text(function (d) {
      return d.text;
    });
    // 显然，id为4的数据属于enter，因为在原有元素绑定的数据当中没有id为4的数据。
    let enter = eles_data.enter();
    // 为id为4的数据插入p元素并更新
    let eles = enter.append('p').text(function (d) {
      return d.text;
    });;
  }
})()