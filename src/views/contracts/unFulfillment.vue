<template>
  <el-card>
    <el-row :gutter="20" class="header">
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
          <el-button type="danger" size="small" :icon="Delete" @click="handleDelete(row)"></el-button>
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
import { Search, Edit, Delete } from "@element-plus/icons-vue";
import { deleteContract, unFulfillment } from "@/api/contracts";
import { options } from "./options";
import Dialog from "./components/dialog.vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import store from '@/store'

const queryForm = ref({
  query: store.getters.user.salespersonId,
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
  const res = await unFulfillment(queryForm.value);
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
  ElMessageBox.confirm(
    '确定要删除该合同吗?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
      await deleteContract(row.contractId)
      ElMessage({
        type: 'success',
        message: '删除完成',
      })
      initGetContracts()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除取消',
      })
    })
}

</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}

::v-deep .el-pagination{
  padding-top: 16px;
  box-sizing: border-box;
  text-align: right;
}
</style>
