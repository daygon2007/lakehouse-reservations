// MyCalendar.js
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getDocs, collection, query, where } from "firebase/firestore";
import { firestore } from "../firebase";

const MyCalendar = ({ onDateSelection, refresh }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [existingSchedule, setExistingSchedule] = useState([]);
  const [requestor, setRequestor] = useState("");
  const [internalRefresh, setInternalRefresh] = useState(false);
  const [guests, setGuests] = useState("");

  useEffect(() => {
    // Fetch existing schedule data from Firestore
    const fetchExistingSchedule = async () => {
      const q = query(collection(firestore, "reservations"));
      const querySnapshot = await getDocs(q);

      const scheduleData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setGuests(data?.guests);
        setRequestor(data?.requestor);
        scheduleData.push({
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          guests: data.guests,
          requestor: data.requestorName || data.requestor,
        });
      });

      setExistingSchedule(scheduleData);
    };

    fetchExistingSchedule();
    setInternalRefresh((prev) => !prev);
  }, [refresh]);

  const handleDateChange = (date) => {
    setSelectedDates(date);
    onDateSelection(date);
  };

  const tileContent = ({ date }) => {
    // Check if the date has existing schedule
    const matchingSchedule = existingSchedule.find((schedule) => {
      const startDateWithoutTime = new Date(schedule.startDate);
      startDateWithoutTime.setHours(0, 0, 0, 0);

      const endDateWithoutTime = new Date(schedule.endDate);
      endDateWithoutTime.setHours(23, 59, 59, 999); // Set to end of the day

      const dateWithoutTime = new Date(date);
      dateWithoutTime.setHours(0, 0, 0, 0);

      return (
        dateWithoutTime >= startDateWithoutTime &&
        dateWithoutTime <= endDateWithoutTime
      );
    });

    // Customize content based on date status
    if (matchingSchedule) {
      return (
        <div className="scheduled-day text-xs mt-[18px]">
          Reserved by: {matchingSchedule.requestor}
          <br />
          Number of Guests: {matchingSchedule.guests}
        </div>
      ); // Style this div for scheduled dates
    } else {
      return null; // Default case, no special content for other dates
    }
  };

  const tileDisabled = ({ date }) => {
    // Disable past dates
    if (date < new Date()) {
      return true;
    }

    // Disable dates with existing schedules
    const hasSchedule = existingSchedule.some((schedule) => {
      const startDateWithoutTime = new Date(schedule.startDate);
      startDateWithoutTime.setHours(0, 0, 0, 0);

      const endDateWithoutTime = new Date(schedule.endDate);
      endDateWithoutTime.setHours(23, 59, 59, 999);

      const dateWithoutTime = new Date(date);
      dateWithoutTime.setHours(0, 0, 0, 0);

      return (
        dateWithoutTime >= startDateWithoutTime &&
        dateWithoutTime <= endDateWithoutTime
      );
    });

    return hasSchedule;
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={selectedDates}
        selectRange={true}
        tileContent={tileContent}
        tileDisabled={tileDisabled}
        className="bg-blue-500 p-2 rounded-md"
        calendarClassName="bg-white border p-4 rounded-md"
      />
    </div>
  );
};

export default MyCalendar;
