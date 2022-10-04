<template>
  <div>
    <span class="loader"></span>
  </div>
</template>

<script>
export default {
  name: "PaginaCarregando",
};
</script>

<style scoped>
.loader {
  box-sizing: border-box;
  position: relative;
  width: 48px;
  height: 80px;
  animation: spin 1s linear infinite;
}
.loader:after,
.loader:before {
  content: "";
  width: 32px;
  height: 32px;
  position: absolute;
  border-radius: 50%;
  background: #87f;
  animation: spin 1s linear infinite;
  transform-origin: 0px 100%;
}
.loader:before {
  transform-origin: 0 50%;
  background: #e80;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
