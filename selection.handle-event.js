/**
 * 知识点：selections
 * handling event, 事件处理
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
  // 添加绑定事件
  let btn2 = d3.select('body').append('button').text('添加click事件').on('click', function () {
    div.selectAll('p').on('click', function (d, i) {
      alert('you clicked ' + d.text);
    })
  });
  // 触发绑定事件, 第一个参数为事件类型，第二个参数为{bubbles:true, cancelable: true, detail: 自定义数据}，这些属性都会被添加到d3.event
  let btn3 = d3.select('body').append('button').text('触发click事件').on('click', function () {
    div.selectAll('p').dispatch('click', {
      bubbles: true,
      cancelable: true
    });
  });
  // d3.event，在事件触发过程中被设置，监听函数调用结束后重置
  // d3.customEvent，自定义事件，参数分别是 替换的event对象，监听函数，执行上下文，传入监听函数的参数列表。FIXME: 貌似不能同时触发多个事件
  let btn4 = d3.select('body').append('button').text('触发自定义事件').on('click', function () {
    d3.customEvent({
        detail: {
          prefix: 'hello '
        }
      }, function (params, params2) {
        // 获取元素绑定的数据
        let datum = this.datum();
        alert(d3.event.detail.prefix + params.name + ' ' + params2.name + ' ' + datum.text)
      },
      div.selectAll('p'),
      [{
          name: 'Michael'
        },
        {
          name: 'Lucy'
        }
      ]
    );
  });
  // d3.mouse(container)，返回当前事件触发时鼠标相对于container的位置[x, y]
  let btn5 = d3.select('body').append('button').text('添加mousemove事件').on('click', function () {
    div.selectAll('p').on('mousemove', function (d, i, g) {
      console.log('当前鼠标相对位置：', d3.mouse(this));
    });
  });
  // d3.touch(container[, touches], identifier)，返回当前事件触发时触摸点相对于container的位置
  // d3.touches(container[, touches])，返回当前事件触发时多个触摸点相对于container的位置
  // d3.clientPoint(container, event),返回指定事件触发时鼠标相对于container的位置[x, y]
  let btn6 = d3.select('body').append('button').text('添加mousemove事件').on('click', function () {
    div.selectAll('p').on('mousemove', function (d, i, g) {
      console.log('当前鼠标相对位置：', d3.clientPoint(this, d3.event));
    });
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