import React, {Component} from 'react';
import './App.css';
import MainPage from './components/MainPage';
import AddPage from './components/AddPage';
import EditPage from './components/EditPage';
import DetailsPage from './components/DetailsPage';
import axios from 'axios';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import { Link } from 'react-router-dom'
import movieimg from './movie2.png';

//In this first state I have an array AllMovies which will hold all movies(data) from the server.
//In state I have hasError which have value false but when something goes wrong in axios, in catch hasError will be set to true and then if statement will run.
class App extends Component  {
 constructor(props) {
   super(props);
   this.state = {
     AllMovies: [],
     hasError: false
   }
 }

 //Using axios.get to get all movies(data) from server .
 //If something goes wrong in axios , in catch hasError will be set to true.
getMovies = () => {
  axios.get('http://3.120.96.16:3001/movies')
  .then((response) => {
      this.setState( {AllMovies: response.data})
   })  
   .catch((error) => {
    this.setState({
        hasError: true
    })
})           
}

//Use componentDidMount to get data from Ajax with getMovies function.
componentDidMount() {
   this.getMovies();
}

//Here I render table with movies from sever to the MainPage.
//I also use links to the 'main page' and the 'add page' for a shared navigation and router to navigate between 4 pages.
//Here I have if statement and if, if hasError is true then if statement will render p tag with text.
  render() {
    if(this.state.hasError === true) {
      return <p className='catchP'>Error! Something went wrong! Could not find the server! Try to refresh the page!</p>
  }
  return (
    <Router>
      <div className="App">
       <header>
         <div className='container'>
            <h1>Ec</h1><img className='img' src={movieimg}></img><h1>DataBase</h1>
         </div>
            <Link to='/'><h4>Main</h4></Link>
            <h5>▲</h5>
            <h5>▼</h5>
            <Link to='/AddPage'><h4>Add Movie</h4></Link>
       </header>
        <main>
           <Route path='/' exact render={ () =>  <MainPage  AllMovies={this.state.AllMovies } /> } />
           <Route path='/AddPage' render= { () => <AddPage AllMovies={this.state.AllMovies}/>} />
           <Route path='/EditPage/:id' render = { (props) => <EditPage  id={props.match.params.id}/>  } />
           <Route path='/DetailsPage/:id' render = { (props) => <DetailsPage id={props.match.params.id} />} />
       </main>
      </div>
     </Router>
    );
  }
}

export default App;
