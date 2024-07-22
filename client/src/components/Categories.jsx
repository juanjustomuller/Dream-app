import { Link } from "react-router-dom";
import { categories } from "../data.js";
import "../styles/Categories.scss";

const Categories = () => {
  return (
    <div className="categories">
      <h1>Descubre las mejores cateogiras</h1>
      <p>
        Descubre nuestra amplia gama de alquileres vacacionales que se adaptan a
        todo tipo de viajeros. Sumérgete en la cultura local, disfruta de las
        comodidades del hogar y crea recuerdos inolvidables en tu destino
        soñado.
      </p>

{/*No hago un map pq hay muchas categorias(que luego las voy a mostrar mas abajo)
es por eso que corto con el slice a las mejores categorias, que serian 6, de la 1 a la 7, y
ahi si mapeo sobre esas 6*/}
      <div className="categories_list">
        {categories?.slice(1, 7).map((category, index) => (
            <Link to="" key={category.label}>
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
