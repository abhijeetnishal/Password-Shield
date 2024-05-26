import React from "react";
import getStartedImage from "@/public/assets/getStartedImage.png";
import rightArrow from "@/public/assets/rightArrow.png";
import subMoreInfoImg1 from "@/public/assets/subMoreInfoImg1.png";
import subMoreInfoImg2 from "@/public/assets/subMoreInfoImg2.png";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Headers/Header";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const LandingPage = () => {
  const token = cookies().get("token")?.value;

  if (token) {
    redirect("/dashboard");
  }

  return (
    <div data-testid="landing-page" className="">
      <div className="flex flex-col">
        <Header />
        <section
          data-testid="hero-section"
          className=" bg-amber-50 flex flex-col items-center justify-center py-24"
        >
          <Image src={getStartedImage} alt="" className="mb-12" />
          <div className="w-80 flex flex-col items-center text-center">
            <h1 className="text-xl font-semibold">Transparent & Secured</h1>
            <p className="text-sm text-gray-500 my-4">
              Only you can see your personal data. All your password within a
              reach so you don&apos;t have to crack your head to remember them.
            </p>
            <Link
              data-testid="get-started-link"
              href="/auth/register"
              className="bg-cyan-500 rounded text-white flex flex-row py-2 px-4"
            >
              <div className=""> Get Started </div>
              <Image
                className=""
                width={24}
                height={24}
                src={rightArrow}
                alt=""
              />
            </Link>
          </div>
        </section>
        <div
          data-testid="more-info-section"
          className="flex flex-col md:flex-row"
        >
          <section className="py-12 flex flex-col items-center md:w-1/2">
            <Image className="m-4" src={subMoreInfoImg1} alt="" />
            <h2 className="font-semibold text-xl">
              All password within a reach
            </h2>
            <p className="text-center w-2/3 ">
              All your password within a reach so you don&apos;t have to crack
              your head to remember them.
            </p>
          </section>
          <section className="py-12 flex flex-col items-center md:w-1/2">
            <Image className="m-4" src={subMoreInfoImg2} alt="" />
            <h2 className="font-semibold text-xl">Easy & Convenient</h2>
            <p className="text-center w-2/3 ">
              Save all your password at one place within minutes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
