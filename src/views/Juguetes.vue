<template>
  <div>
    <el-row id="log-out-btn">
      <el-button type="danger" @click="cerrarSesion()">Salir</el-button>
    </el-row>
    <h1>Bienvenido a Otto Klaus</h1>
    <el-button
      type="primary"
      icon="el-icon-plus"
      circle
      @click="agregar"
    ></el-button>
    <div id="table">
      <el-table :data="juguetesConStock" style="width: 100%">
        <el-table-column fixed prop="data.codigo" label="Código" width="150">
        </el-table-column>
        <el-table-column prop="data.nombre" label="Nombre" width="120">
        </el-table-column>
        <el-table-column prop="data.stock" label="Stock" width="120">
        </el-table-column>
        <el-table-column prop="data.precio" label="Precio" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="Operaciones" width="120">
          <template slot-scope="scope">
            <el-button
              style="color: red"
              type="text"
              size="small"
              @click="dialogEliminar(juguetesConStock[scope.$index].id)"
              >Eliminar</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="editar(juguetesConStock[scope.$index])"
              >Editar</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase/compat/app";

export default {
  mounted() {
    this.getJuguetes();
  },

  methods: {
    ...mapActions(["getJuguetes", "eliminarJuguete"]),

    agregar() {
      this.$router.push({ name: "agregar" });
    },

    editar(juguete) {
      this.$router.push({ name: "editar", params: { juguete: juguete } });
    },

    dialogEliminar(jugueteID) {
      this.$confirm(
        "Eliminará el juguete seleccionado. Desea continuar?",
        "Warning",
        {
          confirmButtonText: "Eliminar",
          cancelButtonText: "Cancelar",
          type: "warning",
        }
      )
        .then(async () => {
          await this.eliminarJuguete(jugueteID);
          const options = {
            type: "success",
            message: "Juguete eliminado",
          };
          this.$message({ ...options });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Acción cancelada",
          });
        });
    },

    cerrarSesion() {
      firebase
        .auth()
        .signOut()
        .then(
          () => {
            this.$router.push({ name: "login" });
          },
          () => {
            this.$message({
              showClose: true,
              message: "Error al cerrar",
              type: "error",
            });
          }
        );
    },
  },

  computed: {
    ...mapGetters(["juguetesConStock"]),
  },
};
</script>

<style scoped>
#table {
  margin: auto;
  width: 60%;
}

#log-out-btn {
  display: flex;
  justify-content: flex-end;
}
</style>