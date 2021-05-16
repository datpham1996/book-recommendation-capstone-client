import React from 'react';


export default function Footer() {
    return (
        <div className="footerContainer">
            <div>
                <a href='mailto:Datmpham96@gmail.com;'
                    target='_blank'
                    rel="noopener noreferrer">
                    <i className="fas fa-envelope"></i>
                </a>
                <a href='https://www.linkedin.com/in/dat-pham-595900200/'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <i className="fab fa-linkedin-in"></i>
                </a>
                <a href='https://github.com/datpham1996'
                    target='_blank'
                    rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                </a>
            </div>
            <p>© Dat Pham | 2021</p>
        </div>
    )
}