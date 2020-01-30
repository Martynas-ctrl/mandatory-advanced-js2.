 import React, { Component } from 'react'
 import axios from 'axios';
 import { Helmet } from 'react-helmet';

//Here in state I have object with empty strings. These empty strings will get data that I will update and then later send that data to the server. 
//In state I have 2 hasErrors and they have value false but when something goes wrong in axios, in catch hasError will be set to true and then if statement will run.
 export class EditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: [],
            title: '',
            director: '',
            rating: '',
            description: '',
            id: props.id,
            hasError: false,
            hasError2: false
         }
     }
    //When I submit the Add new movie button the if statement will look if validation is correct if not then the user will be warned with alert, in order to post new movie all inputs must not be empty.
    onSubmit = (e) => {
         e.preventDefault();
         if(!this.state.rating || !this.state.director || !this.state.title || !this.state.description) {
            alert('Everything must be filled in ');
           }
     }

     
    //The value of title, director, rating and description will change to text/value I type in, in their inputs.
    onChangeTitle = (e) => {
        this.setState({
            title: e.target.value
        });  
    }
     
    onChangeDirector = (e) => {
        this.setState({
            director: e.target.value
        });
    }
    
    onChangeRating = (e) => {
        this.setState({
            rating: e.target.value
        });
    }
    
    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        });
    }

    //Here I use componentDidMount to get data with a specific id from server with help of axios.get.
    //Then I update that specific ids information(title,director etc) and send that updated data(information) to empty movie array in state and then I push movie array whith all updated data to the server. 
    //If something goes wrong in axios , in catch hasError will be set to true.
    componentDidMount() {
          let id = this.props.id;

          axios.get('http://3.120.96.16:3001/movies/' + id)
             .then((response) => {
                 console.log(response)
                 this.setState({
                    title: response.data.title,
                    director: response.data.director,
                    rating: response.data.rating,
                    description: response.data.description,
                 })
                 let movie = this.state.movie;
                 movie.push(response.data)
                 this.setState({movie: movie })
             })
             .catch((error) => {
                this.setState({
                    hasError: true
                })
            })
     }
    
    //Here I have a function which will update the information I type in to the server. 
    //I have variable data in which I collect the data I want to update the server with. 
    //I use axios.put to update the data in the server with data I have collected in variable data, when the data is updated to the server the user will be send back to main page.
    //If something goes wrong in axios , in catch hasError2 will be set to true.
    postMovie = () => {
        let { id, title, director, rating, description  } = this.state;

        let data = {
            id: id,
            title: title,
            director: director,
            rating: rating,
            description: description,
        }
        axios.put('http://3.120.96.16:3001/movies/'+ id, data)
            .then(res =>{
                console.log(res);
                window.location = '/';
            })
            .catch((error) => {
                this.setState({
                    hasError2: true
                })
            })
     }
    //The value(text I type in input) of input vill be saved in the input and then posted to the server .I also have validations set in all inputs.
    //Here I have 2 if statements and if, if hasError or harError2 is true then if statement will render p tags with text.
    render() {
        if(this.state.hasError === true) {
            return <p className='catchP'>Something went wrong! Look if item you want to get from the server still exist! Try to refresh the page!</p>
        }
        if(this.state.hasError2 === true) {
            return <p className='catchP'>Error! Something went wrong! Look if id you want to update exist! Try to refresh page</p>
        }

         return (
             <div>
                 <Helmet><title>Edit Page</title></Helmet>
                <form className ='addpageform' onSubmit={this.onSubmit}>
                   <input className='inputFocus' type='text' placeholder='Title' value={this.state.title} onChange={this.onChangeTitle} minLength={1} maxLength={40}/>
                   <input className='inputFocus' type='text' placeholder='Director' value={this.state.director} onChange={this.onChangeDirector} minLength={1} maxLength={40}/>
                   <input className='inputFocus' type='number' placeholder='Rating' value={this.state.rating} onChange={this.onChangeRating} min={0.0} step={0} max={5.0} />
                   <textarea className='inputFocus' className='textarea' value={this.state.description} onChange={this.onChangeDescription} minLength={1} maxLength={300}/>
                   <button className='updateButton' type='submit' onClick={this.postMovie}>Update movie</button>
                </form>
             </div>
         )
     }
 }

 export default EditPage
