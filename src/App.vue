<template>
  <div class="flex flex-col min-h-screen bg-gray-100 text-gray-900">
    <!-- Header -->
    <header
      class="fixed top-0 left-0 w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-300 p-4 shadow-md flex items-center justify-between z-10"
    >
      <h1 class="text-lg md:text-2xl font-bold">My Time Tracker</h1>
    </header>

    <!-- Main Content -->
    <main class="pt-16 flex-1 overflow-y-auto">
      <router-view />
    </main>

    <!-- Footer -->
    <footer
      class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-300 py-4 text-center"
    >
      <p class="text-sm">&copy; 2024 My Time tracker. All rights reserved.</p>
      <p class="text-sm">Built by Donald1597</p>
      <p class="text-sm">
        <a
          href="https://github.com/Donald1597"
          class="text-teal-500 hover:underline dark:text-teal-400"
          target="_blank"
        >
          Check out my GitHub
        </a>
      </p>
    </footer>
  </div>
</template>
