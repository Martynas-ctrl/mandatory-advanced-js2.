 import React, { Component } from 'react'
 import axios from 'axios';
 import { Helmet } from 'react-helmet';


 //Here in state I have object with empty strings. In these empty strings I save data and then send that data to the server.
 //In state I have hasError which have value false but when something goes wrong in axios, in catch hasError will be set to true and then if statement will run.
 export class AddPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: '',
          director: '',
          rating: '',
          description: '',
          hasError: false
        //   onSubmit: false,
        }
      }
     
    //Here I have a function which will send the information I type in to the server.
    //I have variable info in which I collect the data I want to send to server. 
    //I use axios.post to post the data I have collected in variable info, when the data is send to the server the user will be send back to main page.
    //If something goes wrong in axios , in catch hasError will be set to true.
    postMovie = () => {
        let info = {
            title: this.state.title,
            director: this.state.director,
            rating: this.state.rating,
            description: this.state.description,
        }
        axios.post('http://3.120.96.16:3001/movies', info)
           .then((response) => {
            console.log(response);
            window.location = '/';
           })
           .catch((error) => {
            this.setState({
                hasError: true
            })
        })  
        //     .catch((error) => {
        //         alert('Error! Something went wrong! Look if items you want to post are not empty! Try to refresh page!');
        //  })
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
 
    //When I submit the Add new movie button then if statement will look if validation is correct if not then the user will be warned with alert, in order to post new movie all inputs must not be empty.
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.rating || !this.state.director || !this.state.title || !this.state.description) {
            alert(' You cannot leave anything empty ');
        }
}
     //The text I type in input vill be saved in the input and then posted to the server .I also have validations set in all inputs.
     //Here I have if statement and if, if hasError is true then if statement will render p tag with text.
     render() {
        if(this.state.hasError === true) {
            return <p className='catchP'>Error! Something went wrong! Look if items you want to post are not empty! Try to refresh the page!</p>
        }
         return (
             <div>
                <Helmet><title>Add Page</title></Helmet>
                <form className ='addpageform' onSubmit={this.onSubmit}>
                   <input className='inputFocus' type='text' placeholder='Title' value={this.state.title} onChange={this.onChangeTitle}  minLength={1} maxLength={40} />
                   <input className='inputFocus' type='text' placeholder='Director' value={this.state.director} onChange={this.onChangeDirector} minLength={1} maxLength={40}/>
                   <input className='inputFocus' type='number' placeholder='Rating' value={this.state.rating} onChange={this.onChangeRating} min={0.0} step={0} max={5.0} />
                   <textarea className='inputFocus' className='textarea' value={this.state.description} onChange={this.onChangeDescription} minLength={1} maxLength={300}/>
                   <button className='updateButton' type='submit' onClick={this.postMovie}>Add new movie</button>
                </form>
             </div>
         )
     }
 }
 
 export default AddPage