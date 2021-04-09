import React from 'react';
import config from './config';
import './Book.css';

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
    render() {
        let { error, isLoaded, items, rank } = this.state;
        // console.log(items);
        if(error || !items[rank]) {
            return <button className="" onClick={this.handleGetRandomRank}>Give me a Best Seller</button>
        }
        else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else if(!rank){
            return<button className="" onClick={this.handleGetRandomRank}>Give me the Best Seller</button>
        }
        else{
            return(
                <div className="content">
                    <div>
                        <button className="" onClick={this.handleGetRandomRank}>Give me the Best Seller</button>
                    </div>
                    <div className="bookCoverStyling">
                        <img src={items[rank].book_image} alt="Book Cover"/>
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
                </div>
            )
        }
    }

}

export default Book;