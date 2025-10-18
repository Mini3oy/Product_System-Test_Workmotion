<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { ProductAPI, CategoryAPI } from '../api';
import ProductForm from '../components/ProductForm.vue';

const rows = ref([]);
const categories = ref([]);
const editing = ref(null);
const showModal = ref(false);
const search = ref('');
const page = ref(1);
const limit = ref(10);
const total = ref(0);


const load = async () => {
  const { items, total: t } = await ProductAPI.list({
    page: page.value,
    limit: limit.value,
    search: search.value,
  });
  rows.value = items;
  total.value = t || items.length;
};

const loadCategories = async () => {
  const { items } = await CategoryAPI.list({ page: 1, limit: 100 });
  categories.value = items;
};

const onSave = async (payload) => {
  if (editing.value) await ProductAPI.update(editing.value._id, payload);
  else await ProductAPI.create(payload);
  editing.value = null;
  showModal.value = false;
  await load();
};


const onDelete = async (id) => {
  if (!confirm('ยืนยันการลบสินค้านี้?')) return;
  await ProductAPI.remove(id);
  await load();
};


const totalPages = computed(() => Math.ceil(total.value / limit.value));


watch(limit, () => {
  page.value = 1;
  load();
});

onMounted(async () => {
  await loadCategories();
  await load();
});
</script>

<template>
  <div class="space-y-6">

    <div class="flex justify-between items-center">
      <h2 class="text-3xl font-semibold text-gray-800">🛍️ จัดการสินค้า</h2>
      <button
        @click="
          editing = null;
          showModal = true;
        "
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        ➕ เพิ่มสินค้าใหม่
      </button>
    </div>


    <div class="flex flex-wrap gap-2 items-center">
      <input
        v-model="search"
        placeholder="ค้นหาชื่อสินค้า..."
        class="border rounded-lg p-2 w-64 focus:ring-2 focus:ring-blue-500 bg-white"
        @keyup.enter="page = 1; load();"
      />
      <button
        @click="page = 1; load();"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        🔍 ค้นหา
      </button>
    </div>

    <div class="overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
      <table class="min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th class="px-6 py-3 text-left">ชื่อสินค้า</th>
            <th class="px-6 py-3 text-right">ราคา</th>
            <th class="px-6 py-3 text-center">สต็อก</th>
            <th class="px-6 py-3 text-left">หมวดหมู่</th>
            <th class="px-6 py-3 text-center">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rows" :key="r._id" class="hover:bg-gray-50 transition">
            <td class="px-6 py-3 font-medium">{{ r.name }}</td>
            <td class="px-6 py-3 text-right">{{ r.price.toLocaleString() }} บาท</td>
            <td class="px-6 py-3 text-center">
              <span
                :class="[
                  r.stock > 10
                    ? 'bg-green-100 text-green-700'
                    : r.stock > 0
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700',
                  'px-3 py-1 rounded-full text-xs font-medium',
                ]"
              >
                {{ r.stock }}
              </span>
            </td>
            <td class="px-6 py-3">{{ r.categoryId?.name || '-' }}</td>
            <td class="px-6 py-3 flex justify-center gap-2">
              <button
                @click="
                  editing = r;
                  showModal = true;
                "
                class="px-3 py-1.5 bg-yellow-400 text-white rounded hover:bg-yellow-500"
              >
                ✏️
              </button>
              <button
                @click="onDelete(r._id)"
                class="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
              >
                🗑️
              </button>
            </td>
          </tr>

          <tr v-if="rows.length === 0">
            <td colspan="5" class="text-center py-6 text-gray-500">❌ ไม่มีข้อมูลสินค้า</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="flex flex-wrap justify-between items-center text-sm text-gray-700 mt-4 gap-3"
    >
      <div class="flex items-center gap-2">
        <label>แสดงแถวต่อหน้า:</label>
        <select
          v-model="limit"
          class="border rounded-lg p-1 focus:ring-2 focus:ring-blue-500"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="if (page > 1) { page--; load(); }"
          :disabled="page <= 1"
          class="px-3 py-1 border rounded-lg disabled:opacity-40 hover:bg-gray-100 transition"
        >
          ⬅ ก่อนหน้า
        </button>

        <span class="font-semibold text-blue-700">หน้า {{ page }} / {{ totalPages }}</span>

        <button
          @click="if (page < totalPages) { page++; load(); }"
          :disabled="page >= totalPages"
          class="px-3 py-1 border rounded-lg disabled:opacity-40 hover:bg-gray-100 transition"
        >
          ถัดไป ➡
        </button>
      </div>
    </div>


    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      >
        <div
          class="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative animate-fadeIn"
        >
          <h3 class="text-2xl font-semibold text-gray-800 mb-4">
            {{ editing ? "✏️ แก้ไขสินค้า" : "➕ เพิ่มสินค้าใหม่" }}
          </h3>

          <ProductForm
            :model-value="editing"
            :categories="categories"
            @submit="onSave"
          />

  
          <button
            @click="showModal = false"
            class="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
          >
            ✖
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
