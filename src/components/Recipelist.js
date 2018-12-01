import React, { Component } from 'react';
import {SERVER_URL} from '../constants.js'

class Recipelist extends Component {

    // Creating recipes array
    constructor(props) {
        super(props);
        this.state = { recipes: []};
    }

    // The recipes from the JSON response data will be saved to the state, called recipes
    componentDidMount() {
        fetch(SERVER_URL + 'api/recipes')
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                recipes: responseData._embedded.recipes,
            });
        })
        .catch(err => console.error(err));
    }

    // Using the map function to transform recipe objects into table rows, and adding the table element
    render() {
        const tableRows = this.state.recipes.map((recipe, index) =>
            <tr key={index}>
                <td>{recipe.name}</td>
                <td>{recipe.ingredients}</td>
                <td>{recipe.instructions}</td>
            </tr>
    );

    return (
        <div className="App">
            <table>
                <tbody>{tableRows}</tbody>
            </table>
        </div>
    );
    }
}


export default Recipelist;