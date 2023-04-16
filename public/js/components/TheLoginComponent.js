export default {
  name: 'TheLoginComponent',

  template: `
  <section class="logcontainer">
    <img class="logo" src="images/RokuF-Logo.svg"   alt="Roku logo"><span></span>
    <div class="jumbotron">
        <h1>Welcome to Roku Flashblack!</h1>
        <p class="lead">
        Before revisiting your favourite movies, tv shows or music from yesteryear, please log in with a valid username and password.
        </p>
    </div>

    <section class="log-in">
      <label class="sr-only" for="inlineFormInputName">Name</label>
      <input ref="username" v-model="username" type="text" class="form-control" id="inlineFormInputName" placeholder="Username" required>

      <label class="sr-only" for="inlineFormPassword">Name</label>
      <input ref="password" v-model="password" type="password" class="form-control" id="inlineFormPassword" placeholder="Password" required>
    </section>

    <button class="btn-lo"
        @click="tryLogIn"
        type="submit" 
        class="login-submit"
      ><p class="login-btn">LOGIN</p>
    </button>

     <button v-if="signup" class="btn-lo"
        @click="trySignUp"
        type="submit" 
        class="login-submit"
      ><p class="login-btn">SIGNUP</p>
    </button>
  </section>
  `,

  data() {
    return {
      username: '',
      password: '',
      signup: false
    }
  },

  methods: {
    trySignUp() {
      debugger;
    },

    tryLogIn() {
      //debugger;
      //sanitize our inputs, make sure they are not empty
      //.trim() methods strips down the white space
      if (this.username.trim().length == 0) {
        console.log('username is empty');
        this.$refs['username'].classList.add('errorfield');
        return; //exits the logIn function
      }
      if (this.password.trim().length == 0) {
        console.log('password is empty');
        this.$refs['password'].classList.add('errorfield');
        return; //exits the logIn function
      }  //End input validation

     this.$refs['username'].classList.remove('errorfield');
     this.$refs['password'].classList.remove('errorfield');


    

      let userData = {
        username: this.username,
        password: this.password
      }

      fetch('/ums/login', {
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type': 'application/json' 

        },
        body: JSON.stringify(userData)
      })

      .then(res => res.json())
      .then(data => {
        console.log(data);
        //check for no user and then present a sogn up control of some kind
        if(data.message == "no user") {
          //turn the signup button in the template, set some kind of data to control its apperance  in the UI, add a new route to post a suer to the databasr => sign up for Roku
          this.signup = true;
        }
        //check for a borken password 
        //if it's broken, mak it and tell the user to try again
        if(data.message == "wrong password"){
          this.$refs['password'].classList.add('errorfield');
          //this.$refs['password'].placeholder = "wrong password";  <-----passwrds dont have place holder
          //instead make an animation to tell they are wrong

        }
        //if there is a user in the dat objext,that mean we have succefully logged in
        //the user has been validated on the server side, so we're good to go!
        if (data.user) {
          //store the user in the local storage
          //let the app know this user is valid  and can be access to everything 
          this.$emit('setauthenticated');
          
          //save the user in localStorage so they don't to log in again
          window.localStorage.setItem('user', JSON.stringify(data.user));

          //send the user to the all user page
          this.$router.push({name: 'allusers'});

        }
      })
    .catch(error => console.error(error));
    }
  }
}
