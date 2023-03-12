import {configureStore,createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios' ;

const initialState={
    movies:[],
    genresLoaded: false,
    genres: []
}

export const getGenres=createAsyncThunk("netflix/genres", async ()=> {
    const { data:{genres} } = await  axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=e2707659cb7bed35c178bb9a775aef0f"
        ) 
     return genres;   

});


export const getUsersLikedMovies = createAsyncThunk(
  "netflix/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
    return movies;
  }
);

export const removeMovieFromLiked = createAsyncThunk(
  "netflix/deleteLiked",
  async ({ movieId, email }) => {
    const {
      data: { movies },
    } = await axios.put("http://localhost:5000/api/user/remove", {
      email,
      movieId,
    });
    return movies;
  }
);




const getRawData = async (api, genres, paging = false) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
      const {
        data: { results },
      } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
  };
  

export const fetchMovies = createAsyncThunk(
    "netflix/trending",
    async ({ type }, thunkAPI) => {
      const {
        netflix: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `https://api.themoviedb.org/3/trending/${type}/week?api_key=e2707659cb7bed35c178bb9a775aef0f`,
        
        genres,
        true
      );
    }
  );

  export const fetchMoviesByGenre= createAsyncThunk(
      "netflix/genre",
      async ({ genre, type }, thunkAPI) => {
        const {
          netflix: { genres },
        } = thunkAPI.getState();
        return getRawData(
          `https://api.themoviedb.org/3/discover/${type}?api_key=e2707659cb7bed35c178bb9a775aef0f&with_genres=${genre}`,
          genres
        );
      }
    );

  const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
      const movieGenres = [];
      movie.genre_ids.forEach((genre) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movieGenres.push(name.name);
      });
      if (movie.backdrop_path)
        moviesArray.push({
          id: movie.id,
          name: movie?.original_name ? movie.original_name : movie.original_title,
          image: movie.backdrop_path,
          genres: movieGenres.slice(0, 3),
        });
    });
  };
const NetflixStore=createSlice({
    name:'Netflix',
    initialState,
    extraReducers:
        (builder)=>{
            builder.addCase(getGenres.fulfilled,(state,action)=>{
                state.genres=action.payload;
                state.genresLoaded=true;
            });
            
            builder.addCase(fetchMovies.fulfilled,(state,action)=>{
                state.movies=action.payload;
            });
            builder.addCase(fetchMoviesByGenre.fulfilled,(state,action)=>{
                state.movies=action.payload;
            });
            builder.addCase(getUsersLikedMovies.fulfilled,(state,action)=>{
                state.movies=action.payload;
          });
            builder.addCase(removeMovieFromLiked.fulfilled,(state,action)=>{
                state.movies=action.payload;
      });
      
          
        }
        
    

});

export const store =configureStore({
    reducer :{
        netflix:NetflixStore.reducer,
    },
});