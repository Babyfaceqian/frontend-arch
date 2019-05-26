/**
 * 知识点：selections
 * joining data, 绑定数据
 * 在被绑定数据的选择集中添加元素后，新元素会继承该数据
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
  // data，绑定数据，默认key为index，可以指定key
  // join，根据绑定的数据appends、removes、reorders元素，不返回。相当于以前分开的操作写在一起了。v5.8.0添加
  let btn2 = d3.select('body').append('button').text('join').on('click', function () {
    let data = [{
      id: 1,
      text: '1 updated'
    }, {
      id: 2,
      text: '2 updated'
    }, {
      id: 4,
      text: '4 added'
    }];
    div.selectAll('p')
      .data(data, function (d) {
        return d.id;
      })
      .join(
        function (enter) {
          enter.append('p').text(function (d) {
            return d.text;
          })
        },
        function (update) {
          update.style('font-size', '20px')
        },
        function (exit) {
          exit.remove();
        }
      )
    console.log('aaa', div.selectAll('p')
      .data(data, function (d) {
        return d.id;
      })
      .join(
        function (enter) {
          enter.append('p').text(function (d) {
            return d.text;
          })
        },
        function (update) {
          update.style('font-size', '20px')
        },
        function (exit) {
          exit.remove();
        }
      ));

  });
  // enter
  // exit
  // datum，将指定数据赋值给selection，即为选择的元素添加__data__属性并赋值，使用方式与data一样；datum可以传常量和函数，不同于data，它返回的是某个数据。通俗来讲就是修改绑定的data。
  let btn3 = d3.select('body').append('button').text('datum').on('click', function () {
    div.selectAll('p')
      .datum(function (d) {
        return {
          id: d.id,
          text: d.text + ' updated by datum'
        }
      })
      .text(function (d) {
        return d.text;
      })
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