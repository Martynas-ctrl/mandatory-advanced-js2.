import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet';

export class MainPage extends Component {
//In state I have hasError which have value false but when something goes wrong in axios, in catch hasError will be set to true and then if statement will run.
    constructor(props) {
        super(props)
        this.state = {
            search: "",
            hasError: false
        }
    }
    

    //Here I use function deleteMovie to delete movies with a specific id and catch to alert error if something went wrong.
    //If something goes wrong in axios , in catch hasError will be set to true.
    deleteMovie = (id) => {
        axios.delete('http://3.120.96.16:3001/movies/' + id)
            .then((response) => {
                console.log(response);
                window.location = '/';
                })
            .catch((error) => {
                this.setState({
                    hasError: true
                })
            })
    }

    handleInput = (e) => {
        return this.setState({ search: e.target.value })
    }


    //Here I map every movie in the server and for every movie I map I create tr and td. I also use 2 links to navigate the user to editpage and detailspage.
    //I also use filter to be able to search for a movie.
    //Here I have if statement and if, if hasError is true then if statement will render p tag with text.
    render(props) {
        if(this.state.hasError === true) {
            return <p className='catchP'>Error! Something went wrong! The movie is already removed! Try to refresh the page.</p>
        }
        return (
            <div>
                <Helmet><title>Main Page</title></Helmet>
                <section className='searchbox-wrap'>
             <input type='text' 
                    placeholder='Search for a movie...'
                    className='searchbox' 
                    onChange={this.handleInput}
                    value={this.state.search} 
             />
         </section>
                <table>
                    <thead>
                <tr>
                    <th className='thTitle'>Title</th>
                    <th>Director</th>
                    <th className='thRating'>Rating</th>
                </tr>
                </thead>
                <tbody>
                    { this.props.AllMovies.filter((movieToSearch) => {
                        let query = this.state.search.toLowerCase();
                            if (!query) {
                                return movieToSearch;
                            } else {
                            if (movieToSearch.title.toLowerCase().indexOf(query) === -1 && movieToSearch.director.toLowerCase().indexOf(query) === -1) {
                                return false;
                            } else {
                            return true;
                            }
                        }
                    }).map(movie => 
                        <tr key={movie.id}>
                        <td key={movie.title} className='titlelTd'>{movie.title}</td>
                        <td key={movie.director}>{movie.director}</td>
                        <td key={movie.rating}>{movie.rating}</td>
                        <Link to={'/EditPage/' + movie.id} ><p className='editButton'>Edit Movie </p> </Link>
                        <Link to={'/DetailsPage/' + movie.id} ><p className='editButton'>Details </p> </Link>
                        <button key={movie.id} onClick= {() => this.deleteMovie(movie.id)} >Delete Movie</button>
                     </tr>
                    )}
                    </tbody>
                    </table>   
            </div>
        )
    }
    
}

export default MainPage
