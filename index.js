! function () {
  /**
   * timeFormat([format])
   * 返回一个函数，将时间转换为字符串格式
   */
  var formatTime = d3.timeFormat("%B %d, %Y");
  var formatString = formatTime(new Date);
  console.log('timeFormat:', formatString); // "June 30, 2015"

  var parseTime = d3.timeParse("%B %d, %Y");
  console.log('parseTime:', parseTime(formatString)); // Tue Jun 30 2015 00:00:00 GMT-0700 (PDT)
}()