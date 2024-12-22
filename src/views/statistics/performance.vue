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
      <h2>销售人员id: {{ salesPersonId }}</h2>
      <h2>销售人员姓名: {{ salespersonName }}</h2>
      <h2>销售人员业绩: ¥{{ totalAmount }}</h2>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getPerformance } from '@/api/statistics';
import store from '@/store'


const dateRange = ref([new Date('2024-11-11'), new Date('2024-12-22')]);
const salesPersonId = ref(store.getters.user.salespersonId);
const salespersonName = ref(store.getters.user.salespersonName);
const totalAmount = ref(0); 


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
const getPerformanceData = async () => {
  const beginDate = formatDate(dateRange.value[0]);
  const endDate = formatDate(dateRange.value[1]);
  const id = store.getters.user.salespersonId
  console.log(id)
  const response = await getPerformance(beginDate, endDate,id);
  totalAmount.value=response.performance
};
getPerformanceData();

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

/* 新增样式 */
.total-amount {
  text-align: center;
  margin: 20px 0;
  font-size: 24px;
  color: #333;
}
</style>
