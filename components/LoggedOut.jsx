import { signInWithGoogle } from "@/auth";

const LoggedOut = () => {
  return (
    <>
      <div className="text-center">
        <h2>Please log in</h2>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      </div>
    </>
  );
};

export default LoggedOut;
