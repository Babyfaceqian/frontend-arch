/**
 * 知识点：update，enter, exit
 * 对节点的增删改查是通过数据来驱动的，当数据id对应元素不存在时就会enter——增加，当数据id对应元素存在时就会update——更新，当元素没有获得对应数据id时，该元素就会被删除。
 * 即任何对节点的修改都应该是全量的。
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
  // 删除id为3的节点
  let btn2 = d3.select('body').append('button').text('删除节点3').on('click', function () {
    let data = [{
      id: 1,
      text: 1
    }, {
      id: 2,
      text: 2
    }];
    update(data);
  });
  // 更新id为2的节点
  let btn3 = d3.select('body').append('button').text('更新节点2').on('click', function () {
    let data = [{
      id: 1,
      text: 1
    }, {
      id: 2,
      text: '2 updated'
    }];
    update(data);
  });

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