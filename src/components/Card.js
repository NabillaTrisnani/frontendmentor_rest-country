import React from 'react'

class Card extends React.Component {
    render() {
        return (
            <div className={`card ${this.props.className}`}>
                <div className='card__img'>
                    <img src={this.props.img} alt={this.props.img} />
                </div>
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