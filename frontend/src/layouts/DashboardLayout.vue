<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const sidebarOpen = ref(false);


const isActive = (path) => route.path.startsWith(path);
</script>

<template>
  <div class="flex min-h-screen bg-gray-50 text-gray-800 transition-colors duration-500">

    <aside
      class="w-64 bg-blue-700 text-white flex flex-col transition-transform duration-300 shadow-md"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-64 sm:translate-x-0'"
    >

      <div class="p-4 text-2xl font-bold border-b border-blue-600 flex items-center gap-2">
        🏪 <span>Product Admin</span>
      </div>

       
      <nav class=" p-3 space-y-1 mt-2">
        <router-link
          to="/products"
          class="flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
          :class="isActive('/products')
            ? 'bg-white text-blue-700 shadow-inner'
            : 'hover:bg-blue-600 hover:pl-5'"
        >
          <span>🛍️</span>
          <span>สินค้า</span>
        </router-link>

        <router-link
          to="/categories"
          class="flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
          :class="isActive('/categories')
            ? 'bg-white text-blue-700 shadow-inner'
            : 'hover:bg-blue-600 hover:pl-5'"
        >
          <span>📂</span>
          <span>หมวดหมู่</span>
        </router-link>
      </nav>


      <div class="mt-auto p-3 text-xs text-blue-200 border-t border-blue-500 text-center">
        © 2025 Product System
      </div>
    </aside>


    <div class="flex-1 flex flex-col">
      <header
        class="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10"
      >
        <button
          class="sm:hidden text-blue-700 hover:text-blue-900"
          @click="sidebarOpen = !sidebarOpen"
        >
          ☰
        </button>
        <h1 class="text-xl font-semibold">ระบบจัดการสินค้า</h1>
      </header>

      <main class="flex-1 p-6 overflow-y-auto transition-colors duration-500">
        <router-view />
      </main>
    </div>
  </div>
</template>
