<template>
    <div>
  
      <!-- Bagian kedua yaitu Book -->
      <v-container grid-list-md>
        <v-subheader>
          All Books
          <v-spacer></v-spacer>
          <!-- link ke route books yang nantinya akan kita definisikan routing dan componentnya -->
        </v-subheader>
        <v-layout row wrap>
          <!-- data buku kita tampilkan dalam dua kolom (xs6) -->
          <v-flex v-for="(book, index) in books" xs6 :key="index">
            <v-card :to="'/book/' + book.slug">
              <v-img :src="getImage('/books/' + book.cover)" height="150px">
                <v-container fill-height fluid pas-2>
                  <v-layout fil-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="title white--text text-block" v-text="book.title"></span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
              <v-card-action>
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
              </v-card-action>
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
        books: [],
        page: 0,
        lengthPage: 0,
      };
    },
    methods: {
      go() {
        let url = "/books";
        if (this.page > 0) {
          url = "/books?page=" + this.page;
        }
        axios
          .get(`${process.env.VUE_APP_BACKEND_URL}/api/v1`+ url)
          .then((response) => {
            let response_data = response.data;
            let books = response_data.data;
            this.lengthPage = response_data.meta.last_page;
            this.books = books;
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
  