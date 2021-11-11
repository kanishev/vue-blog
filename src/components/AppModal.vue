<template>
  <div class="modal">
    <div class="modal-content">
      <p>{{ this.modalText }}</p>
      <button @click="$emit('closeModal')">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "appModal",
  props: ["modalText"],
};
</script>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
}

p {
  text-align: center;
}
.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  width: 300px;
  padding: 40px 30px;
  background-color: #fff;
}

button {
  align-self: center;
}
</style>
