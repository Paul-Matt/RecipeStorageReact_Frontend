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
        // Read the token from the session storage
        // and include it to Authorization header
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'api/recipes',
        {
            headers: {'Authorization': token}
        })
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
        const token = sessionStorage.getItem("jwt");
        //console.log(link);
        fetch(link, 
            {
                method: 'DELETE',
                headers: {'Authorization': token}
            }
        )
        .then(res => {
            toast.success("Recipe deleted", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            this.fetchRecipes();
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
        const token = sessionStorage.getItem("jwt");
        //console.log(recipe);
        fetch(SERVER_URL + 'api/recipes', 
        {   method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            },
            body: JSON.stringify(recipe)
        })
        .then(res => this.fetchRecipes())
        .catch(err => console.error(err))
    } 

     // Update recipe. The function gets two arguments, the updated recipe object and the request URL
    updateRecipe(recipe, link) {
        const token = sessionStorage.getItem("jwt");
        fetch(link, 
        { method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(recipe)
        })
        .then( res =>
            toast.success("Changes saved", {
                position: toast.POSITION.BOTTOM_LEFT
            })         
        )
        .catch( err => 
            toast.error("Error when saving", {
                position: toast.POSITION.BOTTOM_LEFT
            })             
        )
    }

    // The cell renderer changes the table cells to editable.
    // The cell is the div element and the contentEditable attribute makes it editable.
    // SuppressContentEditableWarning suppresses the warning that comes when 
    // the element with the child is marked to be editable. The function in onBlur is 
    // executed when the user leaves the table cell, and this is where the state will be updated
    renderEditable = (cellInfo) => {
        return (
          <div
            style={{ backgroundColor: "#fafafa" }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const data = [...this.state.recipes];
              data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({ recipes: data });
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.recipes[cellInfo.index][cellInfo.column.id]
            }}                
          />
        );
      }  

    render() {
        const columns = [{
            Header: 'Name',
            accessor: 'name',
            Cell: this.renderEditable
        }, {
            Header: 'Ingredients',
            accessor: 'ingredients',
            Cell: this.renderEditable
        }, {
            Header: 'Instructions',
            accessor: 'instructions',
            Cell: this.renderEditable
        }, {
            id: 'savebutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: ({value, row}) =>
            (<button onClick={()=>{this.updateRecipe(row, value)}}>
            Save</button>)
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