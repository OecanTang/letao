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
