
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./myMovies.css";

function MyMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const myList = localStorage.getItem("@primemovies");

    setMovies(JSON.parse(myList) || []);
  }, []);

  function removeMovie(id) {
    let filterMovies = movies.filter((item) => {
      return (item.id !== id);
    })

    setMovies(filterMovies);
    localStorage.setItem("@primemovies", JSON.stringify(filterMovies));
    toast.success("Filme removido com sucesso!");
  };

  return (
    <div className="my-movies">
      <h1>Meus Filmes</h1>

      {movies.length === 0 && <span>Você não possui nenhum filme salvo.</span>}

      <ul>
        {movies.map((movie, index) => {
          return (
            <li key={index}>
              <span>{movie.title}</span>
              <div>
                <Link to={`/filme/${movie.id}`}>Ver detalhes</Link>
                <button onClick={() => removeMovie(movie.id)}>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default MyMovies;