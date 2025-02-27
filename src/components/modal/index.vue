<template>
  <div
    v-if="visible"
    class="overlay"
    @click.self="handleOverlayClick"
  >
    <div class="w-full h-full" @click.self="handleOverlayClick">
      <div class="my-modal rounded-md relative" :style="`width: ${width}px`" @click.stop>
        <div class="content flex">
          <div class="flex-1"><slot name="left_name"></slot></div>
          <div class="flex-1"><slot name="right_name"></slot></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/store';

// 定义 props
const props = defineProps({
  width: {
    type: Number,
    default: 870
  }
});

// 获取 Pinia store 实例
const userStore = useUserStore();

// 计算属性 visible
const visible = computed(() => userStore.isMyModalVisible);

// 定义方法
const handleOverlayClick = () => {
  userStore.resetAllState();
  userStore.hideModal();
};

const handleCloseClick = () => {
  userStore.resetAllState();
  userStore.closeMyModal();
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.my-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  max-width: 90%;
  z-index: 1035;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>