<template>
  <div>
    <!-- Bagian pertama yaitu category -->
    <v-container grid-list-md>
      <v-subheader>
        Random category
        <v-space></v-space>
        <!-- Link ke route categories yang nantinya akan kita definisikan
          routing dan component nya -->
          <v-spacer></v-spacer>
        <router-link to="/categories">See all</router-link>
      </v-subheader>
      <v-layout row wrap>
        <!-- variabel categories ini akan kita isi dengan data dari endpoint category -->
        <v-flex v-for="category in categories" xs6 :key="category.id">
          <v-card :to="'/category/' + category.slug">
            <!-- untuk load image supaya lebih rapih akan kita buatkan method
            getImage -->
            <v-img :src="getImage('categories/'+ category.image)" height="150px">
              <v-container fill-height fluid pa-2>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <!-- nama category-nya akan ditampilkan disini -->
                    <span class="title white--text text-block" v-text="category.name"></span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>

            <!-- icon dummy saja -->
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

    <!-- Bagian kedua yaitu Book -->
    <v-container grid-list-md>
      <v-subheader>
        Top Books
        <v-spacer></v-spacer>
        <!-- link ke route books yang nantinya akan kita definisikan routing dan componentnya -->
        <router-link to="/books">See All</router-link>
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
  </div>
</template>

<style scoped>
    /* Mengatur posisi judul */
    .text-block{
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

<script>
  import axios from 'axios';
  export default {
    data: () => ({
      categories: [],
      books: []
    }),
    methods: {
      getImage(image){
        if(image!=null && image.length>0){
          const prefix =  process.env.VUE_APP_BACKEND_URL.replace('/api/v1', '')
          return `${prefix}/storage/images/${image}`
          // return process.env.VUE_APP_BACKEND_URL+"/images"+image
        }
        return "/img/unavailable.jpg"
      },
    },
    created(){
      let count = 4
      console.log(process.env.VUE_APP_BACKEND_URL)
      axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/api/v1/categories/random/`+ count)
      .then((response) => {
        let categories = response.data.data
        this.categories = categories;
        console.log(this.categories);
      })
      .catch((error) => {
        let response = error.response
        console.log(response)
      })
      count = 8
      this.axios.get('/api/v1/books/top/'+count)
      .then((response) => {
        let books = response.data.data
        this.books = books
      })
      .catch((error) => {
        let responses = error.response
        console.log(responses)
      })
    }
  }
</script>
