/**
 * 知识点：selections
 * selecting elements，选择元素
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
  // d3.selection()，返回根元素，即document.documentElement。可以在d3.selection.prototype上扩展方法。
  d3.selection.prototype.checked = function (value) {
    return arguments.length < 1 ? this.property('checked') : this.property('checked', !!value);
  }
  div.append('input').attr('type', 'checkbox');
  let btn2 = d3.select('body').append('button').text('check').on('click', function () {
    div.selectAll('input').checked(true);
  });
  // d3.select(selector)，使用选择器选择元素，返回匹配的第一个元素
  // d3.selectAll(selector)，使用选择器选择元素，返回匹配的元素集
  // selection.select(selector)，在selection下面选择元素，返回匹配的第一个元素
  // selection.selectAll(selector)，在selection下面选择元素，返回匹配的元素集
  // selection.filter(filter)，filter可以为selector，也可以是函数，返回过滤后的元素集
  let btn3 = d3.select('body').append('button').text('增大id为1的元素字号').on('click', function () {
    div.selectAll('p').filter(function (d, i, g) {
        return d.id === 1;
      })
      .style('font-size', '20px');
  });
  // selection.merge(other)，将更新后的和enter的selection合并
  let btn4 = d3.select('body').append('button').text('merge').on('click', function () {
    let data = [{
      id: 1,
      text: '1 updated'
    }, {
      id: 4,
      text: '4 added'
    }];

    let selections = div.selectAll('p').data(data, function (d, i) {
      return d.id;
    }).style('color', 'yellow'); // UPDATE

    selections.exit().remove(); // EXIT

    selections = selections.enter().append('p').text(function (d) {
        return d.text;
      }) // ENTER
      .style('color', 'red')
      .merge(selections) // ENTER + UPDATE
      .style('color', 'blue');
  });
  
  // d3.matcher(selector)，d3.filter内部当参数为选择器时使用的比较器

  // d3.selectorAll(selector)，d3.selectAll内部当参数为选择器时使用的选择器

  // d3.window(node)，Returns the owner window for the specified node. If node is a node, returns the owner document’s default view; if node is a document, returns its default view; otherwise returns the node.

  // d3.style(node, name)，返回node对应的style

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