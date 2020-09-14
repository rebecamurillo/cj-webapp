<template>
    <v-card class="d-flex flex-row" color="grey lighten-2" flat tile >
      <v-card class="pa-2" outlined tile width="50%">
        <h2>Nueva categoria</h2>
        <v-col >
          <v-form>
            <v-text-field
                v-model="classificationData.name"
                name="classification"
                type="text"
                label="Categoria"
                outlined
            ></v-text-field>
            <v-text-field
                v-model="classificationData.description"
                name="description"
                type="text"
                label="Descripcion"
                outlined
            ></v-text-field>
            <v-select v-model="classificationData.parentId" :items="classificationList" label="Categoria superior" outlined
            item-value='id'
            item-text='namewithspaces' dense>
            </v-select>
            <v-btn color="accent" v-on:click="createClassification()">Agregar</v-btn>
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
            :items="classificationList"
            item-key="id"
            show-select
            class="elevation-1"
          >
          </v-data-table>
          <br>
          <v-btn color="accent" v-on:click="deleteSelectedClassifications()">Eliminar</v-btn>
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
import { postClassification,getClassificationsSorted,deleteClassificationById,deleteClassifications } from '../../modules/classification/classification.service';

export default Vue.extend({
  data() {
    return {
      msgSuccess1: '',
      msgError1: '',
      msgSuccess2: '',
      msgError2: '',
      classificationData: {
        name:'',
        description:'',
        parentId:0
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
      classificationList: []
    }
  },
  mounted() {
    this.updateClassificationsSorted();  
  },
  methods: {
    createClassification(){
      this.msgSuccess1 = '';
      this.msgError1= '';
      postClassification(this.classificationData).then(res=>{
        if (res.data){
          this.msgSuccess1 = 'La categoria ha sido creada.'
          this.classificationData.name='';
          this.classificationData.description='';
          this.classificationData.parentId=0;
          this.updateClassificationsSorted();
        }else if (res.error){
          this.msgError1 = 'Error en el envio de la categoria.'
        }
      });
    },
    updateClassificationsSorted(){
      getClassificationsSorted().then(res=>{
        if (res.data){
          this.classificationList = res.data;
        }else if (res.error){
          this.msgError1 = 'Error en el envio de la categoria.'
        }
      });
    },
    deleteSelectedClassificationsOLD(){
      const successData = [];
      const errorData = [];
      this.selectedLines.forEach(data => {
        deleteClassificationById(data.id).then(res=>{
          if (res.data){
            successData.push(data);
          }else if (res.error){
            errorData.push(data);
          }
          if(successData.length > 0){
            this.msgSuccess2 = successData.length+' categorias han sido eliminadas correctamente.';
          }
          if(errorData.length > 0){
            this.msgError2 = errorData.length+' categorias en error. No han sido eliminadas.';
          }

          this.updateClassificationsSorted();
        });
      });
      
    },

    deleteSelectedClassifications(){
      this.msgSuccess2 = '';
      this.msgError2= '';
      deleteClassifications(this.selectedLines).then(res=>{
        console.log(res);
        console.log(res.data);
        console.log(res.data.successData);
        console.log(res.data.successData.length);
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
        this.updateClassificationsSorted();
      });
      
    }
  }
})
</script>