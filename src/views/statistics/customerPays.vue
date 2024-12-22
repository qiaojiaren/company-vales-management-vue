<template>
  <div>
    <div class="demo-range">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="width: 400px;"
      />
      <el-button type="primary" @click="getCustomerPaysData">查询</el-button>
    </div>
    <div ref="pieChart" class="chart" style="width: 600px; height: 400px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { getCustomerPays } from '@/api/statistics';

const dateRange = ref([new Date('2024-11-11'), new Date('2024-12-22')]);
const pieChart = ref(null);  // 用于存储图表的引用

// 日期格式化函数
const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 获取销售数据并更新图表
const getCustomerPaysData = async () => {
  const beginDate = formatDate(dateRange.value[0]);
  const endDate = formatDate(dateRange.value[1]);

  const response = await getCustomerPays(beginDate, endDate);
  updatePieChart(response);  // 更新饼状图
}
getCustomerPaysData();

// 更新饼状图的函数
const updatePieChart = (data) => {
  if (!data || data.length === 0) return;

  const seriesData = data.map(item => ({
    name: item.customerName,
    value: item.pays
  }));

  const option = {
    title: {
      text: '客户付款数据',
      subtext: '数据来自接口',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '付款金额',
        type: 'pie',
        radius: '70%',
        data: seriesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const chartInstance = echarts.init(pieChart.value);  // 初始化图表
  chartInstance.setOption(option);  // 设置图表的数据和配置
}

onMounted(() => {
  nextTick(() => {
    if (pieChart.value) {
      const chartInstance = echarts.init(pieChart.value);

      chartInstance.setOption({}); 
    }
  });
});
</script>


<style scoped>
.demo-range {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.chart {
  margin: 20px auto;
}
</style>
