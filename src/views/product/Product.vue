<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4" >
            <v-card class="pa-2" outlined tile >
                <h2>Nuevo producto</h2>
                <v-col >
                <v-form>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="productData.name"
                        name="Category"
                        type="text"
                        label="Producto"
                        outlined 
                        :error="productError"
                        dense
                    ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                          v-model="productData.description"
                          name="description"
                          type="text"
                          label="Descripcion"
                          outlined dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                          v-model="productData.priceNet"
                          name="priceNet"
                          type="number"
                          label="Precio neto"
                          prefix="$"
                          outlined dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                          v-model="productData.priceGross"
                          name="priceGross"
                          type="number"
                          label="Precio bruto"
                          prefix="$"
                          outlined dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-select v-model="productData.categoryId" :items="categoryList" label="Categoria superior" outlined
                      item-value='id'
                      item-text='namewithspaces' dense>
                      </v-select>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="10">
                    <v-select v-model="productData.brandId" :items="brandList" label="Marca" outlined
                      item-value='id'
                      item-text='namewithspaces' dense>
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="2">
                      <NewDataPopUp formTitle="Agregar nueva marca" objectToCreate="brand"/>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="10">
                      <v-select v-model="productData.supplierId" :items="supplierList" label="Proveedor" outlined
                      item-value='id'
                      item-text='namewithspaces' dense>
                      </v-select> 
                    </v-col>
                    <v-col cols="12" sm="2">
                      <NewDataPopUp formTitle="Agregar nueva marca" objectToCreate="brand"/>
                    </v-col>
                  </v-row>
                  
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
import NewDataPopUp from '@/components/product/NewDataPopUp.vue'
import { postCategory,getCategorysSorted,deleteCategorys,updateCategoryById } from '../../modules/category/category.service';
import { ProductInput } from '@/modules/product/product.model.ts';
import { getBrands } from '@/modules/brand/brand.service';
import { getSuppliers } from '@/modules/supplier/supplier.service';
import { getAttributes } from '@/modules/attribute/attribute.service';

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
          categoryId: null,
          brandId:null,
          supplierId:null
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
      categoryList: [],
      brandList: [],
      supplierList: [],
      attributeList: []
    }
  },
  components: {
    NewDataPopUp
  },
  mounted() {
    this.updateCategorys(); 
    this.updateSuppliers();
    this.updateBrands();
    this.updateAttributes(); 
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
      console.log('updateCategorys()');
      getCategorysSorted().then(res=>{
        if (res.data){
          this.categoryList = res.data;
        }else if (res.error){
          this.msgError = 'Error en el envio de la categoria.'
        }
      });
    },
    updateSuppliers(){
      console.log('updateSuppliers()');
      getSuppliers().then(res => {
        console.log(res);
        if (res.data){
          this.supplierList = res.data;
        }else if (res.error){
          console.log(res.error);
        }
      });
    },
    updateBrands(){
      console.log('updateBrands()');
      getBrands().then(res => {
        console.log(res);
        if (res.data){
          this.brandList = res.data;
        }else if (res.error){
          console.log(res.error);
        }
      });
    },
    updateAttributes(){
      console.log('updateAttributes()');
      getAttributes().then(res => {
        console.log(res);
        if (res.data){
          this.attributeList = res.data;
        }else if (res.error){
          console.log(res.error);
        }
      });
    },
    createSupplier(){
        console.log('createSupplier()');
    },
    createBrands(){
        console.log('createBrands()');
    },
    createAttribute(){
        console.log('createAttribute()');
    }
  }
})
</script>