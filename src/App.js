import React, { Component } from 'react';
import logo from './photos/grape-1.png';
import './App.css';
import isEmail from 'validator/lib/isEmail';
import Modale from './modale';

class App extends Component {
  constructor(props){
    super(props)

    this.state={
      fields:{
        name:'',
        email:''
      },
      people:[],
      disable: false,
      fieldsError:{},
      inPage: false,
      showIn: false 
    };
    this.mostraModale =()=>{
      this.setState({
        inPage:true,
        showIn: true
      })
    };
    this.nascondiModale =()=>{
      this.setState({
        //inPage:false,
        showIn: false
      })
      
      const modal = document.querySelector('.overlay');
      
      modal.addEventListener('animationend', () =>{
        this.setState({
          inPage: false,
        });
      });
    }
  }

  onInputChange = (e) => {
    // const fields = Object.create(this.state.fields)
    const fields = {...this.state.fields}
    fields[e.target.name] = e.target.value      //prendi chi l ha scatenato (il nome dell input che ha scatenatpo..), guarda il suo nome, attribuiscigli il nome di ..
                                                //tra [] posso chiamare proprieta' come obj.key

    this.setState({fields})
  }

  validation = (person) => {       //validation e' una funzione che mi torna solo l errore, una volta scritta aggiorno la mia onSubmit
    const error = {};
    console.log(person.name)
    if (!person.name) error.name = 'Name required'
    if (!person.email) error.email = 'Email required'
    if ( person.name && !isEmail(person.email)) error.email ='Invalid email'
    return error
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const person = this.state.fields
    const people = [...this.state.people]
    const fieldsError = this.validation(person)

    this.setState({fieldsError})

    if(people.length === 4) {

      this.mostraModale()
      return
    }

    if (Object.keys(fieldsError).length) return
    this.setState({
      people: people.concat(person),
      fields:{
        name:'',
        email:''
      }
    })  

    console.log(this.state.people.length)

    this.state.people.length >= 3 ? this.mostraModale() : null 

  //   maxArr(click){

  //     const limitedList = [...this.state.people]
  
  //     limitedList.splice(0,3)
  
  //     this.setState({
  //       people: limitedList
  //     })
  // }

  }

  render() {
    return (
      <div className='main'>
      <div className='overLay'>
      <div className='container'>
      <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Wine Tasting</h1>
          <h2> RSVP </h2>
        <form onSubmit={this.onFormSubmit}>
        
        <input 
        className='input'
        placeholder='Type here your name'
        name='name'
        value={this.state.fields.name}
        onChange={this.onInputChange}
        />
        <span > {this.state.fieldsError.name} </span>
        <br/>
        <input 
        className='input'
        placeholder='Type here your email'
        name='email'
        value={this.state.fields.email}
        onChange={this.onInputChange}
        />
        <span > {this.state.fieldsError.email} </span>
        <br/>
        <button className='myButton'> RSVP! </button>
        </form>
        {/* {this.state.people.length >= 1 ? this.mostraModale : null } */}
        {/* <button onClick={this.mostraModale}>MOSTRA MODALE</button> */}
        <h3> Who's already subscribed?</h3>
        <ul>
          {this.state.people.map(({name, email},i) => <li key={i}> {name} ({email})</li>)}
        </ul>
      </div>
      {this.state.inPage ? (
        <Modale
          showIn = {this.state.showIn}
          nascondiModale = {this.nascondiModale}
        /> 
      ) : ('')
      }
      </div>
      </div>
      </div>
    );
  }
}

export default App;
