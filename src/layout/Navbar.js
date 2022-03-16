import React from 'react'
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <nav className="navbar">
                <h1>Where in the world?</h1>
                <button onClick={this.props.onClick}><ion-icon name="moon"></ion-icon> Dark Mode</button>
            </nav>
        );
    }
}

export default Navbar;