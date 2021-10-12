<template>
  <div class="admin">
    <div class="container">
      <h2>Admin Page</h2>
      <div class="admin-info">
        <h2>Add Admin</h2>
        <div class="input">
          <input
            type="text"
            placeholder="Add some email"
            id="addAdmin"
            v-model="adminEmail"
          />
        </div>
        <span>{{ this.message }}</span>
        <button class="button">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      adminEmail: "",
      message: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.admin {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .admin-info {
      border-radius: 8px;
      box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.08);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      span {
        font-size: 14px;
      }

      .input {
        margin: 16px 0;

        label {
          font-size: 14px;
          display: block;
          padding-bottom: 8px;
        }

        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;

          @meida (min-width: 900px) {
          }

          &:focus {
            outline: none;
          }
        }
      }
    }

    button {
      align-self: center;
    }
  }
}
</style>
