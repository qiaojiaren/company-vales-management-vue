<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <el-form :model="formRef" label-width="150px" :rules="rules">
      <el-form-item label="contractId" prop="contractId">
        <el-input v-model="form.contractId" />
      </el-form-item>
      <el-form-item label="customerId" prop="customerId">
        <el-input v-model="form.customerId" />
      </el-form-item>
      <el-form-item label="salespersonId" prop="salespersonId">
        <el-input v-model="form.salespersonId" />
      </el-form-item>
      <el-form-item label="contractAmount" prop="contractAmount">
        <el-input v-model="form.contractAmount" />
      </el-form-item>
      <el-form-item label="contractContent" prop="contractContent">
        <el-input v-model="form.contractContent" />
      </el-form-item>
      <el-form-item label="description" prop="description">
        <el-input v-model="form.description" />
      </el-form-item>
      <!-- <el-form-item label="fulfillmentStatus" prop="fulfillmentStatus">
      <el-input v-model="form.fulfillmentStatus" />
    </el-form-item> -->
      <el-form-item label="fulfillmentStatus" prop="fulfillmentStatus">
        <el-select v-model="form.fulfillmentStatus" placeholder="请选择状态">
          <el-option label="未履行" value="未履行"></el-option>
          <el-option label="履行中" value="履行中"></el-option>
          <el-option label="全部履行" value="全部履行"></el-option>
        </el-select>
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
import { editContract } from "@/api/contracts";
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
  contractId: "",
  customerId: "",
  salespersonId: "",
  contractAmount: "",
  contractContent: "",
  description: "",
  fulfillmentStatus: "",
});

const rules = ref({
  contractId: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
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
  contractContent: [
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
  ],
  fulfillmentStatus: [
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
  await editContract(form.value);
  handleClose();
  ElMessage.success("修改成功");
  window.location.reload();
};
</script>

<style lang="scss" scoped></style>
