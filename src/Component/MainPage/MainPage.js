import React from 'react';

class MainPage extends React.Component{
    render(){
        const title = "Book Recommendation"
        return(
            <div className="mainpage">
                <h1>{title}</h1>
                <h3>Which book should you read next?</h3>
            </div>
        )
    }
}

export default MainPage;