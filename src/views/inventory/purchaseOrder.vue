<template>
  <el-card>
    <el-row :gutter="20" class="header"> </el-row>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :width="item.width"
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in optionsPurchaseOrder"
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
            v-if="row.fulfillment === '未采购'"
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
import { ref } from "vue";
import { CirclePlus, Edit, Check } from "@element-plus/icons-vue";
import { purchaseOrderSearch, purchase } from "@/api/purchaseOrder";
import { optionsPurchaseOrder } from "./options";
import Dialog from "./components/dialogPurchaseOrder.vue";
import { ElMessage, ElMessageBox } from "element-plus";

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

// 表格数据
const initPurchaseOrder = async () => {
  const res = await purchaseOrderSearch(queryForm.value);
  total.value = res.total;
  tableData.value = res.rows;
  console.log("这是库存数据", res);
};
initPurchaseOrder();

// 分页
const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1;
  queryForm.value.pagesize = pageSize;
  initPurchaseOrder();
};
const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum;
  initPurchaseOrder();
};

const handleDialogValue = (row) => {
  dialogVisible.value = true;
  dialogTitle.value = "修改进货单信息";
  dialogTableValue.value = JSON.parse(JSON.stringify(row));
};

const handleComplete = async (row) => {
  try {
    // 调用 purchase 函数试图完成该行的采购操作
    await purchase(row.purchaseOrderId);
    // 如果成功，发送成功消息
    ElMessage({
      message: '采购操作成功！',
      type: 'success',
    });
  } catch (error) {
    // 如果失败，报告错误
    ElMessage({
      message: '采购操作失败：' + error.message,
      type: 'error',
    });
  }
  initPurchaseOrder();
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
