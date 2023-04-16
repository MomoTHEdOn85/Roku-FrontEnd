export default {
  name: 'TheDefaultHomeComponent',

  props: ['user'],

  template: `
    <div class="PlayingCurrent">
      <img src="images/adult-movies.jpg" alt="Kids Currently Playing Movie">
      <div class="bottom-left">
        <h3> Now Playing </h3>
        <h2>Dune</h2>
      </div>
    </div>

    <div class=listOne>
      <h2>Popular</h2>
      <div class="movies"></div>
    </div>

    <div class=listOne>
      <h2>Game</h2>
      <div class="moviesOne"></div>
    </div>

    <div class=listOne>
      <h2>Thrillers</h2>
      <div class="moviesTwo"></div>
    </div>

    <div class=listOne>
      <h2>Music</h2>
      <div class="music"></div>
    </div>




     
  `,

  methods: {
    //HomeToNav() {
     // let BacktargetRoute = 'allusers';

      //this.$router.push({ name: BacktargetRoute });


   // }
  },

  created() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '6989616d39mshc3b0153f4401a48p1398d7jsn3119203eb2c1',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
      }
    };
    
   fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=game', options)
      .then(response => response.json())
      .then(data => {
        const list = data.d;
    
        list.map((item) => {
          const name = item.l;
          const poster = item.i.imageUrl;
          const movie = `<li><img src = "${poster}" <h2>${name}</h2>`
           
          document.querySelector('.moviesOne').innerHTML += movie;
           
        })
        
      })
      .catch(err => console.error(err));
    //This is where you are going to fetch the data from the IMDB API
    //load it to your view page
    //one  for adult and one for kids homa page --> watch the youtube link

    fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=thriller', options)
      .then(response => response.json())
      .then(data => {
        const list = data.d;
    
        list.map((item) => {
          const name = item.l;
          const poster = item.i.imageUrl;
          const movie = `<li><img src = "${poster}" <h2>${name}</h2>` 
          document.querySelector('.moviesTwo').innerHTML += movie;
          
        })
        
      })
      .catch(err => console.error(err));


      fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=popular', options)
      .then(response => response.json())
      .then(data => {
        const list = data.d;
    
        list.map((item) => {
          const name = item.l;
          const poster = item.i.imageUrl;
          const movie = `<li><img src = "${poster}" <h2>${name}</h2>` 
          document.querySelector('.movies').innerHTML += movie;
          
        })
        
      })
      .catch(err => console.error(err));

      //Music 
      fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=music', options)
      .then(response => response.json())
      .then(data => {
        const list = data.d;
    
        list.map((item) => {
          const name = item.l;
          const poster = item.i.imageUrl;
          const movie = `<li><img src = "${poster}" <h2>${name}</h2>` 
          document.querySelector('.music').innerHTML += movie;
          
        })
        
      })
      .catch(err => console.error(err));
  }
}
