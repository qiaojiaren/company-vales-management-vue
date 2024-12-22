<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="60%"
    @close="handleClose"
    @open="initGetShoppingCart"
  >
    <el-card>
      <el-row :gutter="20" class="header">
        <el-button type="danger" :icon="Delete" @click="deleteAll"
          >清空已选中商品</el-button
        >
      </el-row>

      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
          :width="item.width"
          :prop="item.prop"
          :label="item.label"
          v-for="(item, index) in optionsShoppingCart"
          :key="index"
        >
          <template #default="{ row }" v-if="item.prop === 'action'">
            <el-button
              type="primary"
              size="small"
              :icon="Plus"
              @click="add(row)"
            ></el-button>
            <el-input v-model="row.productQuantity" style="width: 50px" />
            <el-button
              type="danger"
              size="small"
              :icon="Minus"
              @click="sub(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleClose">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref, defineProps, watch } from "vue";
import { editContract } from "@/api/contracts";
import { ElMessage } from "element-plus";
import { optionsShoppingCart } from "./dialogOptions";
import { getShoppingCart, shoppingCartPlus, shoppingCartSub, deleteShoppingCart } from "@/api/shoppingCart";
import {
  Plus,
  Minus,
} from "@element-plus/icons-vue";

const props = defineProps({
  dialogTitle: {
    type: String,
    default: "",
    required: true,
  },
});

const tableData = ref([]);

const initGetShoppingCart = async () => {
  const res = await getShoppingCart();
  tableData.value = res;
  console.log("获取的数据", res);
  console.log("这是购物车数据", tableData.value);
};

const add = async (row) => {
  const data = {
      shoppingCartId: row.shoppingCartId,
      productId: row.productId,
      productQuantity: row.productQuantity,
  };
  await shoppingCartPlus(data);
  initGetShoppingCart();
}

const sub = async (row) => {
  const data = {
      shoppingCartId: row.shoppingCartId,
      productId: row.productId,
      productQuantity: row.productQuantity,
  };
  await shoppingCartSub(data);
  initGetShoppingCart();
}

const emits = defineEmits(["update:modelValue"]);

const handleClose = () => {
  emits("update:modelValue", false);
};

const deleteAll = async () => {
  await deleteShoppingCart();
  initGetShoppingCart();
}
</script>

<style lang="scss" scoped></style>