import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
import ListingCard from "../components/ListingCard";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const dispatch = useDispatch()
  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties?category=${category}`,
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
  }, [category]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <h1 className="title-list">{category} listings</h1>
      <div className="list">
        {listings?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
            />
          )
        )}
      </div>
    </>
  );
};

export default CategoryPage;
