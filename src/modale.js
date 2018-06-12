import React, { Component } from 'react';
import './modale.css';

class Modale extends Component {
    constructor(props){
        super(props)

        this.state={

        }
    }

render(){
    return(
        <div className='overlay' data-overlay={this.props.showIn}> 
            <div className='modale' >
            <h2 className='mod'> Too late darling,  we are fully booked! 
            <button className='button' onClick={this.props.nascondiModale}>
            CHIUDI
            </button>
            </h2>
            </div>
        </div>
    );
}
}
export default Modale;