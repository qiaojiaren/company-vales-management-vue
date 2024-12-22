<template>
  <div class="hamburger-container" @click="toggleClick">
    <el-icon>
      <component :is="icon" />
    </el-icon>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'
const store = useStore()
const toggleClick = () => {
  store.commit('app/changeSiderType')
}
const icon = computed(() =>{
  return store.getters.siderType ? Fold : Expand
})
</script>

<style>
.hamburger-container{
  margin-right:16px;
  box-sizing: border-box;
  cursor:pointer;
}
</style>