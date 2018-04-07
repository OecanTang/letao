/**
 * Created by Anthoney on 2018/4/7.
 */

$(function () {
  //柱状图
  //初始化echarts实例
  var echarts_1 = echarts.init(document.querySelector(".echarts_1"));
  var option1 = {
    title: {
      text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
      data: ['人数']
    },
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1000, 1500, 1800, 1200, 1000, 500]
    }]
  };
  echarts_1.setOption(option1);


//饼状图
  var echarts_2 = echarts.init(document.querySelector(".echarts_2"));
  var option2 = {
    title: {
      text: '热门品牌销售',
      subtext: '2017年6月',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克', '阿迪', '新百伦', '李宁', '阿迪王']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          {value: 1000, name: '耐克'},
          {value: 1500, name: '阿迪'},
          {value: 1800, name: '新百伦'},
          {value: 1200, name: '李宁'},
          {value: 1000, name: '阿迪王'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  echarts_2.setOption(option2);


})
