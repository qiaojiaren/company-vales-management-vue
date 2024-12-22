<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-switch
        v-model="value"
        size="small"
        active-text="查询所有发货单"
        inactive-text="查询未发货发货单"
      />
      <el-col :span="7">
        <el-input
          placeholder="请输入合同id"
          clearable
          v-model="queryForm.query"
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="handleSearch"
        >搜索</el-button
      >
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :width="item.width"
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in optionsDelivery"
        :key="index"
      >
        <template #default="{ row }" v-if="item.prop === 'action'">
          <el-button
            type="primary"
            size="small"
            :icon="Edit"
            @click="handleDialogValue(row)"
          ></el-button>
          <el-button
            v-if="row.deliveryStatus === '未发货'"
            type="success"
            size="small"
            :icon="Check"
            @click="handleComplete(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="queryForm.pagenum"
      :page-sizes="[1, 2, 5, 10, 15]"
      :page-size="queryForm.pagesize"
      layout="total,sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <Dialog
    v-model="dialogVisible"
    :dialogTitle="dialogTitle"
    :dialog-table-value="dialogTableValue"
  ></Dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { Edit, Check, Search } from "@element-plus/icons-vue";
import { getDelivery, getNotDeliver, deliver } from "@/api/delivery";
import { optionsDelivery } from "./options";
import { ElMessage, ElMessageBox } from "element-plus";
import Dialog from "./components/dialogDelivery.vue";

const queryForm = ref({
  query: "",
  pagenum: 1,
  pagesize: 5,
});

const total = ref(0);

const tableData = ref([]);

const dialogVisible = ref(false);
const dialogTitle = ref("");
const dialogTableValue = ref({});

const value = ref(true)

// 表格数据
const initGetDelivery = async () => {
  const res = await getDelivery(queryForm.value);
  total.value = res.total;
  tableData.value = res.rows;
};
initGetDelivery();

const initGetNotDeliver = async () => {
  const res = await getNotDeliver(queryForm.value);
  total.value = res.total;
  tableData.value = res.rows;
}
// 监听 value 的变化
watch(value, (newValue) => {
  if (!newValue) {
    // 如果开关关闭，则调用 initGetNotDeliver
    initGetNotDeliver();
  } else {
    // 如果开关开启，则调用 initGetDelivery
    initGetDelivery();
  }
});

const handleSearch = () => {
  if (value.value) {
    // 如果开关开启，则调用 initGetDelivery
    initGetDelivery();
  } else {
    // 如果开关关闭，则调用 initGetNotDeliver
    initGetNotDeliver();
  }
};

// 分页
const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1;
  queryForm.value.pagesize = pageSize;
  initGetDelivery();
};
const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum;
  initGetDelivery();
};

const handleDialogValue = (row) => {
  dialogVisible.value = true;
  dialogTitle.value = "修改进货单信息";
  dialogTableValue.value = JSON.parse(JSON.stringify(row));
};

const handleComplete = async (row) => {
  const data = {
      deliveryOrderId: row.deliveryOrderId,
      contractId: row.contractId,
      productId: row.productId,
      productInfo: row.productInfo,
      logisticsInfo: row.logisticsInfo,
      deliveryStatus: row.deliveryStatus,
      comment: row.comment
  }
  try {
    await deliver(data);
    // 如果成功，发送成功消息
    ElMessage({
      message: "发货操作成功！",
      type: "success",
    });
  } catch (error) {
    // 如果失败，报告错误
    ElMessage({
      message: error.message,
      type: "error",
    });
  }
  initGetDelivery();
};
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}

::v-deep .el-pagination {
  padding-top: 16px;
  box-sizing: border-box;
  text-align: right;
}
</style>
