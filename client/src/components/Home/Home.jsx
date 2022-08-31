import { filterActivity, filterCountriesByContinent, getActivities, getCountries, orderName } from '../../actions/actions';
import { orderbypop } from '../../actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect,useState } from 'react';
import Paginado from '../Paginado/Paginado';
import './Home.css'
import Navbar from '../NavBar/NavBar';
import Card from '../Card/Card';
import Loading from '../Loading/Loading';
import imageBackground from "../utils/fondoPrinc.jpg"

const Home = () => {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const allActivities = useSelector((state) => state.activities);
    const [ordenado, setOrdenado] = useState("");
    const [currentPage, setcurrentPage] = useState(1);
    const [countryPerPage, setcountryPerPage] = useState(9);
    const indexOfLastCountry = currentPage * countryPerPage;
    const indexOfFirstCountry= indexOfLastCountry - countryPerPage;
    const currentCountry = allCountries?.slice(indexOfFirstCountry,indexOfLastCountry);

        function paginate(pageNumber){
            setcurrentPage(pageNumber)
            if(pageNumber >= 2){
                setcountryPerPage(10)
            }
            else{
                setcountryPerPage(9)
            }
        }   
    


    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities());
        }, [dispatch]);

    useEffect(() => {
        setcurrentPage(1);
        }, [allCountries]); //para que en un filtro no te muestre la segunda pag

        function handleCountries(e){
            e.preventDefault()
            dispatch(getCountries())
            setOrdenado("")
        }

        function handleOrderName(e) {
            e.preventDefault();
            dispatch(orderName(e.target.value));
            setOrdenado(`Ordered by  ${e.target.value}`);
    }
        function handleOrderByPop(e) {
        e.preventDefault();
        dispatch(orderbypop(e.target.value));
        setcurrentPage(1);
        setOrdenado(`Ordered by  ${e.target.value}`);
}
        function handleOrderByAct(e){
            e.preventDefault()
            dispatch(filterActivity(e.target.value))
            setOrdenado(`Ordered by  ${e.target.value}`);
        }
        function handleByContinent(e){
            e.preventDefault()
            dispatch(filterCountriesByContinent(e.target.value))
            setOrdenado(`Ordered by  ${e.target.value}`);
        }

    return (
        <>
        {currentCountry.length ?
         
        <div className='background'>
            
            <Navbar />
                
                <div className='filters'>
                <div className='div'>
                    <label className='label'>Sort by population: </label>
                    <select className='select' onChange={(e) => handleOrderByPop(e)}>
                        <option selected disabled>Highest to lower</option>
                        <option value="Ascendant population">Ascendant</option>
                        <option value="Descendant population">Descendant</option>
                    </select>
                </div>
                <div>
                    <label className='label'>Sort by name: </label>
                    <select className='select' onChange={(e) => handleOrderName(e)}>
                        <option selected disabled>A-Z</option>
                        <option value="Ascendant">Ascendant</option>
                        <option value="Descendant">Descendant</option>
                    </select>
                </div>
                <div>
                    <label className='label'>Sort by continent: </label>
                    <select className='select'
                    onChange={(e) => handleByContinent(e)}
                    >
                    <option value="All">All</option>
                    <option value="Africa">Africa</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Antarctica">Antarctica</option>
                    </select>
                </div>
                <div>
                        <label className='label'>Sort by act: </label>
                    <select className='select' onChange={(e) => handleOrderByAct(e)}>
                        <option>Select</option>
                        {allActivities && allActivities.map(e=>{
                            return <option>{e.name}</option>
                        })}
                    </select>
                </div>
                <button className={`btn res`} onClick={(e) =>handleCountries(e)}>🔄</button>
                </div>
                
            <div className='backgroundCountries' src={imageBackground}>

                {ordenado? <h1 className='h1'>{ordenado}</h1>: <h1 className='h1'>Countries</h1>}
                    <div className='wrapper'>
                        {currentCountry.map(country =>{
                            return (
                                <div key={country.id} className='container'>
                                <Card name={country.name} continent={country.continent} flag={country.img} key={country.id} id={country.id}/>
                                </div>
                            )
                        })
                        }
                    </div>
                            <Paginado
                                countryPerPage={countryPerPage}
                                allCountries={allCountries.length}
                                paginate={paginate}
                                />
            </div>        
        </div>
        : <Loading/ >}        
        </>
    );
}

export default Home;

