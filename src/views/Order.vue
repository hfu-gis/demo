<template>
  <v-row>
    <v-col class="col-md-4" v-for="(item,index) in products" :key="index">
      <v-card elevation="10">
        <v-img
            :src="'http://picsum.photos/140?random='+index"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="140"
        >
          <v-card-title v-text="item.description"/>
        </v-img>

        <v-card-actions>
          <v-spacer/>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-bookmark</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import db from '../db'
import {collection, getDocs} from "firebase/firestore";

export default {
// gebt jeder Page einen eigenen Namen
  name: 'Order',

// benötigte Komponenten
  components: {},

// entspricht den HTML-Attributen
  props: {},

// Variablen-Speicher
  data() {
    return {
      products: [],
      name: {
        type: String
      },
      price: {
        type: Number
      }
    }
  },

// reagieren auf prop-Veränderung
  watch: {},

// interne Methoden
  methods: {
    addToCatolog(id) {
      let docRef = db.collection('Products').doc(id)
      docRef.set({
        name: this.name,
        price: this.price
      })
    }
  },


// Initialisierung
  async created() {
    const productsFromDB = await getDocs(collection(db, "Products"));
    productsFromDB.forEach(doc => {
      this.products.push(doc.data())
    })
  }
}
</script>

<style scoped>
/* CSS für diese Seite hier einfügen */
</style>
