import { useContext, useEffect, useState } from "react";
import { FilterContext, ProductContext } from "./Store";

function ProductFilters() {
  const productsContext = useContext(ProductContext);
  const filterContext = useContext(FilterContext);
  const { products } = productsContext;
  const { filters, onSetFilters } = filterContext;
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [checkedArtists, setCheckedArtists] = useState([]);
  const [checkedGenres, setCheckedGenres] = useState([]);
  const [checkedCompanies, setCheckedCompanies] = useState([]);

  function onCheckedArtist(event) {
    const name = event.target.name;
    const checked = event.target.checked;
    if (checked) {
      setCheckedArtists([...checkedArtists, name]);
    } else {
      setCheckedArtists(checkedArtists.filter((a) => a != name));
    }
  }
  function onCheckedGenre(event) {
    const name = event.target.name;
    const checked = event.target.checked;
    if (checked) {
      setCheckedGenres([...checkedGenres, name]);
    } else {
      setCheckedGenres(checkedGenres.filter((a) => a != name));
    }
  }
  function onCheckedCompany(event) {
    const name = event.target.name;
    const checked = event.target.checked;
    if (checked) {
      setCheckedCompanies([...checkedCompanies, name]);
    } else {
      setCheckedCompanies(checkedCompanies.filter((a) => a != name));
    }
  }

  useEffect(() => {
    onSetFilters({ ...filters, artists: checkedArtists });
  }, [checkedArtists]);
  useEffect(() => {
    onSetFilters({ ...filters, genres: checkedGenres });
  }, [checkedGenres]);
  useEffect(() => {
    onSetFilters({ ...filters, companies: checkedCompanies });
  }, [checkedCompanies]);
  useEffect(() => {
    let artistList = [];
    let genreList = [];
    let companyList = [];

    products.forEach((p) => {
      artistList.push(p.artist);
      genreList.push(...p.genres);
      companyList.push(p.recordCompany);
    });
    setArtists(new Set(artistList));
    setGenres(new Set(genreList));
    setCompanies(new Set(companyList));
  }, [products]);

  if (products) {
    return (
      <div className="filters">
        <div>
          <strong>Artist</strong>
          {[...artists].map((a) => (
            <div key={a}>
              <div>{a}</div>
              <input
                type="checkbox"
                title={a}
                name={a}
                onChange={onCheckedArtist}
              ></input>
            </div>
          ))}
        </div>
        <hr />
        <div>
          <strong>Genre</strong>
          {[...genres].map((g) => (
            <div key={g}>
              <div>{g}</div>
              <input
                type="checkbox"
                title={g}
                name={g}
                onChange={onCheckedGenre}
              ></input>
            </div>
          ))}
        </div>
        <div>
          <hr />
          <strong>Record Company</strong>
          {[...companies].map((c) => (
            <div key={c}>
              <div>{c}</div>
              <input
                type="checkbox"
                title={c}
                name={c}
                onChange={onCheckedCompany}
              ></input>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <>Loding...</>;
}
export default ProductFilters;
