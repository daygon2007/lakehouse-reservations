// BookingModal.js
import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { setDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase";

const BookingModal = ({
  isOpen,
  onClose,
  selectedDate,
  user,
  refreshCalendar,
}) => {
  const [guests, setGuests] = useState("");
  useEffect(() => {}, [selectedDate]);

  const updateGuests = (e) => {
    setGuests(e.target.value);
  };

  const handleReservation = async () => {
    // Check if selectedDate is an array and has at least two elements
    if (Array.isArray(selectedDate) && selectedDate.length >= 2) {
      // Validate guests input
      const guestsNumber = parseInt(guests, 10);

      if (isNaN(guestsNumber) || guestsNumber < 1 || guestsNumber > 16) {
        // Guests input is not a valid number or is out of range
        console.error("Invalid guests input:", guests);
        // Optionally, you can display an error message to the user
        alert("You can't have more than 16 people at the house, sorry.");
        return;
      }

      await setDoc(
        doc(firestore, "reservations", selectedDate[0].toISOString()),
        {
          requestor: user?.user?.email,
          requestorName: user?.user?.displayName,
          startDate: selectedDate[0].toISOString(),
          endDate: selectedDate[1].toISOString(),
          guests: guests,
        }
      );
      onCloseWithRefresh();
    } else {
      console.error("Invalid selectedDate:", selectedDate);
    }
  };

  const onCloseWithRefresh = () => {
    onClose(); // Close the modal
    refreshCalendar(); // Notify the parent about the refresh
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        {/* Your modal content goes here */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel
            className="mx-auto max-w-lg rounded bg-white px-20 py-10
           text-black"
          >
            <Dialog.Title className="text-black text-lg font-bold mb-[12px]">
              Booking Details
            </Dialog.Title>
            <Dialog.Description className="text-black">
              <form data-netlify="true" name="reservationRequest">
                <div className="mb-[12px]">
                  <label>Requestor:</label>{" "}
                  <input
                    type="text"
                    id="requestor"
                    className="inline"
                    name="requestor"
                    value={user?.user?.displayName || user?.user?.email}
                    disabled
                  />
                </div>
                <div className="mb-[12px]">
                  <label>Start:</label>{" "}
                  <input
                    type="text"
                    id="startDate"
                    name="startDate"
                    disabled
                    className="inline"
                    value={selectedDate?.[0]?.toLocaleDateString() || "N/A"}
                  />
                </div>

                <div className="mb-[12px]">
                  <label>End:</label>{" "}
                  <input
                    type="text"
                    id="endDate"
                    name="endDate"
                    disabled
                    className="inline"
                    value={selectedDate?.[1]?.toLocaleDateString() || "N/A"}
                  />
                </div>

                <div className="mb-[12px]">
                  <label>How many people?</label>{" "}
                  <input
                    type="number"
                    id="guests"
                    onChange={updateGuests}
                    required
                    aria-required
                    max={"16"}
                  />
                </div>
                <button
                  className="bg-blue mr-[24px]"
                  type="submit"
                  onClick={handleReservation}
                >
                  Save
                </button>
                <button onClick={onClose}>Close</button>
              </form>
            </Dialog.Description>
            {/* Close button */}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BookingModal;
