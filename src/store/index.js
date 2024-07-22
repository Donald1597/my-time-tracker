import { createStore } from "vuex";

export default createStore({
  state: {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    logs: JSON.parse(localStorage.getItem("logs")) || [],
    timeEntries: JSON.parse(localStorage.getItem("timeEntries")) || [],
  },
  mutations: {
    // Tasks mutations
    addTask(state, task) {
      state.tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
      this.commit("addLog", `Task "${task.name}" added`);
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
        this.commit("addLog", `Task "${updatedTask.name}" updated`);
      }
    },
    deleteTask(state, taskId) {
      const taskName = state.tasks.find((task) => task.id === taskId)?.name;
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
      this.commit("addLog", `Task "${taskName}" deleted`);
    },
    updateTaskTime(state, { id, timeSpent }) {
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.timeSpent = timeSpent;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
        this.commit(
          "addLog",
          `Task "${task.name}" time updated to ${timeSpent}`
        );
      }
    },
    clearTasks(state) {
      state.tasks = [];
      localStorage.removeItem("tasks");
      this.commit("addLog", `All tasks cleared`);
    },

    // Logs mutations
    addLog(state, message) {
      state.logs.push({
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        description: message,
      });
      localStorage.setItem("logs", JSON.stringify(state.logs));
    },
    deleteLog(state, logId) {
      state.logs = state.logs.filter((log) => log.id !== logId);
      localStorage.setItem("logs", JSON.stringify(state.logs));
    },
    clearLogs(state) {
      state.logs = [];
      localStorage.removeItem("logs");
    },

    // Time Entries mutations
    addTimeEntry(state, timeEntry) {
      state.timeEntries.push(timeEntry);
      localStorage.setItem("timeEntries", JSON.stringify(state.timeEntries));
      this.commit(
        "addLog",
        `Time entry added for task "${timeEntry.taskName}"`
      );
    },
    updateTimeEntry(state, updatedEntry) {
      const index = state.timeEntries.findIndex(
        (entry) => entry.id === updatedEntry.id
      );
      if (index !== -1) {
        state.timeEntries[index] = updatedEntry;
        localStorage.setItem("timeEntries", JSON.stringify(state.timeEntries));
        this.commit(
          "addLog",
          `Time entry updated for task "${updatedEntry.taskName}"`
        );
      }
    },
    deleteTimeEntry(state, entryId) {
      state.timeEntries = state.timeEntries.filter(
        (entry) => entry.id !== entryId
      );
      localStorage.setItem("timeEntries", JSON.stringify(state.timeEntries));
      this.commit("addLog", `Time entry deleted`);
    },
    clearTimeEntries(state) {
      state.timeEntries = [];
      localStorage.removeItem("timeEntries");
      this.commit("addLog", `All time entries cleared`);
    },
  },
  actions: {},
  getters: {
    tasks: (state) => state.tasks,
    logs: (state) => state.logs,
    timeEntries: (state) => state.timeEntries,
  },
});
