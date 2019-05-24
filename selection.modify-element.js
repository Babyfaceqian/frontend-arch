/**
 * 知识点：selections
 * modifying elements，修改元素
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
  // 修改attr
  let btn2 = d3.select('body').append('button').text('修改attr').on('click', function () {
    div.selectAll('p').attr('id', function (d) {
      return d.id;
    });
  });
  // 修改class, 第一个参数必须是字符串，第二个参数控制是否添加该class（这里添加会自动去重），注意是添加，不同于attr的全量更新；如果不指定第一个参数，则返回该元素的class
  let btn3 = d3.select('body').append('button').text('修改class').on('click', function () {
    div.selectAll('p').classed('para', function (d, i) {
      return i % 2;
    });
  });
  // 修改style
  let btn4 = d3.select('body').append('button').text('修改style').on('click', function () {
    div.selectAll('p').attr('style', function (d) {
      return 'font-size: 20px';
    });
  });
  // 修改property，一些不能用attr和style修改的属性，如checked、value
  div.append('input');
  let btn5 = d3.select('body').append('button').text('修改property').on('click', function () {
    div.selectAll('input').property('value', function (d) {
      return 'this is an input';
    });
  });
  // 修改text，参考update函数
  // 插入html，该操作会replace该元素的子元素
  let btn6 = d3.select('body').append('button').text('插入html').on('click', function () {
    div.selectAll('p').html(function (d) {
      return 'replaced';
    });
  });
  // append，在该元素最后追加元素
  // insert，第一个参数为元素类型type，或者函数返回元素document.createElement('div')；第二个参数为节点选择器，意为在该节点前插入元素。除了可以指定位置插入，其余和append一样
  let btn7 = d3.select('body').append('button').text('insert').on('click', function () {
    div.selectAll('p').insert('div', 'div').text(function (d) {
      return d.text++;
    });
  });
  // 删除元素remove，返回删除的selection
  // clone，clone某元素并插入，返回clone的元素；参数为是否深度clone，即是否clone标签下的后代元素
  let btn8 = d3.select('body').append('button').text('clone').on('click', function () {
    div.selectAll('p').clone(true);
  });
  // sort，对元素进行排序，参数为比较器
  let btn9 = d3.select('body').append('button').text('sort').on('click', function () {
    div.selectAll('p').sort(function (a, b) {
      return b.text - a.text;
    });
  });
  // order, 在data已经排好序的情况下，使用order会比sort更快
  let btn10 = d3.select('body').append('button').text('order').on('click', function () {
    // 改变data顺序后由于id没有变化，所以顺序也不会发生改变
    let data = [{
      id: 3,
      text: 3
    }, {
      id: 1,
      text: 1
    }, {
      id: 2,
      text: 2
    }];
    div.selectAll('p').data(data, function (d) {
        return d.id;
      })
      // 需要调用order重排
      .order();
  });
  // raise, 将该元素重新append到父元素最后
  let btn11 = d3.select('body').append('button').text('raise').on('click', function () {
    div.selectAll('input').raise()
  });
  // lower, 将该元素重新insert到父元素最前
  let btn12 = d3.select('body').append('button').text('lower').on('click', function () {
    div.selectAll('input').lower()
  });
  // d3.create(name)， 新建一个未添加到dom的selection
  // d3.creator(name)， 返回一个创建元素的函数， selection.append('div') === seleciton.append(d3.creator('div'))

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