import React, { Component } from 'react';
import {SERVER_URL} from '../constants.js'
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import AddRecipe from './AddRecipe.js';

class Recipelist extends Component {

    // Creating recipes array
    constructor(props) {
        super(props);
        this.state = { recipes: []};
    }


    componentDidMount() {
        this.fetchRecipes();
    }

    // The recipes from the JSON response data will be saved to the state, called recipes
    fetchRecipes = () => {
        fetch(SERVER_URL + 'api/recipes')
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                recipes: responseData._embedded.recipes,
            });
        })
        .catch(err => console.error(err));
    }

    confirmDelete = (link) => {
        confirmAlert({
          message: 'Are you sure to delete?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.onDelClick(link)
            },
            {
              label: 'No',
            }
          ]
        })
      }


    // Delete  recipe. Sends the DELETE request to a recipe link,
    // and when the delete succeeds, refreshes the list page by calling the fetchRecipes() function
    onDelClick = (link) => {
        console.log(link);
        fetch(link, {
            credentials: 'include',
            method: 'DELETE'})
        .then(res => {
            toast.success("Recipe deleted", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            //this.fetchRecipes();
        })
        .catch(err => {
            toast.error("Error when deleting", {
                position: toast.POSITION.BOTTOM_LEFT
            });
        console.error(err)
        })
    }

    // Add a new recipe
  addRecipe(recipe) {
    console.log(recipe);
    fetch(SERVER_URL + 'api/recipes', 
    {   method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe)
    })
    .then(res => this.fetchRecipes())
    .catch(err => console.error(err))
  } 

    render() {
        const columns = [{
        Header: 'Name',
        accessor: 'name'
        }, {
        Header: 'Ingredients',
        accessor: 'ingredients',
        }, {
        Header: 'Instructions',
        accessor: 'instructions',
        }, {
            id: 'delbutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: ({value}) => (<button onClick=
                {()=>{this.confirmDelete(value)}}>Delete</button>)
            }]

        return (
        <div className="App">
        <AddRecipe addRecipe={this.addRecipe} fetchRecipes={this.fetchRecipes}/>
        <ReactTable data={this.state.recipes} columns={columns}
        filterable={true} pageSize={10}/>
        <ToastContainer autoClose={1500}/>
        </div>
        );
        }

    /* // Using the map function to transform recipe objects into table rows, and adding the table element
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
    } */
}


export default Recipelist;