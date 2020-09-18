<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4" >
            <v-card class="pa-2" outlined tile >
                <h2>Nuevo producto</h2>
                <v-col >
                <v-form>
                    <v-text-field
                        v-model="productData.name"
                        name="Category"
                        type="text"
                        label="Producto"
                        outlined 
                        :error="productError"
                    ></v-text-field>
                    <v-text-field
                        v-model="productData.description"
                        name="description"
                        type="text"
                        label="Descripcion"
                        outlined
                    ></v-text-field>
                    <v-select v-model="productData.categoryId" :items="categoryList" label="Categoria superior" outlined
                    item-value='id'
                    item-text='namewithspaces' dense>
                    </v-select>
                    <v-btn color="accent" v-on:click="createProduct()">Agregar</v-btn>
                </v-form>
                </v-col>
                <span style="color:green;"> {{msgSuccess}} </span>
                <span style="color:red;"> {{msgError}} </span>

            </v-card>
        </v-col>
    </v-row>
</template>
<style>


</style>
<script>
import Vue from 'vue';
import { postCategory,getCategorysSorted,deleteCategorys,updateCategoryById } from '../../modules/category/category.service';
import {ProductInput} from '@/modules/product/product.model.ts';

export default Vue.extend({
  data() {
    return {
      msgSuccess: '',
      msgError: '',
      productError: false,
      productData: {
          id: null,
          barcode: '',
          name: '',
          description: '',
          priceNet: null,
          priceGross: null,
          categoryId: null
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
    resetProduct(){
        this.productData.id= null;
        this.productData.barcode= '';
        this.productData.name= '';
        this.productData.description= '';
        this.productData.priceNet= null;
        this.productData.priceGross= null;
        this.productData.categoryId= null;
    },
    createProduct(){
      this.msgSuccess = '';
      this.msgError= '';
      if (this.productData.name === ''){
        this.productError = true;
        this.msgError= 'La informacion es necesaria';
      }
      else {
        this.productError = false; 
      }

      console.log('this.productData');
      console.log(this.productData);
    //   postCategory(this.categoryData).then(res=>{
    //     if (res.data){
    //       this.msgSuccess1 = 'La categoria ha sido creada.'
    //       this.categoryData.name='';
    //       this.categoryData.description='';
    //       this.categoryData.parentId=0;
    //       this.updateCategorysSorted();
    //     }else if (res.error){
    //       this.msgError1 = 'Error en el envio de la categoria.'
    //     }
    //   });
    },
    
    updateCategorys(){
    //   getCategorysSorted().then(res=>{
    //     if (res.data){
    //       this.categoryList = res.data;
    //     }else if (res.error){
    //       this.msgError1 = 'Error en el envio de la categoria.'
    //     }
    //   });
    },
    updateSuppliers(){
        console.log('updateSuppliers()');
    },
    updateBrands(){
        console.log('updateBrands()');
    },
    updateAttributes(){
        console.log('updateAttributes()');
    },
    createSupplier(){
        console.log('createSupplier()');
    },
    createBrands(){
        console.log('createBrands()');
    },
    createAttribute(){
        console.log('createAttribute()');
    },
    updateCategorysSorted(){
      getCategorysSorted().then(res=>{
        if (res.data){
          this.categoryList = res.data;
        }else if (res.error){
          this.msgError = 'Error en el envio de la categoria.'
        }
      });
    }
  }
})
</script>