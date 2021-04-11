import React from 'react';
import './MainPage.css';

class MainPage extends React.Component{
    render(){
        const title = "Book Recommendation"
        return(
            <div className="mainpagecontainer">
                <h1>{title}</h1>
                <h3>Which book should you read next?</h3>
            </div>
        )
    }
}

export default MainPage;