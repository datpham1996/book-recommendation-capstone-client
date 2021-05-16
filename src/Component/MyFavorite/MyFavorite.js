import { render } from '@testing-library/react';
import React from 'react'
import Book from '../Book/Book';
import config from '../../config';
import TokenService from "../services/token-service.js"


class MyFavorite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: []
        };
    }


    componentDidMount() {
        //if the user is not logged in, send him to landing page
        if (!TokenService.hasAuthToken()) {
            window.location = '/'
        }
        // get the current user id to make the api call for the user
        let user_id = TokenService.getUserId();
        console.log(user_id)
        let getFavoriteUrl = `${config.API_ENDPOINT}/favorites/user/${user_id}`;

        fetch(getFavoriteUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    favorites: data
                });
            })
            .catch(error => this.setState({ error }))
    }
    // delete book functionality
    deleteBook(event) {

        // console.log('hello there')

        event.preventDefault()


        const data = {}

        const formData = new FormData(event.target)

        for (let value of formData) {
            data[value[0]] = value[1]
        }

        let user_id = TokenService.getUserId();

        let { spoonacular_id, recipe_name, recipe_img, selectedDietName } = data;
        // console.log(spoonacular_id, recipe_name, recipe_img)
        let payload = {
            user_id: user_id,
            spoonacular_id: spoonacular_id,
            recipe_name: recipe_name,
            recipe_img: recipe_img,

        }

        const dietName = selectedDietName

        // console.log(payload)

        ////////////////POST RECIPE//////////////////////////////////////////////

        fetch(`${config.API_ENDPOINT}/recipes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then(responseJson => {
                // console.log("post recipe response", responseJson)

            })

            .catch(err => {
                console.log(err);
            });

    }
    render() {
        let existingFavorites = ""
        // if theres no favorite it will return an error
        if (this.state.favorites.length == 0) {
            existingFavorites = <p>No favorite</p>
        }
        // if theres favorite it will return the result
        else {
            existingFavorites = this.state.favorites.map((favorite, key) => {
                return (
                    <ul className="favorite" key={key}>
                        <li className="favorite-img">
                            <img src={favorite.book_image} alt="Book Cover" />
                        </li>
                        <li className="favorite-title">{favorite.book_title}
                        </li>
                        <li className="favorite-author">
                            by: {favorite.book_author}
                        </li>
                        <li className="favorite-description">
                            {favorite.book_description}
                        </li>
                        <li className="favorite-ispublic">
                            {favorite.is_public ? "public" : "private"}
                        </li>
                        <li>
                            <form className="removeBookForm" onSubmit={this.removeBook}>
                                <input type='hidden' name='id' defaultValue={favorite.id}>

                                </input>
                                <input type='hidden' name='users_id' defaultValue={TokenService.getUserId()}>

                                </input>
                                <input type='hidden' name='book_title' defaultValue={favorite.book_title}>

                                </input>
                                <input type='hidden' name='book_author' defaultValue={favorite.book_author}>

                                </input>
                                <input type='hidden' name='book_image' defaultValue={favorite.book_image}>

                                </input>
                                <input type='hidden' name='book_description' defaultValue={favorite.book_description}>

                                </input>
                                <input type='hidden' name='is_public' defaultValue={favorite.is_public}>

                                </input>
                                <button type='submit' className='removeBookButton'>Remove Book
                                </button>
                            </form>
                        </li>
                    </ul>
                )
            })
        }


        return (
            <div>{existingFavorites}</div>
        )
    }
}


export default MyFavorite;