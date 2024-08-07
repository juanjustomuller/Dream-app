import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const PropertyList = () => {
    const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList;

  const dispatch = useDispatch()

  const getPropertyList = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/users/${user._id}/properties`, {
        method: "GET"
      });
      const data = await response.json()
      dispatch(setPropertyList(data))
      setLoading(false)
    } catch (error) {
        console.log("Fetch all properties failed!", error.message);
    }
  };

  useEffect(() => {
    getPropertyList()
  }, [])

  return loading ? <Loader /> : (
    <>
      <NavBar />

      <h1 className="title-list">Your Property List</h1>
      <div className="list">
        {propertyList?.map(
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
      <Footer />
    </>
  );
};

export default PropertyList;
