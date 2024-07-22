<template>
  <div class="fixed inset-0 flex items-center justify-center z-50 p-4">
    <div
      class="fixed inset-0 bg-black opacity-50"
      @click="$emit('close')"
    ></div>
    <div
      class="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-lg md:max-w-xl lg:max-w-2xl relative"
    >
      <button
        @click="$emit('close')"
        class="absolute top-2 right-3 text-xl text-gray-600 hover:text-gray-900"
      >
        ✖
      </button>
      <TaskManager />
    </div>
  </div>
</template>

<script setup>
import TaskManager from "@/components/TaskManager.vue";
</script>
