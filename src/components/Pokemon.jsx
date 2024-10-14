import { useEffect, useState } from "react";

function Pokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);
  const [prevUrl, setPrevUrl] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [apiUrl, setApiUrl] = useState("https://pokeapi.co/api/v2/pokemon");

  async function getAllPokemon() {
    const resData = await fetch(apiUrl);
    const jsonData = await resData.json();
    // console.log(jsonData);

    setPrevUrl(jsonData.previous || "");
    setNextUrl(jsonData.next || "");

    let pokemonDetail = [];

    jsonData.results.map(async (item, index) => {
      const resDataDetail = await fetch(item.url);
      const jsonDataDetail = await resDataDetail.json();

      pokemonDetail[index] = jsonDataDetail;
      setPokemonList([...pokemonDetail]);
    });

    console.log(pokemonDetail);
  }

  function pokemonDetail() {
    return (
      <div className="detail">
        <div className="item">
          <a onClick={() => setDetail(false)}>x</a>
          <div className="image">
            <img src={dataDetail.sprites.other.dream_world.front_default} />
          </div>
          <div className="title">{dataDetail.name}</div>
          <div className="abilities">
            {dataDetail.abilities.map((item, index) => {
              return <span key={index}>{item.ability.name}</span>;
            })}
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    getAllPokemon();
    setLoading(false);
  }, [apiUrl]);

  // console.log(pokemonList);

  return (
    <>
      <div className="wrapper">
        <div className="content">
          {loading && (
            <div className="loading">
              ngeteh dulu broo, halaman sedang di-load...
            </div>
          )}

          {detail && pokemonDetail()}

          <div className="grid">
            {pokemonList.map((item, index) => {
              return (
                <div
                  className="item"
                  key={index}
                  onClick={() => {
                    setDetail(true);
                    setDataDetail(item);
                  }}
                >
                  <div className="image">
                    <img src={item.sprites.front_default} />
                  </div>
                  <div className="title">{item.name}</div>
                </div>
              );
            })}
          </div>
          {prevUrl && (
            <div className="pagination-left">
              <button
                onClick={() => {
                  setApiUrl(prevUrl);
                }}
              >
                &laquo;
              </button>
            </div>
          )}

          {nextUrl && (
            <div className="pagination-right">
              <button
                onClick={() => {
                  setApiUrl(nextUrl);
                }}
              >
                &raquo;
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Pokemon;

// async await untuk mengambil data dimana datanya masih berbentuk promise lalu pake json [await resDataDetail.json()]
// fetch api
// pelajari useState(0, true, [], dll)
// pelajari fetch data async await
//
