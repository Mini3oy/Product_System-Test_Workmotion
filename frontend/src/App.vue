<script setup></script>

<template>
  <router-view />
</template>

<style>
.container {
  max-width: 960px;
  margin: 2rem auto;
  font-family: system-ui, sans-serif;
}
nav {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}
nav a.router-link-active {
  font-weight: 700;
}
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.table th,
.table td {
  border: 1px solid #ddd;
  padding: 0.5rem;
}
.actions {
  display: flex;
  gap: 0.5rem;
}
input,
select,
button,
textarea {
  padding: 0.5rem;
  margin: 0.2rem 0;
}
</style>

<style scoped></style>
