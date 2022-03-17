import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

export default function DetailHome() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    let { name } = useParams();
    // console.log(name);

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/alpha/${name}`)
            .then(res => res.json())
            .then(
                (results) => {
                    setIsLoaded(true);
                    setItems(results);
                    console.log(results);
                }
            )
    }, [name])

    return (
        <section className="detail">
            <Link to="/" className={`btn flex align-items-center justify-content-center ${isLoaded ? '' : 'skeleton'}`}>
                <ion-icon name="arrow-back-outline"></ion-icon> Back
            </Link>
            {
                isLoaded ? 
                items.map((item, index) => (
                    <div className="row align-items-center" key={index}>
                        <div className="grid-12 grid__sm-6 grid__md-6 grid__lg-6 grid__xl-6">
                            <div className='item__image'>
                                <img src={item.flags.png} alt={item.name.common} />  
                            </div>
                        </div>
                        <div className="grid-12 grid__sm-6 grid__md-6 grid__lg-6 grid__xl-6">
                            <div className="row">
                                <div className="grid-12 grid__sm-12 grid__md-12 grid__lg-12 grid__xl-12">
                                    <h1>{item.name.common}</h1>
                                </div>
                                <div className="grid-12 grid__sm-12 grid__md-6 grid__lg-6 grid__xl-6">
                                    <article className="item__main-info">
                                        <p><b>Native Name:</b> {item.name.nativeName[Object.keys(item.name.nativeName)[0]].official}</p>
                                        <p><b>Population:</b> {item.population}</p>
                                        <p><b>Region:</b> {item.region}</p>
                                        <p><b>Sub Region:</b> {item.subRegion}</p>
                                        <p><b>Capital:</b> {item.capital}</p>
                                    </article>
                                </div>
                                <div className="grid-12 grid__sm-12 grid__md-6 grid__lg-6 grid__xl-6">
                                    <article className="item__misc-info">
                                        <p><b>Top Level Domain:</b> {item.tld}</p>
                                        <p><b>Currencies:</b> {item.currencies[Object.keys(item.currencies)[0]].name}</p>
                                        <p><b>Languages:</b> {item.languages[Object.keys(item.languages)[0]]}</p>
                                    </article>
                                </div>
                                <div className="grid-12 grid__sm-12 grid__md-12 grid__lg-12 grid__xl-12">
                                    <article className="item__footer">
                                        <p><b>Border Countries: &nbsp;</b></p>
                                        <div className="flex flex-wrap">
                                            {
                                                item.borders ? item.borders.map((item, index) => (
                                                    <Link to={`/${item.toLowerCase()}`}>
                                                        <div className="badge" key={index}>{item}</div>
                                                    </Link>
                                                )) : '-'
                                            }
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : <div className="row align-items-center">
                        <div className="grid-12 grid__sm-6 grid__md-6 grid__lg-6 grid__xl-6">
                            <div className='item__image skeleton'></div>
                        </div>
                        <div className="grid-12 grid__sm-6 grid__md-6 grid__lg-6 grid__xl-6">
                            <div className="row">
                                <div className="grid-12 grid__sm-12 grid__md-12 grid__lg-12 grid__xl-12">
                                    <h1 className="skeleton">Title</h1>
                                </div>
                                <div className="grid-12 grid__sm-12 grid__md-6 grid__lg-6 grid__xl-6">
                                    <p className="skeleton"><b>Native Name:</b></p>
                                    <p className="skeleton"><b>Population:</b> </p>
                                    <p className="skeleton"><b>Region:</b> </p>
                                    <p className="skeleton"><b>Sub Region:</b> </p>
                                    <p className="skeleton"><b>Capital:</b> </p>
                                </div>
                                <div className="grid-12 grid__sm-12 grid__md-6 grid__lg-6 grid__xl-6">
                                    <p className="skeleton"><b>Top Level Domain:</b></p>
                                    <p className="skeleton"><b>Currencies:</b></p>
                                    <p className="skeleton"><b>Languages:</b></p>
                                </div>
                                <div className="grid-12 grid__sm-12 grid__md-12 grid__lg-12 grid__xl-12">
                                    <p className="flex align-items-center skeleton"><b>Border Countries: &nbsp;</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </section>
    );
};
