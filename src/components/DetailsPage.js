 import React, { Component } from 'react';
 import axios from 'axios';
 import { Helmet } from 'react-helmet';

 // In the state I have array movie which will hold the updated data for a specific movie I click on.
 //In state I have hasError which have value false but when something goes wrong in axios, in catch hasError will be set to true and then if statement will run.
 export class DetailsPage extends Component {
     constructor(props) {
         super(props);
         this.state = {
             movie: [],
             title: '',
             director: '',
             rating: '',
             description: '',
             id: props.id,
             hasError: false
         }
     }

    //Here I use componentDidMount to get data with a specific id from server with help of axios.get.
    //Then I update that specific ids information(title,director etc) and send that updated data(information) to empty movie array in state and then I push movie array whith all updated data to the server. 
    //If something goes wrong in axios , in catch hasError will be set to true.
    componentDidMount() {
       let id = this.props.id;

       axios.get('http://3.120.96.16:3001/movies/' + id)
           .then(response => {
               console.log(response)
               let movie = this.state.movie;
               movie.push(response.data)
               this.setState({
                 movie: movie
             })
              this.setState({
                title: response.data.title,
                director: response.data.director,
                rating: response.data.rating,
                description: response.data.description,
             })
            })
            .catch((error) => {
                this.setState({
                    hasError: true
                })  
           })
   }

   //Here I create table and for every data in the server I map I create tr and td.
   //Here I have if statement and if, if hasError is true then if statement will render p tag with text.
     render() {
        if(this.state.hasError === true) {
            return <p className='catchP'>Error! Something went wrong! Look if item you want to get still exist! Try to refresh the page!</p>
        }
         const {movie} = this.state;
         return (
             <div>
                 <Helmet><title>Details Page</title></Helmet>
                 <table>
                     <thead>
                    <tr>
                        <th>Title</th>
                        <th>Director</th>
                        <th className='thRating'>Rating</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                         {movie.map(info =>{
                             return (
                                 <tr key={info.id}>
                                     <td className='tdDetails'>{info.title}</td>
                                     <td className='tdDetails'>{info.director}</td>
                                     <td className='tdDetails'>{info.rating}</td>
                                     <td className='tdDetails'>{info.description}</td>
                                 </tr>
                             )
                         })}
                    }
                </tbody>
                  </table>
             </div>
         )
     }
 }

 export default DetailsPage
