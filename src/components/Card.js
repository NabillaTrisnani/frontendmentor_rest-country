import React from 'react'

class Card extends React.Component {
    render() {
        return (
            <div className="card">
                <img src={this.props.img} className="card__img" alt={this.props.img} />
                <div className="card__body">
                    <h1 className="card__title">{ this.props.title }</h1>
                    <p className="card__text"><b>Population:</b> {this.props.population}</p>
                    <p className="card__text"><b>Region:</b> {this.props.region}</p>
                    <p className="card__text"><b>Capital:</b> {this.props.capital}</p>
                </div>
            </div>
        );
    }
}

export default Card;