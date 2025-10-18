<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({ modelValue: Object, categories: Array });
const emit = defineEmits(["update:modelValue", "submit"]);
const local = ref({
  name: "",
  price: 0,
  stock: 0,
  description: "",
  categoryId: "",
});

watchEffect(() => {
  local.value = {
    name: props.modelValue?.name || "",
    price: props.modelValue?.price || 0,
    stock: props.modelValue?.stock || 0,
    description: props.modelValue?.description || "",
    categoryId:
      props.modelValue?.categoryId?._id || props.modelValue?.categoryId || "",
  };
});

const onSubmit = () => {
  if (!local.value.name?.trim()) {
    alert("⚠️ กรุณากรอกชื่อสินค้า");
    return;
  }
  if (local.value.price < 0) {
    alert("⚠️ ราคาต้องไม่ติดลบ");
    return;
  }
  if (local.value.stock < 0) {
    alert("⚠️ สต็อกต้องไม่ติดลบ");
    return;
  }
  if (!local.value.categoryId) {
    alert("⚠️ กรุณาเลือกหมวดหมู่");
    return;
  }
  emit("submit", {
    ...local.value,
    price: Number(local.value.price),
    stock: Number(local.value.stock),
  });
};
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="bg-white shadow-md rounded-xl p-6 max-w-2xl mx-auto my-6 space-y-5 border border-gray-200"
  >
    <h2 class="text-2xl font-semibold text-gray-800 text-center">
      {{ props.modelValue ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่" }}
    </h2>

    <div class="space-y-2">
      <label class="block text-gray-700 font-medium">
        ชื่อสินค้า <span class="text-red-500">*</span>
      </label>
      <input
        v-model.trim="local.name"
        type="text"
        placeholder="เช่น โทรศัพท์มือถือ"
        class="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>


    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <label class="block text-gray-700 font-medium">ราคา (บาท) *</label>
        <input
          type="number"
          step="0.01"
          v-model.number="local.price"
          placeholder="0.00"
          class="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div class="space-y-2">
        <label class="block text-gray-700 font-medium">สต็อก *</label>
        <input
          type="number"
          v-model.number="local.stock"
          placeholder="จำนวน"
          class="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    </div>

    <div class="space-y-2">
      <label class="block text-gray-700 font-medium">หมวดหมู่ *</label>
      <select
        v-model="local.categoryId"
        class="w-full border border-gray-300 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="" disabled>-- เลือกหมวดหมู่ --</option>
        <option v-for="c in categories" :key="c._id" :value="c._id">
          {{ c.name }}
        </option>
      </select>
    </div>

    <div class="space-y-2">
      <label class="block text-gray-700 font-medium">คำอธิบาย</label>
      <textarea
        v-model.trim="local.description"
        rows="3"
        placeholder="รายละเอียดเพิ่มเติมของสินค้า (ไม่จำเป็น)"
        class="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      ></textarea>
    </div>

    <div class="flex justify-end gap-3 pt-4">
      <button
        type="button"
        class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        @click="
          local.name = '';
          local.price = 0;
          local.stock = 0;
          local.description = '';
          local.categoryId = '';
          emit('update:modelValue', null);
        "
      >
     ยกเลิก
      </button>

      <button
        type="submit"
        class="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        บันทึก
      </button>
    </div>
  </form>
</template>
