<template>
  <div class="flex flex-col h-full bg-gray-800 text-white p-4">
    <div class="flex flex-col items-center mb-6">
      <img :src="logoSrc" alt="Profile" class="w-32 h-32 rounded-full mb-2" />
      <h2 class="text-2xl font-semibold">Donald APOVO</h2>
    </div>

    <nav>
      <ul class="space-y-4">
        <li
          class="flex items-center text-gray-300 hover:text-white cursor-pointer"
        >
          <i class="fas fa-tasks mr-3"></i> Tasks
        </li>
        <li
          @click="showAnalytics = true"
          class="flex items-center text-gray-300 hover:text-white cursor-pointer"
        >
          <i class="fas fa-chart-line mr-3"></i> Analytics
        </li>
        <li
          @click="showHistory = true"
          class="flex items-center text-gray-300 hover:text-white cursor-pointer"
        >
          <i class="fas fa-history mr-3"></i> History
        </li>
      </ul>
    </nav>

    <AnalyticsModal v-if="showAnalytics" @close="showAnalytics = false" />
    <HistoryModal v-if="showHistory" @close="showHistory = false" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import logoSrc from "@/assets/donald.png";
import AnalyticsModal from "@/components/modals/AnalyticsModal.vue";
import HistoryModal from "@/components/modals/HistoryModal.vue";

const showAnalytics = ref(false);
const showHistory = ref(false);
</script>
