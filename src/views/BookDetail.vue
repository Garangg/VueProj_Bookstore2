<template>
    <div class="about">
        <v-container>
            <v-subheader class="title">{{ book.title }}</v-subheader>
            <v-img v-if="book.cover" :src="getImage('/books/' + book.cover)" height="20px"></v-img>
            <v-subheader>Information</v-subheader>
            <table class="v-data-table">
                <tbody>
                    <tr>
                        <th class="text-xs-left">Author</th><td>{{ book.author }}</td>
                    </tr>
                    <tr>
                        <th class="text-xs-left">Publisher</th><td>{{ book.publisher }}</td>     
                    </tr>
                    <tr>
                        <th class="text-xs-left">Price</th><td v-if="book.price">Rp. {{ book.price.toLocaleString('id-ID') }}</td>   
                    </tr>
                    <tr>
                        <th class="text-xs-left">Weight</th><td>{{ book.weight }}</td>
                    </tr>
                    <tr>
                        <th class="text-xs-left">Stock</th><td>{{ book.stock }}</td>
                    </tr>
                    <tr>
                        <th class="text-xs-left">Categories</th>
                        <td>
                            <template v-for="category in book.categories">
                                {{ category.name }},
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
            <v-subheader>Description</v-subheader>
            <p class="body-2">{{ book.description }}</p>
            <div style="position:relative">
                <v-btn block color="success" @click="buy" :disabled="book.stock==0">
                    <v-icon>save_alt</v-icon>&nbsp;BUY
                </v-btn>
            </div>
        </v-container>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
    export default{
        data(){
            return{
                book: {},
            }
        },
        methods: {
            ...mapActions({
                addCart:'cart/add',
                setAlert : 'alert/set',
            }),
            buy(){
                this.addCart(this.book)
                this.setAlert({
                    status : true,
                    text : 'Added to cart',
                    type : 'succes',
                })
            }
        },
        created(){
            let slug = this.$route.params.slug
            let url = '/api/v1/books/slug/' + slug;
            axios
            .get(`${process.env.VUE_APP_BACKEND_URL}` + url)
            .then((response)=>{
                let book = response.data.data
                this.book = book
                console.log(book, 'data')
            })
            .catch((error)=>{
                let response = error.response
                console.log(response)
            })
        }
    }
</script>