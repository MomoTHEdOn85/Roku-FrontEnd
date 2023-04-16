// import your modules/compoentes here
 
import LoginPage from "./components/TheLoginComponent.js";
import AllUsersPage from "./components/TheAllUsersComponent.js";
import DefaultHome from "./components/TheDefaultHomeComponent.js";
import KidsHome from "./components/TheKidsHomeComponent.js";
//import ErrorPage from "./modules/ErrorPage.js";


const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes: [ //Vue will try to mathch the following routes
            //and then render rhe appropriate component into the page 
    {
      path: '/', //the locatuon bar URL
      name: 'login', //thr name of the router (for programtic mnaviagtion)
      component: LoginPage //the component to render
    },

    {
      path: '/users', //the locatuon bar URL
      name: 'allusers', //thr name of the router (for programtic mnaviagtion)
      component: AllUsersPage //the component to render
    },

    {
      path: '/defaulthome', //the locatuon bar URL
      name: 'defaulthome', //thr name of the router (for programtic mnaviagtion)
      component: DefaultHome //the component to render
    },

    {
      path: '/kidshome', //the locatuon bar URL
      name: 'kidshome', //thr name of the router (for programtic mnaviagtion)
      component: KidsHome //the component to render
    }



     
  ] // short for `routes: routes`
})

// 5. Create and mount the root instance.
const app = Vue.createApp({
  mounted(){
    //check to seeis the user has already logged in
    //if they have , push them to all user route
    if (window.localStorage.getItem('user')) {
      this.authenticated = true;
      this.$router.push({name: 'allusers'});
    }
  },

  data() {
    return {
       authenticated: false,
       // save the  current user so that we can acess this data later
       currentUser: {},
       kids:[]
    }
  },

  methods: {
    setAuth() {
      this.authenticated = true;
    },

    logOut() {
      //swithc of controls that shoultdn't be visible
      this.authenticated = false;
      this.currentUser = {};

      //remove the user from the localstorage
      window.localStorage.removeItem('user');

      //push the user back to login page
      this.$router.push({name: 'login'});
    },

    changeUser() {
      //push the user back to all user page
      this.$router.push({name: 'allusers'});
    },

    setCurrentUser(user) {
      //recieve the user data from the user's panel in the alluserscompoenet
      // save ithere so taht we can re-eject it into the user's homePage
      this.currentUser = user;
    }
  }
   
})
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router);

app.mount('#app')

// Now the app has started!