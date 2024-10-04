import NavBar from "../components/NavBar";
import Billboard from "../components/Billboard";
import MovieList from "../components/MovieList";
import useMoviesList from "../hooks/useMoviesList";
import { useState, useRef, useCallback } from "react";
import LoadingCards from "../components/LoadingCards";

export default function BrowsePage() {

  const [offset, setOffset] = useState(0);
  const { data, error, loading } = useMoviesList(offset);

  const observer = useRef<null | IntersectionObserver>(null);

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      console.log(entries);
      
      if (entries[0].isIntersecting) {
        setOffset(offset + 12);
        console.log("intersecting");

      }
    })

    if (node) observer.current.observe(node)

  }, [loading])


  return (
    <div>
      <NavBar />
      <Billboard />
      <div className="pb-5">
        {error && <p>{error}</p>}
        {data && <MovieList movies={data} lastElementRef={lastElementRef} />}
        {loading ? <LoadingCards /> : null}
      </div>
    </div>
  );
}