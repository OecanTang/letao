/**
 * Created by Anthoney on 2018/4/6.
 */


//防止全局变量污染，等待dom渲染再执行
$(function() {

  //  1.进行表单校验
  //校验要求: (1)用户名不能为空
  //         (2)密码不能为空，且必须是6-12位
  $("#form").bootstrapValidator({
    //配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

  //  对字段进行校验
    fields: {
      username: {
        //校验的规则
        validators: {
        //  非空校验
          notEmpty: {
          //  为空时的提示信息
            message: "用户名不能为空"
          },
          callback: {
            message: "用户名不存在",
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空",
          },
        //  长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是6-12位",
          },
          callback: {
            message: "密码错误",
          }
        }
      }
    }
  });



//  2.进行登录请求
//  通过ajax进行登录请求

//  特点:如果校验成功，继续提交需要阻止这次默认的提交，通过ajax请求进行提交
//  如果校验失败，阻止默认的提价
  $("#form").on("success.form.bv",function(e) {
    //阻止默认的表单提交
    e.preventDefault();

  //  通过ajax进行登录请求
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      dataType: "json",
      data: $("#form").serialize(),
      success: function(info) {
        console.log(info);
        if (info.success) {
          //alert("登录成功");
          location.href= "index.html";
        }
        if (info.error== 1000) {
          //alert("用户名不存在");
          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }
        if (info.error== 1001) {
          //alert("密码错误");
          $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
      }
    })

  })


//3.实现重置功能
  $('[type="reset"]').on("click",function() {
    console.log("111");
  //  除了重置文本，还需要重置校验状态
    $("#form").data("bootstrapValidator").resetForm();

  })


})