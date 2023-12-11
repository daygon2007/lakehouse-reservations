// LoggedIn.js
import { signOut } from "@/auth";
import MyCalendar from "./Calendar";
import BookingModal from "./BookingModal";
import { useState } from "react";

const LoggedIn = (user) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [refreshCalendar, setRefreshCalendar] = useState(false);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
  };

  const toggleRefreshCalendar = () => {
    setRefreshCalendar((prev) => !prev); // Toggle the state to trigger a refresh
  };

  return (
    <>
      <div className="flex justify-between items-center content-center">
        <div className="flex justify-center items-center content-center">
          <img
            src={user?.user?.photoURL}
            alt="User Profile"
            className="rounded-full align-self h-[50px] w-auto mr-[2rem]"
          />
          <p className="text-white inline align-self">
            Welcome, {user?.user?.displayName || user?.user?.email}!
          </p>
        </div>
        <button onClick={signOut} className="logout align-self">
          Sign Out
        </button>
      </div>

      <section id="calendar">
        <p>
          Please book your time for the lakehouse. If the time is booked you
          cannot book over the time, if you have any questions about a
          reservation please reach out to the person who has reserved the dates.
        </p>
        <MyCalendar
          onDateSelection={handleDateSelection}
          refresh={refreshCalendar}
        />
        <BookingModal
          isOpen={selectedDate !== null}
          onClose={handleCloseModal}
          selectedDate={selectedDate}
          user={user}
          refreshCalendar={toggleRefreshCalendar}
        />
      </section>
    </>
  );
};

export default LoggedIn;
