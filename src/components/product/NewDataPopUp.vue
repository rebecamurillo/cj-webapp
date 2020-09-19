<template>
<v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs"
              v-on="on">
              <v-icon>mdi-pencil-plus-outline</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="productData.name" label="Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="productData.name" label="Calories"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'NewDataPopUp',

props: ['formTitle'],
    data: () => ({
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
      }
    }),
    methods: {
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