<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-button type="primary" :icon="CirclePlus" @click="handleDialogValue"
        >新增库存</el-button
      >
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :width="item.width"
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in optionsInventory"
        :key="index"
      >
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
import { CirclePlus } from "@element-plus/icons-vue";
import { getInventories } from "@/api/inventory";
import { optionsInventory } from "./options";
import Dialog from "./components/dialogCreateInventory.vue";
import { ElMessage, ElMessageBox } from 'element-plus'

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
const initGetInventories = async () => {
  const res = await getInventories(queryForm.value);
  total.value = res.total;
  tableData.value = res.rows;
};
initGetInventories();

// 分页
const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1;
  queryForm.value.pagesize = pageSize;
  initGetInventories();
};
const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum;
  initGetInventories();
};

const handleDialogValue = () => {
  dialogVisible.value = true;
  dialogTitle.value = "新增库存";
};



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