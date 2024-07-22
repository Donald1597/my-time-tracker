<template>
  <div
    class="mx-auto p-8 bg-gradient-to-r from-blue-200 to-blue-300 rounded-xl shadow-2xl"
  >
    <div class="mb-8 text-center">
      <h2 class="text-3xl font-extrabold text-white mb-6">Export Data</h2>
    </div>

    <div class="space-y-6">
      <div>
        <label class="block text-gray-100 text-lg font-medium mb-2"
          >Select Data Type:</label
        >
        <select
          v-model="selectedDataType"
          class="block w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300 ease-in-out"
        >
          :disabled="isTimerRunning"
          <option value="logs">Logs</option>
          <option value="tasks">Tasks</option>
        </select>
      </div>

      <div>
        <label class="block text-gray-100 text-lg font-medium mb-2"
          >Select File Format:</label
        >
        <select
          v-model="selectedFormat"
          class="block w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300 ease-in-out"
        >
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
        </select>
      </div>

      <button
        @click="exportData"
        class="bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out w-full"
      >
        Export
        {{
          selectedDataType.charAt(0).toUpperCase() + selectedDataType.slice(1)
        }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";

const toast = useToast();
const selectedDataType = ref("logs");
const selectedFormat = ref("csv");
const logs = JSON.parse(localStorage.getItem("logs")) || [];
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const store = useStore();

const downloadFile = (filename, content) => {
  const blob = new Blob([content], {
    type: `text/${filename.split(".").pop()}`,
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const exportData = () => {
  if (selectedDataType.value === "logs") {
    selectedFormat.value === "csv" ? exportLogsCSV() : exportLogsJSON();
    store.commit("addLog", "Logs exported");
  } else if (selectedDataType.value === "tasks") {
    selectedFormat.value === "csv" ? exportTasksCSV() : exportTasksJSON();
    store.commit("addLog", "Tasks exported");
  }
};

const exportLogsCSV = () => {
  const rows = logs.map((log) => [log.time, log.description]);
  rows.unshift(["Time", "Description"]);
  downloadFile("logs.csv", rows.map((row) => row.join(",")).join("\n"));
  toast.success("Logs exported successfully as CSV!");
};

const exportLogsJSON = () => {
  downloadFile("logs.json", JSON.stringify(logs, null, 2));
  toast.success("Logs exported successfully as JSON!");
};

const exportTasksCSV = () => {
  const rows = tasks.map((task) => [task.name, task.completed]);
  rows.unshift(["Name", "Completed"]);
  downloadFile("tasks.csv", rows.map((row) => row.join(",")).join("\n"));
  toast.success("Tasks exported successfully as CSV!");
};

const exportTasksJSON = () => {
  downloadFile("tasks.json", JSON.stringify(tasks, null, 2));
  toast.success("Tasks exported successfully as JSON!");
};
</script>
