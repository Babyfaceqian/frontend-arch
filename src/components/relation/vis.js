function Vis(opts, options) {
  let self = this;
  self.defaultOptions = {
    minFontSize: 12,
    maxFontSize: 18,
    itemColor: '#666',
    lineColor: '#999',
    itemHoverColor: '#579FF0',
    linkColor: 'black',
    linkOpacity: 0.1,
    titleBorderColor: '#CCC',
    titleTextColor: '#333',
    titleBgColor: '#FFF',
    ...options
  }
  self.container = d3.select(opts.container);
  self.clientWidth = opts.container.clientWidth;
  self.clientHeight = opts.container.clientHeight;
  self.svg = self.container.append('svg').attr('width', self.clientWidth).attr('height', self.clientHeight);
  self.wrapper = self.svg.append('g').attr('class', 'wrapper');
  self.svg.on('click', function () {
    if (self.selectHighlight.length > 0) {
      self.selectHighlight.forEach(function (key) {
        self.cancelHighlight(key);
      })
    }
  }).on('wheel', function () {
    d3.selectAll('.list').attr('transform', function () {
      let list = d3.select(this);
      let deltaY = d3.event.deltaY;
      let translate = parseTransform(list.attr('transform'));
      let newTranslate = [translate[0], translate[1] + deltaY];
      if (newTranslate[1] > 50) {
        return list.attr('transform');
      }
      return 'translate(' + newTranslate[0] + ',' + newTranslate[1] + ')';
    });
    self.updateLinks();
  })
  self.selectHighlight = [];

}
Vis.prototype = {
  setData: function (data) {
    let self = this;
    self.data = data;
    // 权重
    let weightArray = new Set();
    self.data.forEach(function (d) {
      d.list.forEach(function (l) {
        weightArray.add(l.weight);
      });
    });
    weightArray = Array.from(weightArray);
    let maxWeight = Math.max(...weightArray);
    let minWeight = Math.min(...weightArray);
    this.getFontSizeByWeight = interpolate(minWeight, maxWeight, self.defaultOptions.minFontSize, self.defaultOptions.maxFontSize);
    // 取消所有锁定高亮
    if (self.selectHighlight.length > 0) {
      self.cancelHighlight(self.selectHighlight[0]);
    }
    this.updateGroup();
    this.updateLinks();
    this.wrapper.selectAll('.link').lower();
  },
  updateGroup: function () {
    let self = this;
    // 创建组
    let groups = this.wrapper.selectAll('.group').data(self.data);
    groups.enter().append('g').attr('class', 'group').attr('transform', function (d, i) {
      let x = i * 120 + 40;
      let y = 0;
      return 'translate(' + x + ',' + y + ')';
    });
    groups.exit().remove();
    this.wrapper.selectAll('.group').each(function (d) {
      self.updateList(d3.select(this), d);
    })

  },
  updateList: function (group, d) {
    let self = this;

    // 创建列表容器
    let list = group.selectAll('.list').data([d]);
    let newList = list.enter().append('g').attr('class', 'list').attr('transform', 'translate(0,50)');
    group.append('line')
      .style('stroke', self.defaultOptions.lineColor)
      .style('stroke-dasharray', 4)
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', 200)
      .attr('transform', 'translate(0,50)')
    list.exit().remove();
    // 创建列表内容
    let items = group.selectAll('.list').selectAll('.item').data(d.list);

    let newItems = items.enter().append('g').attr('class', 'item').attr('transform', function (d, i) {
        let x = 0;
        let y = 30 * i;
        return 'translate(' + x + ',' + y + ')';
      })
      .style('cursor', 'pointer')
      .on('mouseover', function (d) {
        self.setHighlight(d.key);
        self.updateTooltip([d3.event.offsetX, d3.event.offsetY], [d]);
      }).on('mouseleave', function (d) {
        if (!self.selectHighlight.includes(d.key)) {
          self.cancelHighlight(d.key);
        }
        self.updateTooltip([d3.event.offsetX, d3.event.offsetY], []);
      }).on('click', function (d) {
        d3.event.stopPropagation();
        self.setHighlight(d.key);
        if (self.selectHighlight.length > 0 && self.selectHighlight[0] !== d.key) {
          self.cancelHighlight(self.selectHighlight[0]);
        }
        self.selectHighlight[0] = d.key;
      });
    items.select('.itemText').text(function (d, i) {
      return d.value;
    }).style('font-size', function (d) {
      return self.getFontSizeByWeight(d.weight);
    }) // 更新
    newItems.append('text').attr('class', 'itemText').text(function (d) {
        return self.defaultOptions.renderItem ? self.defaultOptions.renderItem(d) : d.value;
      }).attr('fill', self.defaultOptions.itemColor).style('text-anchor', 'middle')
      .style('font-size', function (d) {
        return self.getFontSizeByWeight(d.weight);
      }); // 添加
    items.exit().remove();
    // 创建名称
    let title = group.selectAll('.title').data([d]);
    let newTitle = title.enter().append('g').attr('class', 'title').attr('transform', 'translate(0,20)');
    newTitle.append('rect').attr('class', 'titleBg')
      .style('stroke', self.defaultOptions.titleBorderColor)
      .attr('width', '74px')
      .attr('height', '20px')
      .style('fill', self.defaultOptions.titleBgColor)
      .attr('x', -38)
      .attr('y', -16)
      .attr('rx', 2)
      .attr('ry', 2)
    newTitle.append('text').text(function (d) {
      return d.name;
    }).attr('fill', self.defaultOptions.titleTextColor).style('text-anchor', 'middle');
    let dotData = new Array(6);
    let dots = newTitle.selectAll('.dot').data(dotData);
    dots.enter().append('rect').attr('width', 3).attr('height', 3).attr('rx', 2).attr('ry', 2).attr('x', function (d, i) {
      return i % 2 == 0 ? -34 : -30;
    }).attr('y', function (d, i) {
      return parseInt(i / 2) * 5 - 12;
    }).style('fill', self.defaultOptions.titleBorderColor)
    title.exit().remove();
  },
  updateLinks: function () {
    let self = this;
    let links = [];
    let size = self.wrapper.selectAll('.group').size();
    for (let i = 0; i < size - 1; i++) {
      let _group = self.wrapper.selectAll('.group').filter(function (d, index) {
        return index == i;
      });
      let _nextGroup = self.wrapper.selectAll('.group').filter(function (d, index) {
        return index == i + 1;
      });
      _group.select('.list').selectAll('.item').each(function (d, i) {
        let _this = this;
        _nextGroup.select('.list').selectAll('.item').each(function (dd, ii) {
          let _this2 = this;
          let obj = {};
          if (dd.key == d.key) {
            obj.x1 = parseTransform(d3.select(_this).attr('transform'))[0] + parseTransform(_group.attr('transform'))[0] + parseTransform(_group.select('.list').attr('transform'))[0];
            obj.y1 = parseTransform(d3.select(_this).attr('transform'))[1] + parseTransform(_group.attr('transform'))[1] + parseTransform(_group.select('.list').attr('transform'))[1];
            obj.x2 = parseTransform(d3.select(_this2).attr('transform'))[0] + parseTransform(_nextGroup.attr('transform'))[0] + parseTransform(_nextGroup.select('.list').attr('transform'))[0];
            obj.y2 = parseTransform(d3.select(_this2).attr('transform'))[1] + parseTransform(_nextGroup.attr('transform'))[1] + parseTransform(_nextGroup.select('.list').attr('transform'))[1];
            obj.key = dd.key;
            obj.weight1 = d.weight;
            obj.weight2 = dd.weight;
            links.push(obj);
          }
        });
      });
    }
    console.log('links', links);
    links = links.map(function (l) {
      let obj = {};
      obj.key = l.key;
      let extend1 = extendPointByWeight({
        x: l.x1,
        y: l.y1
      }, self.getFontSizeByWeight(l.weight1) - self.defaultOptions.minFontSize + 1);
      let extend2 = extendPointByWeight({
        x: l.x2,
        y: l.y2
      }, self.getFontSizeByWeight(l.weight2) - self.defaultOptions.minFontSize + 1);
      let points = [...extend1, ...extend2];
      obj.points = formatPoints(points);
      return obj;
    });
    let linkData = this.wrapper.selectAll('.link').data(links).attr('points', function (d) {
      let points = '';
      d.points.forEach(function (p) {
        points += `${p.x},${p.y} `;
      });
      return points;
    });
    linkData.enter().append('polygon').attr('class', 'link').attr('points', function (d) {
        let points = '';
        d.points.forEach(function (p) {
          points += `${p.x},${p.y} `;
        });
        return points;
      }).style('fill', self.defaultOptions.linkColor)
      .style('opacity', self.defaultOptions.linkOpacity);
  },
  setHighlight: function (key) {
    let self = this;
    // 高亮item
    d3.selectAll('.item').filter(function (dd) {
      return dd.key == key;
    }).select('text').style('fill', self.defaultOptions.itemHoverColor);
    // 高亮link
    d3.selectAll('.link').filter(function (l) {
      return l.key == key;
    }).style('fill', self.defaultOptions.itemHoverColor);
  },
  cancelHighlight: function (key) {
    let self = this;
    // 取消高亮item
    d3.selectAll('.item').filter(function (dd) {
      return dd.key == key;
    }).select('text').style('fill', self.defaultOptions.itemColor);
    // 取消高亮link
    d3.selectAll('.link').filter(function (l) {
      return l.key == key;
    }).style('fill', self.defaultOptions.linkColor);
  },
  updateTooltip: function (position, data) {
    let self = this;
    let tooltipData = self.container.selectAll('.tooltip').data(data);
    let tooltip = tooltipData.enter().append('div').attr('class', 'tooltip')
      .style('position', 'fixed')
      .style('top', position[1] - 55)
      .style('left', position[0] - 25)
      .style('background', 'rgba(0,0,0,0.75)')
      .style('color', '#FFF')
      .style('border-radius', '2px')
      .style('box-shadow', '0 2px 8px 0')
      .style('padding', '4px 6px')
      .style('font-size', '12px')
      .style('text-align', 'center');
    if (self.defaultOptions.renderTooltip) {
      tooltip.html(function (d) {
        return self.defaultOptions.renderTooltip(d);
      })
    } else {
      tooltip.append('p').text(function (d) {
        return d.value;
      });
    }
    tooltipData.exit().remove();
  }
}

