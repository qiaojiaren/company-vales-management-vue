<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-button type="primary" :icon="CirclePlus" @click="handleNCDialogValue"
        >新增合同</el-button
      >
      <el-button type="warning" :icon="ShoppingCart" @click="handleSCDialogValue"
        >查看已选中商品</el-button
      >
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :width="item.width"
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in options1"
        :key="index"
        header-align="center"
      >
        <template #default="{ row }" v-if="item.prop === 'amount'">
          <el-button
            type="primary"
            size="small"
            :icon="Plus"
            @click="add(row)"
          ></el-button>
          <el-input v-model="row.count" style="width: 50px" />
          <el-button
            type="danger"
            size="small"
            :icon="Minus"
            @click="sub(row)"
          ></el-button>
        </template>
        <template #default="{ row }" v-if="item.prop === 'action'">
          <el-button
            type="success"
            size="small"
            :icon="Check"
            @click="handleConfirm(row)"
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
  <SCDialog
    v-model="dialogSCVisible"
    :dialogTitle="dialogSCTitle"
    :dialog-table-value="dialogSCTableValue"
  ></SCDialog>
  <NCDialog
    v-model="dialogNCVisible"
    :dialogTitle="dialogNCTitle"
    :dialog-table-value="dialogNCTableValue"
  ></NCDialog>
</template>

<script setup>
import { ref } from "vue";
import {
  CirclePlus,
  Plus,
  Minus,
  ShoppingCart,
  Check,
} from "@element-plus/icons-vue";
import { getInventories } from "@/api/inventory";
import { createShoppingCart } from "@/api/shoppingCart";
import { options1 } from "./options";
import SCDialog from "./components/shoppingCartDialog.vue";
import NCDialog from "./components/createContractDialog.vue";
import { ElMessage, ElMessageBox } from "element-plus";

const queryForm = ref({
  query: "",
  pagenum: 1,
  pagesize: 5,
});

const total = ref(0);

const tableData = ref([]);

const dialogSCVisible = ref(false);
const dialogSCTitle = ref("");
const dialogSCTableValue = ref({});

const dialogNCVisible = ref(false);
const dialogNCTitle = ref("");
const dialogNCTableValue = ref({});


const add = (row) => {
  row.count++;
};

const sub = (row) => {
  if (row.count > 0) {
    row.count--;
  }
};

const addContract = () => {};

// 表格数据
const initGetInventories = async () => {
  const res = await getInventories(queryForm.value);
  total.value = res.total;
  // 在获取的数据中每条记录添加 count 属性
  tableData.value = res.rows.map((row) => ({ ...row, count: 0 }));
};
initGetInventories();


const handleConfirm = async (row) => {
  if (row.count <= 0) {
    ElMessage({
      type: "warning",
      message: "请选择数量",
    });
  } else {
    const data = {
      productId: row.productId,
      productQuantity: row.count,
    };
    try {
      console.log("这是data",data);
      await createShoppingCart(data);
      ElMessage({
        type: "success",
        message: "购物车创建成功",
      });
    } catch (error) {
      ElMessage({
        type: "error",
        message: "购物车创建失败",
      });
    }
    initGetInventories();
  }
};


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

const handleSCDialogValue = (row) => {
  dialogSCTitle.value = "查看已选中商品";
  dialogSCVisible.value = true;
};

const handleNCDialogValue = (row) => {
  dialogNCTitle.value = "新增合同";
  dialogNCVisible.value = true;
};

// const handleDelete = (row) => {
//   ElMessageBox.confirm(
//     '确定要删除该合同吗?',
//     'Warning',
//     {
//       confirmButtonText: 'OK',
//       cancelButtonText: 'Cancel',
//       type: 'warning',
//     }
//   )
//     .then(async () => {
//       await deleteContract(row.contractId)
//       ElMessage({
//         type: 'success',
//         message: '删除完成',
//       })
//       initGetContracts()
//     })
//     .catch(() => {
//       ElMessage({
//         type: 'info',
//         message: '删除取消',
//       })
//     })
// }
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
