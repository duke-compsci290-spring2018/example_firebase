/*
 * Simple example of uploading and displaying images using Vue and Firebase.
 *
 * @author Robert C. Duvall
 */

// set up for Firebase
var config = {
    apiKey: "AIzaSyDwYs_gF9V2L9tKvvxlNIVGytRgqu_jbTc",
    authDomain: "vue-images.firebaseapp.com",
    databaseURL: "https://vue-images.firebaseio.com",
    projectId: "vue-images",
    storageBucket: "vue-images.appspot.com",
    messagingSenderId: "399709935766"
};

// global access to initialized app database
var db = firebase.initializeApp(config).database();
// global reference to remote storage
var storageRef = firebase.storage().ref();
// global reference to remote data
var imagesRef = db.ref('images');
// connect Firebase to Vue
Vue.use(VueFire);
// app Vue instance
var app = new Vue({
    // app initial state
    data: {
        // user entered data, managed locally before adding to database
        newImageTitle: ''
    },

    // local representations of firebase data
    firebase: {
        images: imagesRef
    },

    computed: {
        // get images in reverse order added
        reversedImages () {
            return this.images.slice().reverse();
        }
    },

    methods: {
        // get image selected by user and upload it to Firebase for storage
        storeImage (event) {
            // get input element user used to select local image
            var input = document.getElementById('files');
            // have all fields in the form been completed
            if (this.newImageTitle && input.files.length > 0) {
                var file = input.files[0];
                // get reference to a storage location and
                storageRef.child('images/' + file.name)
                          .put(file)
                          .then(snapshot => this.addImage(this.newImageTitle, snapshot.downloadURL));
                // reset input values so user knows to input new data
                input.value = '';
            }
        },

        addImage (title, url) {
            // now that image has been stored in Firebase, create a reference to it in database
            imagesRef.push({
                title: title,
                url: url
            });
            // reset input values so user knows to input new data
            this.newImageTitle = '';
        }
    }
});


// mount Vue app within specific HTML element
app.$mount('#app')