function interpolate(minWeight, maxWeight, minFontSize, maxFontSize) {
  let diff = maxWeight - minWeight;
  return function (weight) {
    if (diff == 0) return minFontSize;
    return (((weight - minWeight) / diff) * (maxFontSize - minFontSize) + minFontSize).toFixed(0);
  }
}

function parseTransform(str) {
  if (!str) return [0, 0];
  let reg = str.match(/translate\((.*?)\)/);
  return reg && reg[1].split(',').map(function (d) {
    return parseInt(d);
  }); // [20,20]
}

function extendPointByWeight(point, weight) {
  let p1 = {
    x: point.x,
    y: point.y - weight * 2 - 6
  };
  let p2 = {
    x: point.x,
    y: point.y + weight * 2 - 4
  };
  return [p1, p2];
}

function formatPoints(points) {
  let newPoints = [];
  if (points.length == 4) {
    newPoints[0] = points[0];
    newPoints[1] = points[1];
    newPoints[2] = points[3];
    newPoints[3] = points[2];
  } else if (points.length == 6) {
    newPoints[0] = points[0];
    newPoints[1] = points[1];
    newPoints[2] = points[3];
    newPoints[3] = points[5];
    newPoints[4] = points[4];
    newPoints[5] = points[2];
  }

  return newPoints;
}
export default Vis;