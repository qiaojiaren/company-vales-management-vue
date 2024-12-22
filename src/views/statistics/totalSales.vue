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
      <el-button type="primary" @click="getSalesData">查询</el-button>
    </div>
    
    <!-- 显示销售总额 -->
    <div v-if="totalAmount" class="total-amount">
      <h2>总销售额: ¥{{ totalAmount }}</h2>
    </div>

    <div ref="chart" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import { getTotalSales } from '@/api/statistics';

const dateRange = ref([new Date('2024-11-11'), new Date('2024-12-22')]);
const salesData = ref([]);
const totalAmount = ref(0); 

// 初始化图表
const chart = ref(null);
let myChart = null;

onMounted(() => {
  myChart = echarts.init(chart.value);
});

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
const getSalesData = async () => {
  const beginDate = formatDate(dateRange.value[0]);
  const endDate = formatDate(dateRange.value[1]);

  const response = await getTotalSales(beginDate, endDate);
  salesData.value = response.productSales;
  totalAmount.value = response.amount; // 设置总销售额

  updateChart();
};
getSalesData();
// 更新图表的方法
const updateChart = () => {
  if (salesData.value.length === 0) return; // 如果没有数据，不更新图表

  const categories = salesData.value.map(item => item.productName);
  const salesValues = salesData.value.map(item => item.sales);
  const quantityValues = salesData.value.map(item => item.quantity);

  const option = {
    title: {
      text: '产品销售情况'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['销售额', '销售数量']
    },
    xAxis: {
      type: 'category',
      data: categories
    },
    yAxis: [
      {
        type: 'value',
        name: '销售额',
        position: 'left',
      },
      {
        type: 'value',
        name: '销售数量',
        position: 'right',
      }
    ],
    series: [
      {
        name: '销售额',
        type: 'bar',
        data: salesValues,
        itemStyle: {
          color: '#73c0de'
        }
      },
      {
        name: '销售数量',
        type: 'line',
        yAxisIndex: 1,
        data: quantityValues,
        itemStyle: {
          color: '#ff7f50'
        }
      }
    ]
  };

  myChart.setOption(option);
};
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

.el-date-picker {
  margin-right: 10px;
}

.el-button {
  background-color: #409EFF;
  color: white;
  border: none;
  transition: background-color 0.3s;
}

.el-button:hover {
  background-color: #66b1ff;
}

.chart-container {
  margin: 20px auto;
  max-width: 100%;
  height: 600px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

/* 新增样式 */
.total-amount {
  text-align: center;
  margin: 20px 0;
  font-size: 24px;
  color: #333;
}
</style>
