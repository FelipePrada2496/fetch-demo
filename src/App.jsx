import { useEffect, useState, } from 'react'
import './App.css'
import axiosInstance from './api';
import Summary from './component/Sumary';
import Carousel from './component/Carousel';

/**
 * 1. Fix Issues on Carrousel
 * 2. every card on Carrousel must have image
 * 3. the image must come from the api
 * you can use UseEffect or UseState to solve the issues on the project
 */

function App() {
  const [pokeList, setPokeList] = useState([]);
  const [selectedPoke, setSelectedPoke] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const data = await axiosInstance.get(`/pokemon?limit=6&offset=${currentPage}`);
      setPokeList(data.data.results);
    };
    fetchData();
  }, [currentPage]);


  const getInfo = async (url) => {
    const data = await axiosInstance.get(url);
    setSelectedPoke({ img: data.data.sprites.front_default, stats: data.data.stats });
  };


  const getPokemonList = ()=> {
    return pokeList.map((pokemon)=>{
      return {
        name: pokemon.name,
        img: '/whos.jpg',
        onClick: ()=> getInfo(pokemon.url)
      }
    })
  }


  useEffect(() => {
    const fetchImages = async () => {
      const updatedPokemonList = await Promise.all(
        pokeList.map(async (pokemon) => {
          const response = await axiosInstance.get(pokemon.url);
          const img = response.data.sprites.front_default;
          return { ...pokemon, img };
        })
      );
      setPokeList(updatedPokemonList);
    };
    fetchImages();
  }, [pokeList]);


  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };


  const onPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };


  return (
    <div className={`flex flex-col w-full h-screen items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8`}>
      <button className='ml-auto' onClick={() => setIsDarkMode(!isDarkMode)}>
        <img width="35px" height="35px" src={isDarkMode ? '/sun.svg' : '/moon.svg'} alt="Theme toggle" />
      </button>
      <h1 className={`mb-5 text-3xl font-bold uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}> PokeDex</h1>
      <Carousel onLeftClick={onPrevPage} onRightClick={onNextPage} elementList={getPokemonList()} />
      <div>
        {Object.keys(selectedPoke).length > 0 && <Summary data={selectedPoke} />}
      </div>
    </div>
  );
}

export default App;