import React from 'react';
// import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { data } from '../data';
import { addMovies, addFavourite, setShowFavourites } from '../actions';
class  App extends React.Component{
  componentDidMount(){
    const {store}=this.props;
    store.subscribe(()=>{
      console.log('Updated');

      //TO UPDATE THE APP COMPONENT
      this.forceUpdate();
    });
    store.dispatch(addMovies(data));
    // store.dispatch({
    //   type:'ADD_MOVIES',
    //   movies:data
    // });
  }
  
  isMovieFavourite = (movie) => {
    const {favourites}= this.props.store.getState();

    const index=favourites.indexOf(movie);


    if(index!==-1)
    {
      //found the movie
      return true;
    }


    return false;
  }
  onChangeTab=(val)=>{
    // console.log('val',val);
    this.props.store.dispatch(setShowFavourites(val))
  }
  render(){
  const {list,favourites,showFavourites}=this.props.store.getState();//{list:{},favourite:[]}
  console.log('Render',this.props.store.getState);

const displayMovies= showFavourites ? favourites:list;
// console.log(displayMovies);
  return (
    <div className="App">
    <Navbar/>
    <div className="main">
      <div className="tabs">
        <div className={`tab ${showFavourites ? '':'active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies</div>
        <div className={`tab ${showFavourites ? 'active-tabs':''}`} onClick={()=>this.onChangeTab(true)}>Favourites</div>
      </div>
      <div className="list">
      {/* {data.map((movie,index) => ( */}
        {displayMovies.map((movie,index) => (
        <MovieCard
         movie={movie} 
         key={`movies-${index}`}
          dispatch={this.props.store.dispatch}
          isFavourite={this. isMovieFavourite (movie)}/>
      ))}
      </div>
      {displayMovies.length==0 ? <div className="no-movies">No movies to display!</div>:null}
    </div>
    </div>
  );
        }
}

export default App;