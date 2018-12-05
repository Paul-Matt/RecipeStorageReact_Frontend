import React from 'react';
import SkyLight from 'react-skylight';

class AddRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', ingredients: '',  instructions: ''};
    }

    handleChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    } 

    // Save recipe and close modal form
  handleSubmit = (event) => {
    event.preventDefault();
    var newRecipe = {name: this.state.name, ingredients: this.state.ingredients, 
      instructions: this.state.instructions};
    this.props.addRecipe(newRecipe);    
    this.refs.addDialog.hide();    
    }

    // Cancel and close modal form
    cancelSubmit = (event) => {
        event.preventDefault();    
        this.refs.addDialog.hide();    
    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="addDialog">
                    <h3>New recipe</h3>
                    <form>
                        <input type="text" placeholder="Name"  name="name" onChange={this.handleChange}/><br/>    
                        <input type="text" placeholder="Ingredients" name="ingredients" onChange={this.handleChange}/><br/>
                        <input type="text" placeholder="Instructions" name="instructions" onChange={this.handleChange}/><br/>
                        <button onClick={this.handleSubmit}>Save</button>        
                        <button onClick={this.cancelSubmit}>Cancel</button>        
                    </form>     
                </SkyLight>
                <div>
                    <button style={{'margin': '10px'}} onClick={() => this.refs.addDialog.show()}>New recipe</button>
                </div>
            </div>
        );
    }
}

export default AddRecipe;