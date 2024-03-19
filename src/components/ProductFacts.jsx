/* eslint-disable react/prop-types */
function ProductFacts({ product }) {
  if (product) {
    return (
      <>
        <div>
          <h3>DETAILS</h3>
          <div>
            <strong>Artist: </strong>
            <strong>Label:</strong>
            <strong>Release:</strong>
            <strong>Genres:</strong>
          </div>
          <div>
            <p>{product.artist}</p>
            <p>{product.record_company}</p>
            <p>{product.release_year}</p>
            {product.genres &&
              product.genres.map((genre) => {
                return <p key={genre}>{genre}</p>;
              })}
          </div>
        </div>
      </>
    );
  }
  return <>Loading...</>;
}
export default ProductFacts;
