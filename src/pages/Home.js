import React from "react";
import Card from '../components/Card'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            error: null,
            isLoaded: false,
            items: [],
            regionList: ["Africa", "America", "Asia", "Europe", "Oceania"]
        };
    }

    componentDidMount() {  
        fetch("https://restcountries.com/v3.1/all")
            .then(res => res.json())
            .then(
                (results) => {
                    this.setState({
                        isLoaded: true,
                        items: results
                    })
                    // console.log(results)
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    })
                }
            )
    }
    render() {
        const { isLoaded, error, items, regionList } = this.state;
        if (error) {
            return (
                <section className="home">
                    This shit is error
                </section>
            );
        } else if(!isLoaded) {
            return (
                <section className="home">
                    Still loading lol
                </section>
            );
        } else {
            return (
                <section className="home">
                    <div className="form">
                        <div className="form__search">
                            <ion-icon name="search"></ion-icon>
                            <input type="text" placeholder="Search for a country" />
                        </div>
                        <div className="form__select-wrapper">
                            <select className="form__select">
                                {
                                    regionList.map((region) => (
                                        <option value={region}>{region}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        {
                            items.map((item) => (
                                <div className="grid__md-3 grid__lg-3" key={item.name.official}>
                                    <Card
                                        img={item.flags.png}
                                        title={item.name.common}
                                        population={item.population}
                                        region={item.region}
                                        capital={item.capital}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </section>
            );            
        }
    }
}

export default Home;