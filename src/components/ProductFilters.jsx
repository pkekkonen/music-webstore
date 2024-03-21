import { useContext, useEffect, useState } from "react";
import { ProductContext } from "./Store";

function ProductFilters() {
  const productsContext = useContext(ProductContext);
  const { products } = productsContext;
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
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

  // useEffect(() => {
  //   console.log(artists);
  // }, [artists]);
  // useEffect(() => {
  //   console.log(genres);
  // }, [genres]);
  // useEffect(() => {
  //   console.log(companies);
  // }, [companies]);

  if (products) {
    return (
   
        <div className="filters">
          <div>
            <strong>Artist</strong>
            {[...artists].map((a) => (
              <div key={a}>
                <div>{a}</div>
                <input type="checkbox" title={a} name={a}></input>
              </div>
            ))}
          </div>
          <hr/>
          <div>
            <strong>Genre</strong>
            {[...genres].map((g) => (
              <div key={g}>
                <div>{g}</div>
                <input type="checkbox" title={g} name={g}></input>
              </div>
            ))}
          </div>
          <div>          <hr/>

            <strong>Record Company</strong>
            {[...companies].map((c) => (
              <div key={c}>
                <div>{c}</div>
                <input type="checkbox" title={c} name={c}></input>
              </div>
            ))}
          </div>
        </div>
 
    );
  }

  return <>Loding...</>;
}
export default ProductFilters;
