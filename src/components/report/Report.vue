<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 2. 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="zhexian" style="width:450px;height:300px;"></div>
    </el-card>
    <el-card>
      <div id="shan" style="width:450px;height:300px;"></div>
    </el-card>
  </div>
</template>

<script>
// 1. 导入 echarts
import echarts from 'echarts'
import _ from 'lodash'

export default {
  data () {
    return {
      // 服务器返回的数据不能直接让图标处理，要先合并在options里
      // 需要合并的数据
      options1: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      },
      options2: {
        title: {
          text: '用户来源统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20
        },
        series: [
          {
            name: '姓名',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  created () {},
  // 此时，页面上的元素，已经被渲染完毕了！echarts要放在这里
  async mounted () {
    // 3. 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('zhexian'))
    var myChart2 = echarts.init(document.getElementById('shan'))

    const { data: res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) {
      return this.$message.error('获取折线图数据失败！')
    }

    // 4. 准备数据和配置项
    // 将数据返回的data和options进行合并
    const result1 = _.merge(res.data, this.options1)
    const result2 = _.merge(res.data, this.options2)

    // 5. 展示数据
    myChart1.setOption(result1)
    myChart2.setOption(result2)
  },
  methods: {}
}
</script>

<style lang="less" scoped>
#zhexian,
#shan {
  // background-color: pink;
  margin-bottom: 20px;
}
</style>
