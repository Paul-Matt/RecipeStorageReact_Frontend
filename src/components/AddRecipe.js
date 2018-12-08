import React from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class AddRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', ingredients: '',  instructions: ''};
    }

    // Saves the value to the state
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
                    <TextField label="Name" multiline rows="2" placeholder="Name"  name="name" onChange={this.handleChange}/><br/>    
                    <TextField label="Ingredients" multiline rows="4" placeholder="Ingredients" name="ingredients" onChange={this.handleChange}/><br/>
                    <TextField label="Instructions" multiline rows="4" placeholder="Instructions" name="instructions" onChange={this.handleChange}/><br/><br/>
                        <Button variant="outlined" color="primary"
                        onClick={this.handleSubmit}>Save</Button>
                        <Button variant="outlined" color="secondary"
                        onClick={this.cancelSubmit}>Cancel</Button> 
                    </form>     
                </SkyLight>
                <div>
                <Button variant="contained" color="primary"
                style={{'margin': '10px'}}
                onClick={() => this.refs.addDialog.show()}>New recipe</Button>
                </div>
            </div>
        );
    }
}

export default AddRecipe;