<template>
  <div
    class="mx-auto p-8 bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl shadow-2xl"
  >
    <h2 class="text-3xl font-extrabold text-white mb-8 text-center">
      Time Tracking History
    </h2>

    <div class="max-h-[500px] overflow-y-auto">
      <div v-if="timeEntries.length > 0" class="space-y-4">
        <div
          v-for="entry in timeEntries"
          :key="entry.id"
          class="bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-shadow duration-300 ease-in-out hover:shadow-xl"
        >
          <div class="mb-3">
            <strong class="text-gray-800 text-lg">Task:</strong>
            <span class="text-gray-900 text-lg">{{ entry.taskName }}</span>
          </div>
          <div class="mb-3">
            <strong class="text-gray-800 text-lg">Start Time:</strong>
            <span class="text-gray-900 text-lg">{{
              new Date(entry.startTime).toLocaleString()
            }}</span>
          </div>
          <div class="mb-3" v-if="entry.endTime">
            <strong class="text-gray-800 text-lg">End Time:</strong>
            <span class="text-gray-900 text-lg">{{
              new Date(entry.endTime).toLocaleString()
            }}</span>
          </div>
          <div class="mb-3" v-else>
            <strong class="text-gray-800 text-lg">Status:</strong>
            <span class="text-yellow-600 text-lg">Ongoing</span>
          </div>
          <div v-if="entry.notes" class="mb-3">
            <strong class="text-gray-800 text-lg">Notes:</strong>
            <p class="text-gray-900 text-lg">{{ entry.notes }}</p>
          </div>
          <button
            @click="deleteEntry(entry.id)"
            class="text-red-600 hover:text-red-800 font-semibold mt-4"
          >
            Delete
          </button>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 text-lg mt-4">
        No time entries found.
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const timeEntries = computed(() => store.getters.timeEntries);

const deleteEntry = (entryId) => {
  store.commit("deleteTimeEntry", entryId);
};
</script>
