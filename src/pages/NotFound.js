import React from 'react'
import { Link } from "react-router-dom";

class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <section className='not-found'>
                <div className='card'>
                    <div className='card__body'>
                        <h1>404</h1>
                        <h2>Oops! Page not found</h2>
                        <Link to="/" className='btn-back'>Back to Home</Link>
                    </div>
                </div>
            </section>
        );
    }
}

export default NotFound;