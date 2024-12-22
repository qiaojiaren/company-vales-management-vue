<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <el-form :model="formRef" label-width="150px" :rules="rules">
      <el-form-item label="productId" prop="productId">
        <el-input v-model="form.productId" disabled="true"/>
      </el-form-item>
      <el-form-item label="productName" prop="productName">
        <el-input v-model="form.productName" />
      </el-form-item>
      <el-form-item label="quantity" prop="quantity">
        <el-input v-model="form.quantity" />
      </el-form-item>
      <el-form-item label="sellPrice" prop="sellPrice">
        <el-input v-model="form.sellPrice" />
      </el-form-item>
      <el-form-item label="purchasePrice" prop="purchasePrice">
        <el-input v-model="form.purchasePrice" />
      </el-form-item>
      <el-form-item label="threshold" prop="threshold">
        <el-input v-model="form.threshold" />
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
import { createInventory } from "@/api/inventory";
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
  productId: "",
  productName: "",
  quantity: "",
  sellPrice: "",
  purchasePrice: "",
  threshold: ""
});

const rules = ref({
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
  sellPrice: [
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
  threshold: [
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
  await createInventory(form.value);
  handleClose();
  ElMessage.success("新增库存成功");
  window.location.reload();
};
</script>

<style lang="scss" scoped></style>
