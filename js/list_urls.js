/*
 * List your favorite URLs.
 *
 * @author Robert C. Duvall
 */

// create Vue object that will communicate with HTML DOM
var app = new Vue({
    data: {
        items: []
    },

    methods: {
        // load links dynamically from separate URL in the background without reloading page
        loadItems (url) {
            // fetch is a new general purpose way to use AJAX that uses "promises"
            // - first function is called when the data is loaded
            // - second function is called when data is converted to JSON
            fetch(url).then(response => response.json())
                      .then(data => this.items = data)
                      .catch(error => console.log(error));
        }
    },

    // get links dynamically when app is ready
    mounted () {
        this.loadItems('data/nested_links.json');
    }
});

// attach Vue app to an existing DOM element
app.$mount('#app');
