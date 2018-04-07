/**
 * Created by Anthoney on 2018/4/6.
 */

//配置禁用小圆环
NProgress.configure({ showSpinner: false});

////开启进度条
//NProgress.start();
//setInterval(function() {
////  关闭进度条
//  NProgress.done();
//},500);

//ajaxStart 所有的ajax开始时调用
$(document).ajaxStart(function() {
  NProgress.start();
})

////ajaxStop 所有的ajax结束时调用
$(document).ajaxStop(function() {
  setInterval(function() {
    NProgress.done();
  }, 500);
})

//进行登录拦截
if (location.href.indexOf("login.html") === -1 ) {
  $.ajax({
    type: "GET",
    url: "/employee/checkRootLogin",
    success: function(info) {
      if ( info.success === 400 ) {
        location.href = "login.html";
      }
    }
  })
}

$(function() {
//  1-二级分类切换功能
  $(".category").on("click",function() {
    $(this).next().stop().slideToggle();
  })

//  2-顶部菜单栏切换显示功能
  $(".icon_menu").on("click",function() {
    //console.log("haha");
    $(".lt_aside").toggleClass("hidemenu");
    $(".lt_main").toggleClass("hidemenu");
    $(".lt_topbar").toggleClass("hidemenu");
  })

//  3-点击退出图标，显示模态框
  $(".icon_logout").on("click",function() {
    //console.log("haha");
    $("#lououtModal").modal("show");
  })

//  4-在外面给logoutBtn注册点击事件
  $("#logoutBtn").on("click",function() {
    //console.log("haha");

  //  访问退出借口，进行退出
    $.ajax({
      url: "/employee/employeeLogout",
      type: "GET",
      dataType: "json",
      success: function(info) {

        if (info.success) {
          location.href= "index.html";
        }
      }
    })
  })

// 5-登录拦截功能









})









