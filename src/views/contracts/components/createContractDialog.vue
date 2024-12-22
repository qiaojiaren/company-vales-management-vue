<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="60%"
    @close="handleClose"
    @open="initGetShoppingCart"
  >
  <p>以下是已选中的商品，点击“确认新增”按钮将创建新的合同</p>
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

    <el-form :model="formRef" label-width="150px" :rules="rules">
      <el-form-item label="salespersonId" prop="salespersonId">
        <el-input v-model="form.salespersonId" disabled="true"/>
      </el-form-item>
      <el-form-item label="contractAmount" prop="contractAmount">
        <el-input v-model="form.contractAmount" disabled="true"/>
      </el-form-item>
      <el-form-item label="customerId" prop="customerId">
        <el-input v-model="form.customerId" />
      </el-form-item>
      <el-form-item label="description" prop="description">
        <el-input v-model="form.description" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button  @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认新增</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref, defineProps, watch } from "vue";
import store from '@/store'
import { editContract } from "@/api/contracts";
import { ElMessage } from "element-plus";
import { optionsShoppingCart } from "./dialogOptions";
import { createContract } from "@/api/contracts";
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
  updateContractAmount();
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

const handleSubmit = async () => {
  if (tableData.value.length === 0) {
    ElMessage.error("请选择商品，无法创建合同！");
    return;
  }

  const data = {
    customerId: form.value.customerId,
    salespersonId: form.value.salespersonId,
    description: form.value.description
  };

  if (data.customerId.length === 0 ) {
    ElMessage.error("请输入客户id,无法创建合同!");
    return;
  }

  try {
    await createContract(data);
    ElMessage.success("合同创建成功！");
    handleClose();
  } catch (error) {
    ElMessage.error("合同创建失败，请重试！");
  }
};
const formRef = ref(null);

const form = ref({
  customerId: "",
  salespersonId: store.getters.user.salespersonId,
  contractAmount: "",
  description: "",
});

const updateContractAmount = () => {
  const totalSellPrice = tableData.value.reduce((sum, item) => {
    console.log("item", item);
    return sum + (item.sellPrice || 0);  // 确保 item.sellPrice 存在，否则加0
  }, 0);
  
  form.value.contractAmount = totalSellPrice; // 将总和赋值给 contractAmount
};


const rules = ref({
  customerId: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
  salespersonId: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
  contractAmount: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
  description: [
    {
      required: false,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ]
});
</script>

<style lang="scss" scoped></style>