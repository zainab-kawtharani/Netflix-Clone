import {BrowserRouter,Route,Routes} from 'react-router-dom';
import {Login,Netflix,Signup,Player,Movies, TVshows, UserLikedMovies} from './pages';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route exact path="/login" element={<Login/>}/>
        <Route exact path ="/" element ={<Netflix/>}/>
        <Route exact path ="/player" element={<Player/>}/>
        <Route exact path= "/signup" element={<Signup/>}/>
        <Route exact path= "/movies" element={<Movies/>}/>
        <Route exact path="/tv" element={<TVshows/>}/>
        <Route exact path="/mylist" element={<UserLikedMovies/>}/>

        

      </Routes>

    </BrowserRouter>

  );
}

export default App;
