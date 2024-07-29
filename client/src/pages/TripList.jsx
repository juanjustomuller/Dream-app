import { useEffect, useState } from "react";
import "../styles/List.scss";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader.jsx";
import NavBar from "../components/NavBar";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard.jsx";
import Footer from "../components/Footer.jsx";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user?._id);
  const tripList = useSelector((state) => state.user.tripList);

  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/trips`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setTripList(data));
      setLoading(false);
    } catch (error) {
      console.log("Fetch trip list failed!", error.message);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />

      <h1 className="title-list">Your trip list</h1>
      <div className="list">
        {tripList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
          <ListingCard 
            key={listingId}
            creator={hostId._id}
            listingId={listingId._id}
            startDate={startDate}
            endDate={endDate}
            totalPrice={totalPrice}
            listingPhotoPaths={listingId.listingPhotoPaths}
            city={listingId.city}
            province={listingId.province}
            country={listingId.country}
            category={listingId.category}
            booking={booking}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default TripList;
