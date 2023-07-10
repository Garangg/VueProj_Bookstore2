<template>
    <v-footer
    class="bg-primary text-center d-flex flex-column"
  >
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4"
        :icon="icon"
        variant="text"
      ></v-btn>
    </div>

    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        variant="text"
        class="mx-2"
        rounded="xl"
      >
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
    export default {
        data: () => ({
            icons: [
                'mdi-youtube-play',
                'mdi-whatsapp',
                'mdi-linkedin',
                'mdi-instagram',
            ],

            links: [
                'Home',
                'About Us',
                'Team',
                'Services',
                'Contact Us',
            ]
        })
    }
</script>