export default {
  name: 'TheKidsHomeComponent',
  
  props: ['user'],

   
  template: `
     <body class="kidsPanel">
       
       <div class="PlayingCurrent">
         <img src="images/kids-movies.jpg" alt="Kids Currently Playing Movie">
         <div class="bottom-left">
           <h3> Now Playing </h3>
           <h2>Angry Birds 2</h2>
         </div>
       </div>

       <div class=listOne>
         <h2>Angry Birds</h2>
         <div class="movies"></div>
       </div>

       <div class=listOne>
         <h2>Toy Stories</h2>
         <div class="moviesOne"></div>
       </div>

       <div class=listOne>
         <h2>Top Animations</h2>
         <div class="moviesTwo"></div>
       </div>

       
     
       <div>
         <!-- Display results -->
         <ul v-if="movies.length">
         <li v-for="movie in movies" :key="movie.id">{{ movie.title }}</li>
         </ul>
         <!-- Display loading message -->
         <p v-if="isLoading">Loading movies...</p>
         <!-- Display error message -->
         <p v-if="error">{{ error }}</p>
       </div>
     </body>
      
      
  `,


  data() {
    return {
      movies: [],
      isLoading: false,
      error: ''
    };
  },

  created() {
    //Using RAPID api
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '6989616d39mshc3b0153f4401a48p1398d7jsn3119203eb2c1',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
      }
    };
    
   fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=angrybird', options)
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
    //This is where you are going to fetch the data from the IMDB API
    //load it to your view page
    //one  for adult and one for kids homa page --> watch the youtube link

    fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=toystory', options)
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


      fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=animation', options)
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




  },
  mounted() {
    // Fetch movies when component is mounted
    this.fetchMovies();
  },

  methods: {
    fetchMovies() {
      // Reset movies, isLoading and error data
      this.movies = [];
      this.isLoading = true;
      this.error = '';

      // Make API requests using Promise.all
      Promise.all([
       // fetch('https://imdb-api.com/en/API/SearchMovie/k_12345678/the%20dark%20knight'),
        //fetch('https://imdb-api.com/en/API/SearchMovie/k_12345678/the%20shawshank%20redemption')
      ])
        .then(responses => {
          // Check for error in responses
          const errorResponse = responses.find(response => !response.ok);
          if (errorResponse) {
            throw new Error('Failed to fetch movies');
          }
          // Parse response data to JSON
          return Promise.all(responses.map(response => response.json()));
        })
        .then(jsonData => {
          // Merge movie results from multiple requests
          const movies = jsonData.reduce((acc, data) => acc.concat(data.results), []);
          // Set movies data
          this.movies = movies;
          this.isLoading = false;
        })
        .catch(error => {
          // Set error data
          this.error = error.message;
          this.isLoading = false;
        });
    }
  }




  
   


     
  
}