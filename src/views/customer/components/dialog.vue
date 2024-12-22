<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <el-form :model="formRef" label-width="150px" :rules="rules">
      <el-form-item label="customerId" prop="customerId">
        <el-input v-model="form.customerId" disabled="true" />
      </el-form-item>
      <el-form-item label="customerName" prop="customerName">
        <el-input v-model="form.customerName" />
      </el-form-item>
      <el-form-item label="contactNumber" prop="contactNumber">
        <el-input v-model="form.contactNumber" />
      </el-form-item>
      <el-form-item label="address" prop="address">
        <el-input v-model="form.address" />
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
import { createCustomer, modifyCustomer } from "@/api/customer";
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
  customerId: "",
  customerName: "",
  contactNumber: "",
  address: "",
});

const rules = ref({
  customerId: [
    {
      required: false,
      message: "Please select Activity zone",
      trigger: "",
    },
  ],
  customerName: [
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
  address: [
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
  props.dialogTitle === "新增顾客"
    ? await createCustomer(form.value)
    : await modifyCustomer(form.value);
  ElMessage({
    message: "操作成功",
    type: "success",
  });
  handleClose();
  window.location.reload();
};

// const handleConfirm = () => {
//   console.log("提示",form.value);
//   formRef.value.validate(async (valid) => {
//     if(valid){
//       console.log("提示111",form.value);
//       props.dialogTitle === '新增顾客'
//       ? await addUser(form.value)
//       : await modifyUser(form.value);
//       ElMessage({
//         message: "操作成功",
//         type: "success"
//       })
//       handleClose();
//     } else{
//       return false;
//     }
//   })
// }
</script>

<style lang="scss" scoped></style>
