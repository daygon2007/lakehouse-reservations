// app/pages/index.js
import "../app/globals.scss";
import {
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestore, auth } from "../firebase";
import { useEffect, useState } from "react";
import Link from "next/link";
import LoggedOut from "@/components/LoggedOut";
import { signOut } from "@/auth";
import Nav from "@/components/Nav";
import Head from "next/head";

export default function Reservations() {
  const [userReservations, setUserReservations] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });
    // Fetch user's reservations from Firestore
    const fetchUserReservations = async () => {
      // Check if user is defined before attempting to access its properties
      if (!user || !user.email) {
        return;
      }

      const q = query(
        collection(firestore, "reservations"),
        where("requestor", "==", user.email)
      );
      const querySnapshot = await getDocs(q);

      const reservationsData = [];
      querySnapshot.forEach((doc) => {
        reservationsData.push({ id: doc.id, ...doc.data() });
      });

      setUserReservations(reservationsData);
    };

    fetchUserReservations();
  }, [user]);

  const handleCancelReservation = async (reservationId) => {
    try {
      // Delete the reservation document in Firestore
      await deleteDoc(doc(firestore, "reservations", reservationId));

      // Update the UI or trigger a re-fetch of reservations
      // to reflect the changes
      setUserReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation.id !== reservationId
        )
      );
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };
  return (
    <>
      <Head>
        <meta name="google" content="notranslate" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="bingbot" content="noindex, nofollow" />
      </Head>
      {user && (
        <div className="wrapper prose dark:prose-invert">
          <Nav />
          <h1 className="text-center">Lake House Reservations</h1>

          <div className="flex justify-between items-center content-center">
            <div className="flex justify-center items-center content-center">
              <img
                src={user?.photoURL}
                alt="User Profile"
                className="rounded-full align-self h-[50px] w-auto mr-[2rem]"
              />
              <p className="text-white inline align-self">
                Welcome, {user?.displayName || user?.email}!
              </p>
            </div>
            <button onClick={signOut} className="logout align-self">
              Sign Out
            </button>
          </div>

          <div>
            <h2>Your Reservations</h2>

            {userReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="rounded px-3 py-5 bg-blue text-black flex justify-between items-center content-center text-[24px] mb-10"
              >
                Reserved from{" "}
                {reservation?.startDate
                  ? new Date(reservation.startDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )
                  : "N/A"}{" "}
                to{" "}
                {reservation?.endDate
                  ? new Date(reservation.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A"}
                <button
                  className="logout"
                  onClick={() => handleCancelReservation(reservation?.id)}
                >
                  Cancel Reservation
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {!user && (
        <>
          <LoggedOut />
        </>
      )}
    </>
  );
}
