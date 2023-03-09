import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./home.css"

// URL da API movie/now_playing?api_key=57da3732e35d8209bf2ad907968ca043&language=pt-BR

function Home() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const response = await api.get("movie/now_playing", {
				params: {
					api_key: "57da3732e35d8209bf2ad907968ca043",
					language: "pt-BR",
					page: 1,
				}
			})

			setMovies(response.data.results.slice(0, 10))
			setLoading(false)
		})();
	}, []);

	if (loading) {
		return (
			<div className="loading">
				<h2>Carregando filmes...</h2>
			</div>
		)
	}

	return (
		<div className="container">
			<div className="movie-list">
				{movies.map((movie, index) => {
					return (
						<article key={index}>
							<strong>{movie.title}</strong>
							<img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
							<Link to={`/filme/${movie.id}`}>Acessar</Link>
						</article>
					)
				})}
			</div>
		</div>
	)
}

export default Home;