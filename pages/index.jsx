// app/pages/index.js
import "../app/globals.scss";
import { useEffect, useState } from "react";
import { signInWithGoogle, signOut, handleUserRegistration } from "../auth";
import { auth, firestore } from "../firebase";
import LoggedOut from "@/components/LoggedOut";
import LoggedIn from "@/components/LoggedIn";
import Link from "next/link";
import Nav from "@/components/Nav";
import Head from "next/head";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        setUser(user);
        await handleUserRegistration(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup the subscription
  }, []);

  return (
    <>
      <Head>
        <meta name="google" content="notranslate" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="bingbot" content="noindex, nofollow" />
      </Head>
      <div className="wrapper prose dark:prose-invert">
        {user && <Nav />}
        <h1 className="text-center">Lake House Reservations</h1>
        {user ? <LoggedIn user={user} /> : <LoggedOut />}
        {/* Your app content goes here */}
      </div>
    </>
  );
}
