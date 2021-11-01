<template>
  <div id="login">
    <h1>Acceso al sisteme Otto-Klaus</h1>
    <el-form label-width="100px" ref="form" :model="form" class="form-login">
      <el-input
        v-model="form.user"
        placeholder="Correo electrónico"
        class="user-input"
      ></el-input>
      <el-input
        class="pass-input"
        type="password"
        auto-complete="off"
        v-model="form.password"
        placeholder="Contraseña"
      ></el-input>
      <el-button
        type="primary"
        :loading="loading"
        @click="login"
        class="login-btn"
        >Ingresar</el-button
      >
    </el-form>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";

export default {
  data() {
    return {
      form: {
        user: "",
        password: "",
      },
      loading: false,
    };
  },

  methods: {
    login() {
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.user, this.form.password)
        .then(
          () => {
            this.$router.push("juguetes");
            this.loading = false;
          },
          () => {
            this.loading = false;
            this.$message({
              showClose: true,
              message: "El email o contraseña que ingresaste son incorrectas",
              type: "error",
            });
          }
        );
    },
  },
};
</script>

<style scoped>
.form-login {
  display: flex;
  flex-direction: column;
  width: 20rem;
  margin: auto;
}
#login {
  position: relative;
  transform: translateY(9rem);
}

.user-input, .login-btn, .pass-input{
    margin: 0.3rem 0;
}
</style>