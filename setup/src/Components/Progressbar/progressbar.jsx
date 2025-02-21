import {useState,useEffect} from 'react'
import './progressbar.css'
import Progress from '../Progress/progress';
const COUNTRIES_URL ='https://restcountries.com/v3.1/all'
const selectedCountries = [
    "China",
    "United Kingdom",
    "United Arab Emirates",
    "Italy",
    "Turkey",
    "Netherlands",
    "South Africa",
  ];
function ProgressBar({className}){
    const [countries,setCountries] = useState([])
    useEffect(() => {
        async function fetchCountriesData(){
            try{
                const res = await fetch(COUNTRIES_URL)
                if(!res.ok) throw new Error('There was an error fetching countries data')
                const data = await res.json()
                setCountries(data)
            }catch(error){
                console.log(error)
            }
        }
        fetchCountriesData()
    },[])
    const filteredCountries = countries?.filter((country) => {
       return selectedCountries.includes(country.name.common)
    })
    console.log(filteredCountries)
    return (
        <div className={`countries ${className || ''}`}>
            {filteredCountries.map((country,i) => (
                <div key={i} className='countryContainer'>
                    <img src={country.flags.png} alt="" />
                    <Progress/>
                    {/* <p>{country.name.common}</p> */}
                </div>
            ))}
        </div>
    )
}
export default ProgressBar