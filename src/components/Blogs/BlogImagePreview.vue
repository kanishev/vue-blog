<template>
  <div class="modal" ref="modal">
    <div class="modal-content">
      <close @click="closePreview" class="icon" />
      <img :src="this.postCoverImage" alt="postCoverImage" />
    </div>
  </div>
</template>

<script>
import close from "../../assets/Icons/times-circle-light.svg";
export default {
  props: ["modalText"],
  name: "blogImage",
  components: { close },
  computed: {
    postCoverImage() {
      return this.$store.state.post.postImageURL;
    },
  },
  methods: {
    closePreview() {
      this.$emit("closeImagePreview", false);
    },
  },
};
</script>

<style lang="scss" scoped>
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

  .modal-content {
    display: flex;
    position: relative;
    justify-content: center;
    border-radius: 8px;
    max-width: 600px;
    height: 400px;
    padding: 40px 30px;
    background-color: #fff;
  }

  .icon {
    position: absolute;
    width: 24px;
    height: auto;
    cursor: pointer;
    font-size: 24px;
    top: 15px;
    right: 15px;
    color: #303030;
  }

  img {
    margin-top: 16px;
    display: block;
    width: auto;
    height: 100%;
  }
}
</style>
