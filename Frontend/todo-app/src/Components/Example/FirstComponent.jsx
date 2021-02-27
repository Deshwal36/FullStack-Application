import React, { Component } from 'react';

class FirstComponent extends Component {
    render() {
      return(
      <div className="firstComponent">
           firstComponent  
      </div>
    );
   } 
  }
  
export class FourthComponent extends Component{
    render(){
        return(
            <div className="fourthComponent">
                fourthComponent
            </div>
        );
    }
}

export default FirstComponent;