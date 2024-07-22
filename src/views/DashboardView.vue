<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside
      class="w-64 bg-gray-800 text-white p-5 flex-shrink-0 hidden md:block"
    >
      <SidebarComponent />
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 gap-6 flex flex-col md:flex-row">
      <div class="flex flex-col w-full md:w-3/5 space-y-6">
        <div
          class="bg-white shadow-md rounded-lg p-5 flex justify-between items-center"
        >
          <button
            @click="showTaskModal = true"
            class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm md:text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out flex items-center"
          >
            <i class="fas fa-list-alt text-xl md:mr-2"></i>

            <span class="hidden md:inline">Manage Tasks</span>
          </button>

          <button
            @click="showExportModal = true"
            class="bg-green-600 text-white px-4 py-2 rounded-md text-sm md:text-base hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-150 ease-in-out"
          >
            <i class="fas fa-file-export text-xl md:mr-2"></i>

            <span class="hidden md:inline">Export Data</span>
          </button>
          <!-- Analytics Button (visible only on small screens) -->
          <button
            @click="showAnalytics = true"
            class="bg-purple-600 text-white px-4 py-2 rounded-md text-sm md:hidden hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-150 ease-in-out"
          >
            <i class="fas fa-chart-line text-xl"></i>
          </button>

          <!-- History Button (visible only on small screens) -->
          <button
            @click="showHistory = true"
            class="bg-gray-600 text-white px-4 py-2 rounded-md text-sm md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-150 ease-in-out"
          >
            <i class="fas fa-history text-xl"></i>
          </button>
        </div>

        <section class="bg-white shadow-md rounded-lg p-5 flex-1">
          <TimeSpent />
        </section>
      </div>

      <div class="flex flex-col w-full md:w-2/5 space-y-6">
        <section class="bg-white shadow-md rounded-lg p-5">
          <TimerComponent />
        </section>
        <section
          class="bg-white shadow-md rounded-lg p-5 hidden md:block flex-1"
        >
          <LogComponent />
        </section>
      </div>
    </main>

    <!-- Modals -->
    <TaskModal v-if="showTaskModal" @close="showTaskModal = false" />
    <ExportModal v-if="showExportModal" @close="showExportModal = false" />
    <AnalyticsModal v-if="showAnalytics" @close="showAnalytics = false" />
    <HistoryModal v-if="showHistory" @close="showHistory = false" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import SidebarComponent from "@/components/SidebarComponent.vue";
import TimerComponent from "@/components/TimerComponent.vue";
import LogComponent from "@/components/LogComponent.vue";
import TimeSpent from "@/components/TimeSpent.vue";
import TaskModal from "@/components/modals/TaskModal.vue";
import ExportModal from "@/components/modals/ExportModal.vue";
import AnalyticsModal from "@/components/modals/AnalyticsModal.vue";
import HistoryModal from "@/components/modals/HistoryModal.vue";

const showTaskModal = ref(false);
const showExportModal = ref(false);
const showAnalytics = ref(false);
const showHistory = ref(false);
</script>
