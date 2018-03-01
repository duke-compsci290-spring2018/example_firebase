/*
 * Add to list of your favorite URLs.
 *
 * @author Robert C. Duvall
 */

// set up for Firebase
var config = {
    apiKey: "AIzaSyDIlqyi47m8Aj51tZmszdGjABDvOqY8EPw",
    authDomain: "vue-list-urls.firebaseapp.com",
    databaseURL: "https://vue-list-urls.firebaseio.com",
    projectId: "vue-list-urls",
    storageBucket: "vue-list-urls.appspot.com",
    messagingSenderId: "576087987271"
};
// global access to initialized app database
var db = firebase.initializeApp(config).database();
// global reference to remote data
var itemsRef = db.ref('items');
// connect Firebase to Vue
Vue.use(VueFire);

// create Vue object that will communicate with HTML DOM
var app = new Vue({
    data: {
        // state to keep track of local editted contents
        newLinkText: '',
        newLinkURL: ''
    },

    firebase: {
        items: itemsRef
    },

    methods: {
        // add newly entered link to the given item if it exists
        addLink (item) {
            // make sure something has been entered into the form
            if (this.newLinkText && this.newLinkURL) {
                // add new link to the links field of the given item
                itemsRef.child(item['.key']).child('links').push({
                    name: this.newLinkText,
                    url: this.newLinkURL
                });
                this.resetAddLink(item);
            }
        },

        // clear input form to prepare for the next entry
        resetAddLink (item) {
            this.newLinkText = '';
            this.newLinkURL = '';
            item.isAddingLink = false;
        }
    }
});

// attach Vue app to an existing DOM element
app.$mount('#app');
