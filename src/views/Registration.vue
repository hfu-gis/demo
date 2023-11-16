<template>
  <v-form ref="form" v-model="valid">
    <v-row v-if="success" align="center" justify="center">
      <v-card elevation="10">
        <v-img src="http://picsum.photos/200"
               class="white--text align-end"
               gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
          <v-card-title v-text>Registration<br/>successful</v-card-title>
        </v-img>
      </v-card>
    </v-row>
    <v-row v-else align="top" justify="center">
      <v-col cols="12" md="6">
        <v-text-field label="Nickname" v-model="userData.nickName" required maxlength="25" autocomplete="off"
                      :disabled="this.userData.isAlreadyRegistered"
                      :rules="nameRules"/>
        <v-text-field label="Password" v-model="userData.password" required maxlength="25"
                      autocomplete="current-password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="showPassword = !showPassword"
                      :rules="nameRules"
        />
        <v-text-field label="Name" v-model="userData.name" required maxlength="25" autocomplete="name"
                      :rules="nameRules"/>
        <v-text-field label="Family name" v-model="userData.familyName" required maxlength="25"
                      autocomplete="family-name"
                      :rules="nameRules"/>
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <v-text-field label="Street" v-model="userData.streetName" required
                      :rules="nameRules"/>
        <v-text-field label="No" v-model="userData.streetNr" required
                      :rules="nameRules"/>
        <v-text-field label="ZIP" v-model="userData.zipCode" required
                      :rules="nameRules"/>
        <v-text-field label="City" v-model="userData.city" required
                      :rules="nameRules"/>
        <v-select label="Country" :items="countries" v-model="userData.country" required clearable
                  :rules="selectionRules"
        />
      </v-col>
      <v-btn text outlined shaped
             @click="validate">Register
      </v-btn>

    </v-row>
  </v-form>
</template>

<script>
import db from '../db'
import {collection, getDocs, doc, getDoc, setDoc} from "firebase/firestore";

export default {
  props: {},
  data: () => ({
    success: false,
    valid: true,
    showPassword: false,
    userData: {
      nickName: '',
      password: '',
      name: '',
      familyName: '',
      streetName: '',
      streetNr: undefined,
      zipCode: '',
      city: '',
      country: '',
      isAlreadyRegistered: false
    },
    countries: [],

    nameRules: [
      value => (!!value && value.trim().length > 0) || 'Field is required',
      value => (value && value.length <= 25) || 'Field must be less than 25 characters',
    ],
    selectionRules: [
      value => !!value || 'Field is required'
    ]
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        console.debug('Validation success')
        this.register()
      }
    },

    async register() {
      this.userData.isAlreadyRegistered = true
      const docRef = doc(db, 'User', this.userData.nickName);
      await setDoc(docRef, this.userData);
    }

  },
  async created() {
    const countries = await getDocs(collection(db, "LegalCountries"));
    countries.forEach(doc => this.countries.push(doc.data().name))

    const docRef = doc(db, "User", "Artingo");
    const user = await getDoc(docRef);
    if (user.exists()) {
      this.userData = user.data()
    }
  }
}
</script>
