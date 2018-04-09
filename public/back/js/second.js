/**
 * Created by Anthoney on 2018/4/7.
 */
$(function() {
  var currentPage = 1;
  var pageSize = 5;

//  1-封装render方法，渲染第一页
  render();
  function render() {
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      type: "GET",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(info) {
        console.log(info);
        var htmlStr = template("secondTmp", info);
        $("#user_table tbody").html(htmlStr);

        //配置分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          //当前页
          currentPage: info.page,
          //总页数
          totalPages: Math.ceil( info.total/info.size ),
          //  当页面被点击时触发
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
    //console.log("haha");
    $("#addmodal").modal("show");

  //  请求一级分类名称API，渲染下拉菜单
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      type: "GET",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function(info) {
        console.log(info);
        var htmlStr = template("dropdownTmp", info);
        $(".dropdown-menu").html(htmlStr);
      }
    })
  })

//  3-通过注册委托事件，给a添加点击事件
  $(".dropdown-menu").on("click","a", function() {
    console.log("haha");
    //获取被点击的a中的内容
    var txt = $(this).text();
    var id = $(this).data("id");
    //修改文本内容
    $("#dropdownText").text(txt);
    //将选中的id设置到input表单元素中
    $('[name="categoryId"]').val(id);
  //  将校验状态置成 VALID
  //  $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })

//4-配置图片上传
  $("#fileupload").fileupload({
    dataType: "json",
    //done  当图片上传完成，响应回来时调用
    done: function(e, data) {
      console.log(data);
      //获取上传成功的图片地址
      var picAddr = data.result.picAddr;
    //  设置图片地址
      $("#imgBox img").attr("src", picAddr);
    //  将图片地址存在隐藏域中
      $('[name="brandLogo"]').val(picAddr);
      $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
    }
  })

//5-配置表单验证
  $("#form").bootstrapValidator({
  //  将默认项排除
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //校验规则
    fields: {
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      //  一级分类的id
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      //  图片的地址
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    },

  });

//6-注册校验成功事件，通过 ajax 进行添加
  $("#form").on("success.form.bv",function(e) {
    e.preventDefault();

    $.ajax({
      url: "/category/addSecondCategory",
      type: "post",
      data: $("#form").serialize(),
      success: function(info) {
        //console.log(info);
        if (info.success) {
          //关闭模态框
          $("#addmodal").modal("hide");
        //重置表单里面的内容和校验状态
          $("#form").data("bootstrapValidator").resetForm( true );

          currentPage = 1;
          render();

        //  重置下拉菜单
          $("#dropdownText").text("请选择1级分类")
        //  重置图片
          $("#imgBox img").attr("src", "images/none.png");
        }
      }
    })
  })



})