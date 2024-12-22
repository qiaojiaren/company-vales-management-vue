<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <el-form :model="formRef" label-width="150px" :rules="rules">
      <el-form-item label="salespersonId" prop="salespersonId">
        <el-input v-model="form.salespersonId" disabled="true" />
      </el-form-item>
      <el-form-item label="salespersonName" prop="salespersonName">
        <el-input v-model="form.salespersonName" />
      </el-form-item>
      <el-form-item label="contactNumber" prop="contactNumber">
        <el-input v-model="form.contactNumber" />
      </el-form-item>
      <el-form-item label="isManager" prop="isManager">
        <el-select v-model="form.isManager" placeholder="请选择权限">
          <el-option
            v-for="option in managerOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="username" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input v-model="form.password" />
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
import { createSalesperson, modifySalesperson } from "@/api/salesperson";
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
  salespersonId: "",
  salespersonName: "",
  contactNumber: "",
  isManager: "",
  username: "",
  password: "",
});

const rules = ref({
  salespersonId: [
    {
      required: false,
      message: "Please select Activity zone",
      trigger: "",
    },
  ],
  salespersonName: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
  contactNumber: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
  isManager: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
  username: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "blur",
    },
  ],
  password: [
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

const managerOptions = ref([
  { label: "销售管理员", value: 1 },
  { label: "销售人员", value: 0 },
  { label: "仓库管理员", value: 2 }
]);

const emits = defineEmits(["update:modelValue"]);

const handleClose = () => {
  emits("update:modelValue", false);
};

const handleConfirm = async () => {
  props.dialogTitle === "新增销售人员"
    ? await createSalesperson(form.value)
    : await modifySalesperson(form.value);
  ElMessage({
    message: "操作成功",
    type: "success",
  });
  handleClose();
  window.location.reload();
};


</script>

<style lang="scss" scoped></style>
