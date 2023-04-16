export default {
  name: 'TheUserComponent',

  props: ['user'],

  template: `
  <section>
   <div @click="NavToHome">
      <div class="user">
        <img :src='"images/" + user.avatar' class="rounded-circle ">
        <p class="user-name">{{user.username}}</p>
      </div>
    </div> 
  </section>
  `,

  methods: {
    NavToHome() {
      //emit an event that tiggers the app to sove this user's data as the current user
      //this will save it top-level in main.js so thaat it;s accessible to the entire app
      this.$emit('setcurrentUser', this.user);


      //look at thr use's persmission level and set a route based on that
      //if it's less than 3, send them to the kid's home page
      // else send the, to the defualt home page

      //-------------easy way of doing this logic
      // let targetRoute = 'defaulthome';

      // if(this.user.permissions < 3) {
      //   targetRoute  = "kidshome";


        
      // }



      // ------------> advance way doing this logic
      //tenmary stateent s (wiers stuff likr this with a quistion mark) are shorthand if/else statement
      // the condition in brackets os evaluated; if it;s true, then the variable value is set to whatever is to the left of the colon
      //if it is faslse,then the variable value is set to whatever is to the right os the colon
      let targetRoute = (this.user.permissions <=3) ? 'kidshome' : 'defaulthome';

      this.$router.push({ name: targetRoute });

     // debugger;

    }
  }
}
