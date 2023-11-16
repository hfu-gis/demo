<template>
  <v-row
      align="center"
      justify="center"
  >
    <v-col
        cols="12"
        sm="8"
        md="4"
    >
      <v-card class="elevation-12">
        <v-toolbar
            color="primary"
            dark
            flat
        >
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                :value="loginUser.name"
                autocomplete="login"
            />

            <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-textbox-password"
                type="password"
                autocomplete="current-password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary"
                 @click="$emit('login', true); $router.push({name:'Overview'})">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import db from '../db'
import {doc, getDoc} from "firebase/firestore";

export default {
  props: {},
  data() {
    return {
      loginUser: {
        name: ''
      }
    }
  },
  methods: {
    login() {
      this.$emit('login', true)
    }
  },
  async created() {
    const docRef = doc(db, "User", "testUser");
    const user = await getDoc(docRef);
    if (user.exists()) {
      this.loginUser = user.data()
    }
  }
}
</script>
