import { useEffect, useState } from "react";
import "../styles/List.scss";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader.jsx";
import NavBar from "../components/NavBar";
import { setReservationList } from "../redux/state";
import ListingCard from "../components/ListingCard.jsx";
import Footer from "../components/Footer.jsx";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user?._id);
  const reservationList = useSelector((state) => state.user.reservationList);

  const dispatch = useDispatch();

  const getReservationList = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/users/${userId}/reservations`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setReservationList(data));
      setLoading(false);
    } catch (error) {
      console.log("Fetch reservation list failed!", error.message);
    }
  };

  useEffect(() => {
    getReservationList();
  }, [userId]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />

      <h1 className="title-list">Your reservation list</h1>
      <div className="list">
        {reservationList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
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

export default ReservationList;
