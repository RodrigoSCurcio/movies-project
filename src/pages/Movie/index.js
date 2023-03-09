import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "./movie.css";

function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await api.get(`movie/${id}`, {
        params: {
          api_key: "57da3732e35d8209bf2ad907968ca043",
          language: "pt-BR",
        }
      }).then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
        .catch(() => {
          console.log("not found");
          navigate("/", { replace: true });
        })
    })();

    return () => {
      console.log("component desmontado");
    }
  }, [id, navigate]);

  function saveMovie() {
    const myList = localStorage.getItem("@primemovies");

    let savedMovies = JSON.parse(myList) || [];

    const hasMovie = savedMovies.some((savedMovie) => savedMovie.id === movie.id);

    if (hasMovie) {
      toast.warning("Esse filme já esta na sua lista.")
      return;
    }

    savedMovies.push(movie);
    localStorage.setItem("@primemovies", JSON.stringify(savedMovies));
    toast.success("Filme salvo com sucesso!");
  }

  if (loading) {
    return (
      <div className="movie-info">
        <h2>Carregando filme...</h2>
      </div>
    )
  }

  return (
    <div className="movie-info">
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />

      <h3>Sinopse</h3>
      <span>{movie.overview}</span>
      <strong>Avaliação: {movie.vote_average} /10</strong>

      <div className="area-buttons">
        <button onClick={() => saveMovie()}>Salvar</button>
        <button>
          <a target="blank" rel="external noreferrer" href={`https://youtube.com/results?search_query=${movie.title} Trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}

export default Movie;