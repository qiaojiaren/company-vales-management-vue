<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <el-form :model="formRef" label-width="150px" :rules="rules">
      <el-form-item label="purchaseOrderId" prop="purchaseOrderId">
        <el-input v-model="form.purchaseOrderId" disabled="true"/>
      </el-form-item>
      <el-form-item label="productId" prop="productId">
        <el-input v-model="form.productId" />
      </el-form-item>
      <el-form-item label="productName" prop="productName">
        <el-input v-model="form.productName" />
      </el-form-item>
      <el-form-item label="quantity" prop="quantity">
        <el-input v-model="form.quantity" />
      </el-form-item>
      <el-form-item label="purchasePrice" prop="purchasePrice">
        <el-input v-model="form.purchasePrice" />
      </el-form-item>
      <el-form-item label="fulfillment" prop="fulfillment">
        <el-select v-model="form.fulfillment" placeholder="请选择状态">
          <el-option label="未采购" value="未采购"></el-option>
          <el-option label="已采购" value="已采购"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="description" prop="description">
        <el-input v-model="form.description" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref, defineProps, watch } from "vue";
import { purchaseOrderModify } from "@/api/purchaseOrder";
import { ElMessage } from "element-plus";

const props = defineProps({
  dialogTitle: {
    type: String,
    default: "",
    required: true,
  },
  dialogTableValue: {
    type: Object,
    default: () => {},
  },
});

const formRef = ref(null);

const form = ref({
  purchaseOrderId: "",
  productId: "",
  productName: "",
  quantity: "",
  purchasePrice: "",
  fulfillment: "",
  description: ""
});

const rules = ref({
  purchaseOrderId: [
    {
      required: true,
      message: "",
      trigger: "blur",
    },
  ],
  productId: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
  productName: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
  quantity: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
  purchasePrice: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
  fulfillment: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
  description: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
});

watch(
  () => props.dialogTableValue,
  () => {
    form.value = props.dialogTableValue;
  },
  { deep: true, immediate: true }
);

const emits = defineEmits(["update:modelValue"]);

const handleClose = () => {
  emits("update:modelValue", false);
};

const handleConfirm = async () => {
  await purchaseOrderModify(form.value);
  handleClose();
  ElMessage.success("修改进货单成功");
  window.location.reload();
};
</script>

<style lang="scss" scoped></style>
