import { useEffect, useState } from "react";
import { categories } from "../data.js";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard.jsx";
import Loader from "./Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state.js";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `${SERVER_URL}/properties?category=${selectedCategory}`
          : `${SERVER_URL}/properties`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (error) {
      console.log("Fetch Listings failed", error.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  console.log("Listings (?):", listings);

  return (
    <>
      <div className="category-list">
        {categories?.map((category, index) => (
          <div
            className={`category ${category.label === selectedCategory ? "selected" : ""}`}
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
            (
              {
                _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking
              }
            ) => (
              <ListingCard 
              listingId={_id}
              creator = {creator}
              listingPhotoPaths = {listingPhotoPaths} 
              city = {city}
              province = {province}
              country= {country}
              category = {category}
              type = {type}
              price = {price}
              booking = {booking}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings;
