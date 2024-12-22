<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <el-form :model="formRef" label-width="150px" :rules="rules">
      <el-form-item label="deliveryOrderId" prop="deliveryOrderId">
        <el-input v-model="form.deliveryOrderId" disabled="true"/>
      </el-form-item>
      <el-form-item label="contractId" prop="contractId">
        <el-input v-model="form.contractId" />
      </el-form-item>
      <el-form-item label="productId" prop="productId">
        <el-input v-model="form.productId" />
      </el-form-item>
      <el-form-item label="productInfo" prop="productInfo">
        <el-input v-model="form.productInfo" />
      </el-form-item>
      <el-form-item label="productQuantity" prop="productQuantity">
        <el-input v-model="form.productQuantity" />
      </el-form-item>
      <el-form-item label="logisticsInfo" prop="logisticsInfo">
        <el-input v-model="form.logisticsInfo" />
      </el-form-item>
      <el-form-item label="deliveryStatus" prop="deliveryStatus">
        <el-select v-model="form.deliveryStatus" placeholder="请选择状态">
          <el-option label="未发货" value="未发货"></el-option>
          <el-option label="已发货" value="已发货"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="comment" prop="comment">
        <el-input v-model="form.comment" />
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
import { modifyDelivery } from "@/api/delivery";
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
  deliveryOrderId: "",
  contractId: "",
  productId: "",
  productInfo: "",
  productQuantity: "",
  logisticsInfo: "",
  deliveryStatus: "",
  comment: ""
});

const rules = ref({
  deliveryOrderId: [
    {
      required: true,
      message: "",
      trigger: "blur",
    },
  ],
  contractId: [
    {
      required: true,
      message: "Please select Activity zone",
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
  productInfo: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
  productQuantity: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
  logisticsInfo: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
  deliveryStatus: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
  comment: [
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
  await modifyDelivery(form.value);
  handleClose();
  ElMessage.success("修改进货单成功");
  window.location.reload();
};
</script>

<style lang="scss" scoped></style>
