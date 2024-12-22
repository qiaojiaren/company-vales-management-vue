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
      <el-button type="primary" :icon="Search" @click="initGetCustomerList"
        >搜索</el-button
      >
      <el-button type="primary" :icon="CirclePlus" @click="handleDialogValue()"
        >新增顾客</el-button
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
import { Search, Edit, Delete, CirclePlus } from "@element-plus/icons-vue";
import { options } from "./options";
import Dialog from "./components/dialog.vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCustomerList, deleteCustomer } from "@/api/customer";
import { isNull } from '@/utils/filters'

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
const initGetCustomerList = async () => {
  const res = await getCustomerList(queryForm.value);
  total.value = res.total;
  tableData.value = res.rows;
};
initGetCustomerList();

// 分页
const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1;
  queryForm.value.pagesize = pageSize;
  initGetCustomerList();
};
const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum;
  initGetCustomerList();
};

const handleDialogValue = (row) => {
  if(isNull(row)){
    dialogTitle.value = "新增顾客";
    dialogTableValue.value = {};
  }else{
    dialogTitle.value = "修改顾客信息";
    dialogTableValue.value = JSON.parse(JSON.stringify(row));
  }

  dialogVisible.value = true;
};

const handleDelete = (row) => {
  ElMessageBox.confirm(
    '确定要删除该顾客吗?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
      await deleteCustomer(row.customerId)
      ElMessage({
        type: 'success',
        message: '删除完成',
      })
      initGetCustomerList()
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
