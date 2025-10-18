<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({ modelValue: Object });
const emit = defineEmits(["update:modelValue", "submit"]);
const local = ref({ name: "", description: "" });

watchEffect(() => {
  local.value = {
    name: props.modelValue?.name || "",
    description: props.modelValue?.description || "",
  };
});

const onSubmit = () => {
  if (!local.value.name?.trim()) {
    alert("⚠️ กรุณากรอกชื่อหมวดหมู่");
    return;
  }
  emit("submit", { ...local.value });
};
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto my-6 space-y-5 border border-gray-200"
  >
    <h2 class="text-2xl font-semibold text-gray-800 text-center">
      {{ props.modelValue ? "แก้ไขหมวดหมู่" : "เพิ่มหมวดหมู่ใหม่" }}
    </h2>


    <div class="space-y-2">
      <label class="block text-gray-700 font-medium">
        ชื่อหมวดหมู่ <span class="text-red-500">*</span>
      </label>
      <input
        v-model.trim="local.name"
        type="text"
        placeholder="เช่น เครื่องใช้ไฟฟ้า"
        class="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>


    <div class="space-y-2">
      <label class="block text-gray-700 font-medium">คำอธิบาย</label>
      <textarea
        v-model.trim="local.description"
        rows="3"
        placeholder="รายละเอียดเพิ่มเติม (ไม่จำเป็น)"
        class="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      ></textarea>
    </div>

    <div class="flex justify-end gap-3 pt-4">
      <button
        type="button"
        class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        @click="local.name=''; local.description=''; emit('update:modelValue', null)"
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
