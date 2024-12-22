<template>
  <div>
    <h2>您是: {{ roleName }}{{ name }}</h2>
    <h2>您可以访问的页面: {{ pages }}</h2>
  </div>
</template>

<script setup>
import store from "@/store";
import { ref, computed } from "vue";

const role = ref(store.getters.user.is_manager);
const name = ref(store.getters.user.salespersonName);
const pages = ref([]);

const roleName = computed(() => {
  switch (role.value) {
    case 1:
      return "销售管理员";
    case 0:
      return "销售人员";
    case 2:
      return "仓库管理员";
    default:
      return "未知角色";
  }
});

const getPages = () => {
  if (role.value === 0) {
    console.log(role);
    pages.value = ["合同执行情况查询", "合同签订", "查询自己业绩"];
  } else {
    console.log(role);
    pages.value = "所有页面";
  }
};
getPages();


</script>

<style></style>
