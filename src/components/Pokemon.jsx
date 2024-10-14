import { useEffect, useState } from "react";

function Pokemon() {
  const [pokemonList, setPokemonList] = useState([]);

  async function getAllPokemon() {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon";
    const resData = await fetch(apiUrl);
    const jsonData = await resData.json();

    // console.log(jsonData);

    setPokemonList(jsonData.results);
  }

  useEffect(() => {
    getAllPokemon();
  }, []);

  console.log(pokemonList);

  return <div>Hai</div>;
}

export default Pokemon;

// async await untuk mengambil data dimana datanya berbentuk promise
// fetch api
