<template>
    <div>
      <v-container grid-list-md>
        <v-subheader>
           All Category
          <v-spacer></v-spacer>
        </v-subheader>
  
        <v-layout row wrap>
          <v-flex xs6 v-for="category in categories" :key="category.id">
            <v-card :to="'/category/' + category.slug">
              <v-img
                :src="getImage('/categories/' + category.image)"
                height="250px"
              >
                <v-container fill-height fluid pa-2>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span
                        class="title white--text text-block"
                        v-text="category.name"
                      ></span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>favorite</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>bookmark</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>share</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <template>
        <v-pagination
          :length="lengthPage"
          @input="go"
          v-model="page"
          :total-visible="4"
        ></v-pagination>
        
      </template>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { VPagination } from 'vuetify/lib';
  
  
  export default {
    data() {
      return {
        categories: [],
        page: 0,
        lengthPage: 0,
      };
    },
    methods: {
      go() {
        let url = "/categories";
        if (this.page > 0) {
          url = "/categories?page=" + this.page;
        }
        axios
          .get(`${process.env.VUE_APP_BACKEND_URL}/api/v1`+ url)
          .then((response) => {
            let response_data = response.data;
            let categories = response_data.data;
            this.lengthPage = response_data.meta.last_page;
            this.categories = categories;
          })
          .catch((error) => {
            let response = error.response;
            console.log(response);
          });
      },
  
      getImage (image) {
          if (image != null && image.length>0) {
            const prefix = process.env.VUE_APP_BACKEND_URL.replace('/api/v1', '')
            return `${prefix}/storage/images/${image}`
          }
          return "/img/unvaliable.jpg"
        },
    },
    created() {
      this.go();
    },
    components: {
      VPagination
    }
  };
  </script>
  
  <style scoped>
  .text-block {
    position: absolute;
    bottom: 5px;
    left: 5px;
    background-color: black;
    padding-left: 5px;
    padding-right: 5px;
    opacity: 0.7;
    width: 100%;
  }
  </style>