import { useEffect, useState, } from 'react'
import './App.css'
import axiosInstance from './api';
import Summary from './component/Sumary';
import Carousel from './component/Carousel';

function App() {
  const [pokeList, setPokeList] = useState([]);
  const [selectedPoke, setSelectedPoke] = useState({});
  const [currentPage, setPage] = useState(0);
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


  const onNextPage = async () => {
    const nextPage = currentPage + 1; // Obtener la siguiente página
    setPage(nextPage); // Actualizar currentPage
    const data = await axiosInstance.get(`/pokemon?limit=6&offset=${nextPage * 6}`); // Usar nextPage
    setPokeList(data.data.results);
  }
  
  const onPrevPage = async () => {
    if (currentPage > 0) { // Asegurarse de que no se vaya a una página negativa
      const prevPage = currentPage - 1; // Obtener la página anterior
      setPage(prevPage); // Actualizar currentPage
      const data = await axiosInstance.get(`/pokemon?limit=6&offset=${prevPage * 6}`); // Usar prevPage
      setPokeList(data.data.results);
    }
  }
  
  

  return (
    <div className={`flex flex-col w-full h-screen items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8`}>
      <button className='ml-auto' onClick={() => setIsDarkMode(!isDarkMode)}>
        <img width="35px" height="35px" src={isDarkMode ? '/sun.svg' : '/moon.svg'} alt="Theme toggle" />
      </button>
      <h1 className={`mb-5 text-3xl font-bold uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}> PokeDex</h1>
      <Carousel onLeftClick={onPrevPage} onRightClick={onNextPage} elementList={getPokemonList()}/>
      <div>
        {Object.keys(selectedPoke).length > 0 && <Summary data={selectedPoke} />}
      </div>
    </div>
  );
}

export default App;