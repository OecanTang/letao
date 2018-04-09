/**
 * Created by Anthoney on 2018/4/9.
 */
$(function() {
  var currentPage = 1;
  var pageSize = 2;
  var picArr = [];

  render();
  //1-封装一个render方法，渲染商品页
  function render() {
    $.ajax({
      type: "GET",
      url: "/product/queryProductDetailList",
      dataType: "json",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function(info) {
        //console.log(info);
        var htmlStr = template("productTmp", info);
        $("#user_table tbody").html(htmlStr);

      //  配置分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil( info.total/info.size),
          onPageClicked: function(a, b, c, page) {
            currentPage = page;
            render();
          },
        //  按钮大小
          size: "normal",
          //配置按键文字
          itemTexts: function(type, page, current) {
            switch (type) {
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "page":
                return page;
            }
          },
        //  配置提示框
          tooltipTitles: function(type, page, current) {
            switch (type) {
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "page":
                return "前往第" + page + "页";
            }
          },
        //  使用bootstrap 提示框的默认样式
          useBootstrapTooltip: true,
        })
      }
    })
  };

//  2-给添加商品按钮(addProduct)注册点击事件
  $("#addProduct").on("click",function() {
    //console.log("haha");
  //  让模态框显示
    $("#addmodal").modal("show");
    
  //  发送ajax请求,请求二级分类数据列表,渲染下拉菜单
    $.ajax({
      type: "GET",
      url: "/category/querySecondCategoryPaging",
      dataType: "json",     
      data: {
        page: 1,
        pageSize: 100
      },   
      success: function(info) {
        //console.log(info);
        var htmlStr = template("dropdownTmp", info);
        $(".dropdown-menu").html(htmlStr);
      }
    })
  });

//  3-用事件委托，给下拉菜单里面的每个a注册点击事件
  $(".dropdown-menu").on("click", "a", function() {
    //console.log("haha");
    var txt = $(this).text();
    var id = $(this).data("id");
    $("#dropdownText").text(txt);
  //  设置隐藏域id
    $('[name="brandId"]').val(id);
  });

//  4-配置上传图片回调函数
  $("#fileupload").fileupload({
    dataType: "json",
    //上传完图片，响应的回调函数配置
    //每上传一张，都会响应一次
    done: function(e, data) {
      //console.log(data);
      //1.获取图片地址对象
      var picObj = data.result;
      var picAddr = picObj.picAddr;
      //2.让图片渲染到页面中
      picArr.unshift(picObj);
      $("#imgBox").prepend('<img src="'+ picAddr +'" width="100">');
    //  判断图片张数
      if (picArr.length > 3) {
        picArr.pop();
        $("#imgBox img:last-of-type").remove();
      }
    //  表单校验
      if (picArr.length == 3) {
        $("#form").data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }
    }
  });

//  5-配置表单校验
  $("#form").bootstrapValidator({
    excluded: [],
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      //  1.brandId
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类",
          }
        }
      },
      //  2.proName
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称",
          }
        }
      },
      //  3.proName
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述",
          }
        }
      },
      //  4.num
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存",
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "商品库存数据，必须是非零开头的数字",
          }
        }
      },
      //  5.size
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码",
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "商品尺码数据为30-49的格式",
          }
        }
      },
      //  6.oldPrice
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价",
          }
        }
      },
      //  7.price
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价",
          }
        }
      },
      //  8.picStatus
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片",
          }
        }
      },
    }
  })

//  6-注册表单校验成功事件
  $("#form").on("success.form.bv", function(e) {
    e.preventDefault();

    var dataStr = $("#form").serialize();
    //console.log(dataStr);

  //  拼接picName和picAddr
    dataStr += "&picName1="+ picArr[0].picName +"&picAddr1="+ picArr[0].picAdde;
    dataStr += "&picName2="+ picArr[1].picName +"&picAddr2="+ picArr[1].picAdde;
    dataStr += "&picName3="+ picArr[2].picName +"&picAddr3="+ picArr[2].picAdde;
  
    //console.log(dataStr);
    $.ajax({
      type: "post",
      url: "/product/addProduct",
      dataType: "json",     
      data: dataStr,
      success: function(info) {
        //console.log(info);
      //  1.关闭模态框
        $("#addmodal").modal("hide");
      //  2.重新渲染产品页
        currentPage = 1;
        render();
      //  3.重置校验状态和文本内容
        $("#form").data("bootstrapValidator").resetForm(true);
      //  4.重置下拉菜单文本内容
        $("#dropdownText").text("请选择二级分类名称");
      //  5.删除图片
        $("#imgBox img").remove();
      //  重置数组
        picArr = [];
      }
    })
  })





})
