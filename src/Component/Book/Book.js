import React from 'react';
import TokenService from "../services/token-service.js"
import config from '../../config';


class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            rank: 0,
            title: "",
            author: "",
            book_image: "",
            amazon_product_url: ""
        };
    };

    componentDidMount() {
        let URL = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${config.MY_KEY}`
        // console.log(URL);
        fetch(URL)
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result.results.books
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    handleGetRandomRank = (e) => {
        this.setState({
            rank: Math.floor(Math.random() * 15) + 1
        })
    };
    addBook(event) {

        // console.log('hello there')

        event.preventDefault()


        const data = {}

        const formData = new FormData(event.target)

        for (let value of formData) {
            data[value[0]] = value[1]
        }

        let users_id = TokenService.getUserId();

        let { book_title , book_author, book_image, book_description, is_public} = data;
        // console.log(spoonacular_id, recipe_name, recipe_img)
        let payload = {
            users_id: parseInt(users_id),
            book_title: book_title,
            book_author: book_author,
            book_image: book_image,
            book_description: book_description,
            is_public: parseInt(is_public)

        }

        console.log(payload);

        ////////////////POST FAVORITE//////////////////////////////////////////////

        fetch(`${config.API_ENDPOINT}/favorites`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then(responseJson => {
                console.log("post recipe response", responseJson)
                window.location = '/favorite'
            })

            .catch(err => {
                console.log(err);
            });

    }
    render() {
        let { error, isLoaded, items, rank } = this.state;
        // console.log(items);
        if (error || !items[rank]) {
            return <div className="mainpagecontainer">
                <button className="" onClick={this.handleGetRandomRank}>Give me a Best Seller</button>
            </div>
        }
        else if (!isLoaded) {
            return <div className="mainpagecontainer">Loading...</div>;
        }
        else if (!rank) {
            return <div className="mainpagecontainer">
                <button className="" onClick={this.handleGetRandomRank}>Give me the Best Seller</button>
            </div>
        }
        else {
            return (
                <div className="content mainpagecontainer">
                    <div>
                        <button className="" onClick={this.handleGetRandomRank}>Give me the Best Seller</button>
                    </div>
                    <div className="bookCoverStyling">
                        <img src={items[rank].book_image} alt="Book Cover" />
                    </div>
                    <div className="titleStyling">
                        {items[rank].title}
                    </div>
                    <div className="authorStyling">
                        by: {items[rank].author}
                    </div>
                    <div className="descriptionStyling">
                        {items[rank].description}
                    </div>
                    <a href={items[rank].amazon_product_url}>Amazon URL</a>
                    {TokenService.hasAuthToken() ?
                        <form className="addBookForm" onSubmit={this.addBook}>

                            <input type='hidden' name='book_title' defaultValue={items[rank].title}>

                            </input>
                            <input type='hidden' name='book_author' defaultValue={items[rank].author}>

                            </input>
                            <input type='hidden' name='book_image' defaultValue={items[rank].book_image}>

                            </input>
                            <input type='hidden' name='book_description' defaultValue={items[rank].description}>

                            </input>
                            <input type='hidden' name='is_public' defaultValue="0">

                            </input>
                            <button type='submit' className='addBookButton'>Add favorite
                                </button>
                        </form>
                        :
                        " "
                    }
                </div>
            )
        }
    }

}

export default Book;