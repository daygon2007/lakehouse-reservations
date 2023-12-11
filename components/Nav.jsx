import "../app/globals.scss";
import Link from "next/link";

const Nav = () => {
  return (
    <>
      <div className="text-center block">
        <Link
          href="/"
          className="py-[2rem] px-[3rem] hover:bg-yellow hover:text-black inline-block"
        >
          Home
        </Link>
        <Link
          href="/reservations"
          className="py-[2rem] px-[3rem] hover:bg-yellow hover:text-black inline-block"
        >
          My Reservations
        </Link>
        <Link
          href="/rules"
          className="py-[2rem] px-[3rem] hover:bg-yellow hover:text-black inline-block"
        >
          House Rules
        </Link>
      </div>
    </>
  );
};

export default Nav;
