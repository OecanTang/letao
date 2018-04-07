/**
 * Created by Anthoney on 2018/4/7.
 */
$(function() {
  var currentPage = 1;
  var pageSize = 5;

  render();
  // 1-封装一个render方法,通过ajax方法渲染页面
  function render() {
    //请求用户数据，并渲染
    $.ajax({
      url: "/user/queryUser",
      type: "GET",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(info) {
        //console.log(info);
        var htmlStr = template("tmp", info);
        $("#user_table tbody").html(htmlStr);


      //  分页配置
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          //当前页
          currentPage: info.page,
          //总页数
          totalPages: Math.ceil( info.total/info.size ),
        //  但页面被点击时触发
          onPageClicked: function(a, b, c, page) {
            currentPage = page;
            render();
          }
        });
      }
    })
  }

  // 2-通过事件委托，给按钮注册点击事件
  $("#user_table tbody").on("click",".btn",function() {
    //console.log("haha");
  //  弹出模态框
    $("#lououtModal").modal("show");

  //  更新状态和操作
    var id = $(this).parent().data("id");
    //console.log(id);
    var isDelete = $(this).hasClass("btn-success")? "1" : "0";

    //给submitBtn注册点击事件
    $("#submitBtn").off("click").on("click",function() {
      $.ajax({
        url: "/user/updateUser",
        type: "POST",
        data: {
          id: id,
          isDelete: isDelete,
        },
        dataType: "json",
        success: function(info) {
          //console.log(info);
          if (info.success) {
            $("#lououtModal").modal("hide");
            render();
          }
        }
      })
    })

  })


})