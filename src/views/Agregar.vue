<template>
  <div id="add">
    <h1>Agregar Juguete</h1>
    <el-form label-width="100px" class="form-add">
      <el-form-item label="Código">
        <el-input v-model="formAgregar.codigo"></el-input>
      </el-form-item>
      <el-form-item label="Nombre">
        <el-input v-model="formAgregar.nombre"></el-input>
      </el-form-item>
      <el-form-item label="Stock">
        <el-input v-model="formAgregar.stock"></el-input>
      </el-form-item>
      <el-form-item label="Precio">
        <el-input v-model="formAgregar.precio"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="volverBtn">Volver</el-button>
        <el-button type="primary" @click="agregar(formAgregar)"
          >Agregar</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      formAgregar: {
        codigo: "",
        nombre: "",
        stock: "",
        precio: "",
      },
    };
  },

  methods:{
      ...mapActions(['agregarJuguete']),
      agregar(juguete){
          this.agregarJuguete(juguete);
          const options = {type: "success", message:"Juguete agregado con éxito"};

          this.$message( {...options} );
          this.$router.push( { name:'juguetes' } );
      },

      volverBtn(){
        this.$router.push( { name:'juguetes' } );
      },
  }, 
};
</script>

<style scoped>
  .form-add{
    width: 30rem;
    display: flex;
    flex-direction: column;
    margin: 4rem auto;
  }
  #add{
   font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
</style>

