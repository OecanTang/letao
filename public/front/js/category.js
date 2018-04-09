/**
 * Created by Anthoney on 2018/4/9.
 */


//1-发送ajax请求，渲染一级分类列表
$(function() {
  $.ajax({
    type: "GET",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function(info) {
      //console.log(info);
      $(".tmpBox").html(template("tmp", info));

    //  默认渲染二级分类第一页
      render(info.rows[0].id);
    }
  })
})

//3-通过事件委托，给一级分类里面的a注册点击事件，拿到一级分类id
$(".tmpBox").on("click", "a", function() {
  //console.log("haah");
  var id = $(this).data("id");
  //console.log(id);
  $(this).addClass("current").parent().siblings().find("a").removeClass("current");

  render(id);
})

//2-封装一个render方法，根据一级分类id，渲染第二页
function render( id ) {
  $.ajax({
    type: "GET",
    url: "/category/querySecondCategory",
    dataType: "json",
    data: {id: id},
    success: function(info) {
      //console.log(info);
      $(".right_tmpBox").html(template("rightTmp", info));
    }
  })
}
