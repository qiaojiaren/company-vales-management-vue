<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input
          placeholder="请输入合同id"
          clearable
          v-model="queryForm.query"
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initGetContracts"
        >搜索</el-button
      >
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :width="item.width"
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in options"
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
            type="danger"
            size="small"
            :icon="Delete"
            @click="handleDelete(row)"
          ></el-button>
          <el-button
            type="success"
            v-if="row.fulfillmentStatus != '全部履行'"
            size="small"
            :icon="Check"
            @click="handleCheck(row)"
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
import { Search, Edit, Delete, Check } from "@element-plus/icons-vue";
import { getContracts, deleteContract, fulfillment } from "@/api/contracts";
import { options } from "./options";
import Dialog from "./components/dialog.vue";
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
const initGetContracts = async () => {
  const res = await getContracts(queryForm.value);
  total.value = res.total;
  tableData.value = res.rows;
};
initGetContracts();

// 分页
const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1;
  queryForm.value.pagesize = pageSize;
  initGetContracts();
};
const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum;
  initGetContracts();
};

const handleDialogValue = (row) => {
  dialogTitle.value = "编辑合同";
  dialogVisible.value = true;
  dialogTableValue.value = JSON.parse(JSON.stringify(row));
};

const handleDelete = (row) => {
  ElMessageBox.confirm("确定要删除该合同吗?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      await deleteContract(row.contractId);
      ElMessage({
        type: "success",
        message: "删除完成",
      });
      initGetContracts();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除取消",
      });
    });
};

const handleCheck = (row) => {
  ElMessageBox.confirm("确定要手动完成该合同吗?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      await fulfillment(row.contractId);
      ElMessage({
        type: "success",
        message: "合同手动完成",
      });
      initGetContracts();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "操作取消",
      });
    });
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
