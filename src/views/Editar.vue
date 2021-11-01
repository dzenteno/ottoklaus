<template>
  <div>
    <h1>Editar Juguete</h1>
    <el-form label-width="100px" ref="formEditar" :model="formEditar" class="form-edit">
      <el-form-item label="Código">
        <el-input v-model="formEditar.codigo" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="Nombre">
        <el-input v-model="formEditar.nombre"></el-input>
      </el-form-item>
      <el-form-item label="Stock">
        <el-input v-model="formEditar.stock"></el-input>
      </el-form-item>
      <el-form-item label="Precio">
        <el-input v-model="formEditar.precio"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="volver">Volver</el-button>
        <el-button type="primary" @click="dialogActualizar">Actualizar Juguete</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["juguete"],
  data() {
    return {
      formEditar: {
        codigo: "",
        nombre: "",
        stock: "",
        precio: "",
      },
    };
  },

  mounted(){
      this.formEditar = this.juguete.data;
  },

  methods: {
    ...mapActions(["actualizarJuguete"]),

    dialogActualizar() {
      this.$confirm(
        "Actualizará el juguete seleccionado. Desea continuar?",
        "Warning",
        {
          confirmButtonText: "Actualizar",
          cancelButtonText: "Cancelar",
          type: "warning",
        }
      )
      .then(async () => {
        const juguete = this.formEditar;
        const id = this.juguete.id;
        await this.actualizarJuguete({ juguete, id });
        const options = {
          type: "success",
          message: "Juguete actualizado",
        };
        this.$message({ ...options });
        this.$router.push({name: 'juguetes'});
      })
      .catch( () => {
          this.$message({
              type: 'info',
              message: 'Acción cancelada'
          });
      });
    },

    volver(){
        this.$router.push({name: 'juguetes'});
    }
  },
};
</script>

<style scoped>
</style>
