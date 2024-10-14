import { useEffect, useState } from "react";

function Pokemon() {
  const [pokemonList, setPokemonList] = useState([]);

  async function getAllPokemon() {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon";
    const resData = await fetch(apiUrl);
    const jsonData = await resData.json();
    // console.log(jsonData);

    let pokemonDetail = [];

    jsonData.results.map(async (item, index) => {
      const resDataDetail = await fetch(item.url);
      const jsonDataDetail = await resDataDetail.json();

      pokemonDetail[index] = jsonDataDetail;
      setPokemonList([...pokemonDetail]);
    });

    console.log(pokemonDetail);
  }

  useEffect(() => {
    getAllPokemon();
  }, []);

  // console.log(pokemonList);

  return (
    <>
      <div className="wrapper">
        <div className="content">
          <div className="grid">
            {pokemonList.map((item, index) => {
              return (
                <div className="item" key={index}>
                  <div className="image">
                    <img src={item.sprites.front_default}></img>
                  </div>
                  <div className="title">{item.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Pokemon;

// async await untuk mengambil data dimana datanya masih berbentuk promise lalu pake json [await resDataDetail.json()]
// fetch api
