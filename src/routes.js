import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Error from "./pages/Error";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import MyMovies from "./pages/MyMovies";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Movie />} />
        <Route path="/meus-filmes" element={<MyMovies />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp;