//import always go here
import UserComponent from './TheUserComponent.js';
export default {
  name: 'TheAllUsersComponent',


  template: `
  <section>
     <h2 class="who-h2">Who's is Using Roku? </h2>
     <div class="all-users">
       <user @setcurrentUser="this.$emit('setactive')" v-for="user in users" :user="user">  </user>
     </div> 
  </section>
  `,

  created() {
    //console.log('all users are ready');
    fetch('/ums/users')
       .then(res => res.json())
       .then(data => {
          console.table(data);
          //pussh the users intp vm's data object
          this.users = data;
          })
    .catch(error => console.error(error));
  },

  data() {
    return {
      users: []
    }
  },

  components: {
    user: UserComponent
  }
}