
import { useState, useEffect } from "react";
import Card from '../components/Card'
import { Link } from "react-router-dom";

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [selectInput, setSelectInput] = useState('');
    const regionList = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        fetch("https://restcountries.com/v3.1/all")
            .then(res => res.json())
            .then(
                (results) => {
                    setIsLoaded(true);
                    setItems(results);
                    // console.log(results)
                }
            )
    }
    const handleChangeInput = (e) => {
        setSearchInput(e.target.value);
    }
    const handleChangeSelect = (e) => {
        setSelectInput(e.target.value);
    }
    
    useEffect(() => {
        const result = items.filter(
            item =>
            (!searchInput || item.name.common.toLowerCase().includes(searchInput.toLowerCase())) &&
            (!selectInput || item.region === selectInput)
        );
        setFilteredItems(result);
        console.log(result);
        }, [searchInput, items, selectInput]);

    return (
        <section className="home">
            <form className="form flex flex-wrap">
                <div className={isLoaded ? 'form__search' : 'form__search skeleton'}>
                    <ion-icon name="search"></ion-icon>
                    <input type="text" placeholder="Search for a country" disabled={isLoaded ? false : true} value={searchInput} onChange={handleChangeInput} />
                </div>
                <div className={isLoaded ? 'form__select-wrapper' : 'form__select-wrapper skeleton'}>
                    <select className="form__select" disabled={isLoaded ? false : true} onChange={handleChangeSelect}>
                        <option value="">All</option>
                        {
                            regionList.map((region) => (
                                <option value={region} key={region}>{region}</option>
                            ))
                        }
                    </select>
                </div>
            </form>
            <div className="row">
                <div className="grid-12 grid__sm-6 grid__md-4 grid__lg-3 grid__xl-3">
                    <Card
                        className={isLoaded ? 'hidden' : 'skeleton'}
                    />
                </div>
                <div className="grid-12 grid__sm-6 grid__md-4 grid__lg-3 grid__xl-3">
                    <Card
                        className={isLoaded ? 'hidden' : 'skeleton'}
                    />
                </div>
                <div className="grid-12 grid__sm-6 grid__md-4 grid__lg-3 grid__xl-3">
                    <Card
                        className={isLoaded ? 'hidden' : 'skeleton'}
                    />
                </div>
                <div className="grid-12 grid__sm-6 grid__md-4 grid__lg-3 grid__xl-3">
                    <Card
                        className={isLoaded ? 'hidden' : 'skeleton'}
                    />
                </div>
                <div className="grid-12 grid__sm-6 grid__md-4 grid__lg-3 grid__xl-3">
                    <Card
                        className={isLoaded ? 'hidden' : 'skeleton'}
                    />
                </div>
                <div className="grid-12 grid__sm-6 grid__md-4 grid__lg-3 grid__xl-3">
                    <Card
                        className={isLoaded ? 'hidden' : 'skeleton'}
                    />
                </div>
                <div className="grid-12 grid__sm-6 grid__md-4 grid__lg-3 grid__xl-3">
                    <Card
                        className={isLoaded ? 'hidden' : 'skeleton'}
                    />
                </div>
                <div className="grid-12 grid__sm-6 grid__md-4 grid__lg-3 grid__xl-3">
                    <Card
                        className={isLoaded ? 'hidden' : 'skeleton'}
                    />
                </div>
            </div>
            <div className="row">
                {
                    filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => (
                            <div className="grid-12 grid__sm-6 grid__md-4 grid__lg-3 grid__xl-3" key={index}>
                                <Link to={`${item.name.common.toLowerCase()}`}>
                                    <Card
                                        img={item.flags.png}
                                        title={item.name.official}
                                        population={item.population}
                                        region={item.region}
                                        capital={item.capital}
                                    />
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="grid-12 grid__sm-12 grid__md-12 grid__lg-12 grid__xl-12">
                            <div className={`card card-no-data ${isLoaded ? '' : 'hidden'}`}>
                                <div className="card__body">
                                    <h1>Country not found</h1>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    );
};
