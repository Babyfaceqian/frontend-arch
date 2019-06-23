! function () {
  /**
   * d3.timeDay -> interval
   */

  var start = new Date(2015, 2, 1), // new Date(year, month(第几个), day(第几天))
    end = new Date(2015, 3, 1);
  let dayInterval = d3.timeDay.count(start, end); // 间隔天数
  console.log('dayInterval:', dayInterval);
  let weekInterval = d3.timeWeek.count(start, end); // 间隔周数
  console.log('weekInterval:', weekInterval);

  var now = new Date();
  var weekRange = d3.timeWeek.range(d3.timeMonth.floor(now), d3.timeMonth.ceil(now)); // 返回每周第一天所组成的数组
  console.log('weekRange:', weekRange);

  /**
   *  interval.floor(date)
   */

  /**
   * interval.round(date)
   */

  /**
   * interval.ceil(date)
   */

  /**
   * interval.offset(date[, step])
   */

  /**
   * interval.range(start, stop[, step])
   */

  /**
   * interval.filter(test)
   */

  /**
   * interval.every(step)
   */

  /**
   * interval.count(start, end)
   */

  /**
   * d3.timeInterval(floor, offset[, count[, field]])
   */
}()