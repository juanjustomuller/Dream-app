import { Link } from "react-router-dom";
import { categories } from "../data.js";
import "../styles/Categories.scss";

const Categories = () => {
  return (
    <div className="categories">
      <h1>Explore Top Categories</h1>
      <p>
      Explore our wide range of vacation rentals that cater to all types of
        travelers. Immerse yourself in the local culture, enjoy the comforts of
        home, and create unforgettable memories in your dream destination.
      </p>

{/*No hago un map pq hay muchas categorias(que luego las voy a mostrar mas abajo)
es por eso que corto con el slice a las mejores categorias, que serian 6, de la 1 a la 7, y
ahi si mapeo sobre esas 6*/}
      <div className="categories_list">
        {categories?.slice(1, 7).map((category, index) => (
            <Link to={`/properties/category/${category.label}`} key={category.label}>
                <div className="category" key={index}>
                    <img src={category.img} alt={category.label} />
                    <div className="overlay"></div>
                    <div className="category_text">
                        <div className="category_text_icon">{category.icon}</div>
                        <p>{category.label}</p>
                    </div>
                </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
