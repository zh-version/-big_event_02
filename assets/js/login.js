$(function () {
  var form = layui.form;
  var layer = layui.layer;

  // 1. 功能一：点击链接跳转
  $('.goReg').on('click', function () {
    $('.Reg_form').show();
    $('.login_form').hide();
  });
  $('.goLogin').on('click', function () {
    $('.login_form').show();
    $('.Reg_form').hide();
  });

  // 2. 自定义校验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value, item) {
      // value：表单的值、item：表单的DOM对象
      if (value !== $('[name = password]').val()) {
        return '两次输入的密码不一致';
      }
    }
  });

  // 3. 注册功能实现
  // 注册账号：zh10086
  // 注册密码：zh10086
  $('.Reg_form').on('submit', function (e) {
    // 3.1 阻止表单默认提交行为
    e.preventDefault();
    // 3.2 发送 ajax 请求
    // 获取提交参数
    var data = {
      username: $('[name="username"]').val(),
      password: $('[ name="password"]').val()
    };
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data: data,
      success: function (res) {
        // 无论成功失败都需要提示
        layer.msg(res.message);
        if (res.status === 0) {
          $('.goLogin').trigger('click');
        }
      }
    });
  });

  // 4. 登录功能实现
  $('.login_form').on('submit', function (e) {
    // 阻止表单默认提交行为
    e.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        layer.msg(res.message);

        if (res.status === 0) {
          // 保存 token 到本地存储
          localStorage.setItem('token', res.token);

          // 跳转到主页面
          location.href = '/index.html';
        }
      }
    });
  });
});
