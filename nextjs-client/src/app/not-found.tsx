"use client";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div
      data-testid="not-found-page"
      className="outline min-h-[84vh] flex flex-col items-center justify-center "
    >
      <div className="text-center">
        <h1 className="text-6xl overflow-hidden ">Oops!</h1>
        <div className="z-30">
          <h2 className=" text-2xl ">404 - THE PAGE CAN&apos;T BE FOUND.</h2>
        </div>
      </div>
      <Link
        href="/"
        className="bg-orange-500 p-1 hover:bg-orange-400 rounded shadow text-white"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
