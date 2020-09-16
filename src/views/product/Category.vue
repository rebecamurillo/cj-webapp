<template>
    <v-card class="d-flex flex-row" color="grey lighten-2" flat tile >
      <v-card class="pa-2" outlined tile width="50%">
        <h2>Nueva categoria</h2>
        <v-col >
          <v-form>
            <v-text-field
                v-model="categoryData.name"
                name="Category"
                type="text"
                label="Categoria"
                outlined
            ></v-text-field>
            <v-text-field
                v-model="categoryData.description"
                name="description"
                type="text"
                label="Descripcion"
                outlined
            ></v-text-field>
            <v-select v-model="categoryData.parentId" :items="categoryList" label="Categoria superior" outlined
            item-value='id'
            item-text='namewithspaces' dense>
            </v-select>
            <v-btn color="accent" v-on:click="createCategory()">Agregar</v-btn>
          </v-form>
        </v-col>
        <span style="color:green;"> {{msgSuccess1}} </span>
        <span style="color:red;"> {{msgError1}} </span>

      </v-card>

      <v-card class="d-flex pa-2" outlined tile width="50%">
        <v-col>
          <h2>Lista de categorias</h2>

          <v-data-table
            v-model="selectedLines"
            :headers="tableHeaders"
            :items="categoryList"
            item-key="id"
            show-select
            class="elevation-1"
            :expanded.sync="expanded"
            :show-expand="true"
            :single-expand="true"
          >
            <template v-slot:expanded-item="{ headers,item}">
              <td :colspan="headers.length">
                <v-form class="d-flex flex-row">
                  <v-text-field
                  v-model="categoryDataToUpdate.name"
                      :ref="item.id+'-name'"
                      :placeholder="item.name"
                      label="Categoria"
                      outlined dense
                  ></v-text-field>
                  <v-text-field
                  v-model="categoryDataToUpdate.description"
                      :ref="item.id+'-desc'"
                      :placeholder="item.description"
                      type="text"
                      label="Descripcion"
                      outlined dense
                  ></v-text-field>
                  <v-btn color="accent" @click.prevent="updateCategory(item.id,item.id+'-name',item.id+'-desc')">Modificar</v-btn>
                </v-form>
                <span style="color:green;"> {{msgSuccess3}}</span>
                <br>
                <span style="color:red;"> {{msgError3}}</span>
              </td>
            </template>
          </v-data-table>
          <br>
          <v-btn color="accent" v-on:click="deleteSelectedCategorys()">Eliminar</v-btn>
          <br>
          <span style="color:green;"> {{msgSuccess2}} </span>
          <br>
          <span style="color:red;"> {{msgError2}} </span>
        </v-col>
      </v-card>
    </v-card>
</template>
<style>


</style>
<script>
import Vue from 'vue';
import { postCategory,getCategorysSorted,deleteCategorys,updateCategoryById } from '../../modules/category/category.service';

export default Vue.extend({
  data() {
    return {
      expanded: [],
      msgSuccess1: '',
      msgError1: '',
      msgSuccess2: '',
      msgError2: '',
      msgSuccess3: '',
      msgError3: '',
      categoryData: {
        name:'',
        description:'',
        parentId:0
      },
      categoryDataToUpdate: {
        name:'',
        description:''
      },
      selectedLines: [],
      tableHeaders: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'namewithspaces',
        },
        { text: 'Descripcion', value: 'description' }
      ],
      categoryList: []
    }
  },
  mounted() {
    this.updateCategorysSorted();  
  },
  methods: {
    createCategory(){
      this.msgSuccess1 = '';
      this.msgError1= '';
      postCategory(this.categoryData).then(res=>{
        if (res.data){
          this.msgSuccess1 = 'La categoria ha sido creada.'
          this.categoryData.name='';
          this.categoryData.description='';
          this.categoryData.parentId=0;
          this.updateCategorysSorted();
        }else if (res.error){
          this.msgError1 = 'Error en el envio de la categoria.'
        }
      });
    },
    updateCategory(id,nameref,descref){
      this.msgSuccess3 = '';
      this.msgError3= '';
      updateCategoryById(id,this.categoryDataToUpdate).then(res=>{
        if (res.data){
          this.msgSuccess3 = 'La categoria ha sido modificada.'
        }else if (res.error){
          this.msgError3 = 'Error en la modificacion de la categoria.'
        }
         this.categoryDataToUpdate.name='';
         this.categoryDataToUpdate.description='';
         this.updateCategorysSorted();
      });
    },
    updateCategorysSorted(){
      getCategorysSorted().then(res=>{
        if (res.data){
          this.categoryList = res.data;
        }else if (res.error){
          this.msgError1 = 'Error en el envio de la categoria.'
        }
      });
    },
    deleteSelectedCategorys(){
      this.msgSuccess2 = '';
      this.msgError2= '';
      deleteCategorys(this.selectedLines).then(res=>{
        if(res.data){
          if(res.data.successData.length > 0){
            this.msgSuccess2 = res.data.successData.length+' categorias han sido eliminadas correctamente.';
          }
        }

        if(res.error){
          if(res.error.errorData.length > 0){
            this.msgError2 = res.error.errorData.length+' categorias en error. No han sido eliminadas.';
          }
        }
        this.selectedLines = [];
        this.updateCategorysSorted();
      });
      
    }
  }
})
</script>