$(function () {
  // ajax 预过滤器
  // 功能一：拼接重复的 url
  $.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
  });
});
