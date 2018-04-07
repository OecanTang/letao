/**
 * Created by Anthoney on 2018/4/7.
 */
$(function() {
  var currentPage = 1;
  var pageSize = 5;

  //1-渲染页面
  render();
  function render() {
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      type: "GET",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(info) {
        console.log(info);
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

//  2-给addcategory注册点击事件
  $("#addcategory").on("click",function() {
    console.log("haha");
  //  模态框显示
    $("#addModal").modal("show");
  //
  })

//  3-表单校验功能
  $("#form").bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

  //  校验的字段
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "请输入一级分类名称",
          }
        }
      }
    }
  })

//4-注册表单校验成功事件
  $("#form").on("success.form.bv", function(e) {
    //console.log("hehe");
    e.preventDefault();
    $.ajax({
      url: "/category/addTopCategory",
      type: "POST",
      data: $("#form").serialize(),
      dataType: "json",
      success: function(info) {
        console.log(info);
        if (info.success) {
        //  关闭模态框
          $("#addModal").modal("hide");
          currentPage= 1;
          render();
          //重置表单校验状态和表格内容
          $("#form").data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })



})

