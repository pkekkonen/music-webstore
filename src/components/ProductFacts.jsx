/* eslint-disable react/prop-types */
function ProductFacts({ product }) {
  if (product) {
    return (
      <>
        {" "}
        <h3>DETAILS</h3>
        <div className="details">
          <div>
            <p><strong>Artist: </strong></p>
            <p><strong>Label:</strong></p>
            <p><strong>Release:</strong></p>
            <p><strong>Genres:</strong></p>
          </div>
          <div>
            <p>{product.artist?product.artist:"-"}</p>
            <p>{product.recordCompany?product.recordCompany:"-"}</p>
            <p>{product.releaseYear?product.releaseYear:"-"}</p>

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
