import { useContext, useEffect, useState } from "react";
import { ProductContext } from "./Store";

function ProductFilters() {
  const productsContext = useContext(ProductContext);
  const { products } = productsContext;
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    console.log(products);
    let artistList = [];
    let genreList = [];
    let companyList = [];

    products.forEach((p) => {
      artistList.push(p.artist);
      genreList.push(...p.genres);
      companyList.push(p.record_company);
    });
    setArtists(new Set(artistList));
    setGenres(new Set(genreList));
    setCompanies(new Set(companyList));
  }, [products]);

  useEffect(() => {
    console.log(artists);
  }, [artists]);
  useEffect(() => {
    console.log(genres);
  }, [genres]);
  useEffect(() => {
    console.log(companies);
  }, [companies]);

  if (products) {
    return (
      <>
        <div>
          <div>
            <strong>Artist</strong>
            {[...artists].map((a) => (
              <>
                <div>{a}</div>
                <input key={a} type="checkbox" title={a} name={a}></input>
              </>
            ))}
          </div>
          <div>
            <strong>Genre</strong>
            {[...genres].map((g) => (
              <>
                <div>{g}</div>
                <input key={g} type="checkbox" title={g} name={g}></input>
              </>
            ))}
          </div>
          <div>
            <strong>Record Company</strong>
            {[...companies].map((c) => (
              <>
                <div>{c}</div>
                <input key={c} type="checkbox" title={c} name={c}></input>
              </>
            ))}
          </div>
        </div>
      </>
    );
  }

  return <>Loding...</>;
}
export default ProductFilters;
