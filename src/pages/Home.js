import React from "react";
import Card from '../components/Card'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
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
                }
            )
    }
    render() {
        const { isLoaded, items, regionList } = this.state;

        return (
            <section className="home">
                <div className="form">
                    <div className={isLoaded ? 'form__search' : 'form__search skeleton'}>
                        <ion-icon name="search"></ion-icon>
                        <input type="text" placeholder="Search for a country" disabled={isLoaded ? false : true} />
                    </div>
                    <div className={isLoaded ? 'form__select-wrapper' : 'form__select-wrapper skeleton'}>
                        <select className="form__select" disabled={isLoaded ? false : true}>
                            {
                                regionList.map((region) => (
                                    <option value={region} key={region}>{region}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="grid__md-3 grid__lg-3">
                        <Card
                            className={isLoaded ? 'd-none' : 'skeleton'}
                        />
                    </div>
                    <div className="grid__md-3 grid__lg-3">
                        <Card
                            className={isLoaded ? 'd-none' : 'skeleton'}
                        />
                    </div>
                    <div className="grid__md-3 grid__lg-3">
                        <Card
                            className={isLoaded ? 'd-none' : 'skeleton'}
                        />
                    </div>
                    <div className="grid__md-3 grid__lg-3">
                        <Card
                            className={isLoaded ? 'd-none' : 'skeleton'}
                        />
                    </div>
                    <div className="grid__md-3 grid__lg-3">
                        <Card
                            className={isLoaded ? 'd-none' : 'skeleton'}
                        />
                    </div>
                    <div className="grid__md-3 grid__lg-3">
                        <Card
                            className={isLoaded ? 'd-none' : 'skeleton'}
                        />
                    </div>
                    <div className="grid__md-3 grid__lg-3">
                        <Card
                            className={isLoaded ? 'd-none' : 'skeleton'}
                        />
                    </div>
                    <div className="grid__md-3 grid__lg-3">
                        <Card
                            className={isLoaded ? 'd-none' : 'skeleton'}
                        />
                    </div>
                </div>
                <div className="row">
                    {
                        items.map((item, index) => (
                            <div className="grid__md-3 grid__lg-3" key={index}>
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

export default Home;