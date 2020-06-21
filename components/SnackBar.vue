<template>
    <v-snackbar
      v-model="notification.visible"
      :color="notification.color"
      @input="hideSnackBar()"
    >
     {{ notification.text }}
      <v-btn
        color="primary"
        text
        @click="hideSnackBar()"
      >
        Close
      </v-btn>
    </v-snackbar>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapGetters } from "vuex";

export default {
    props: [],
    data () {
      return {
          notification: {
            text: '',
            visible: false,
            color: ''
          }
      }  
    },
    computed: {
        snackBar () {
            return this.$store.state.notifications.snackBar;
        }
    },
    watch: {
        snackBar: {
            handler(object) {
                this.notification = _.cloneDeep(object)
            },
            deep: true
        }
    }, 
    methods: {
        close () {

        },
        ...mapActions({
            hideSnackBar: "notifications/hideSnackBar"
        })
    },
    mounted () {
    }
}
</script>