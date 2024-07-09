"use client";
import Image from "next/image";
import Ribbon1 from "@/public/assets/Ribbon-1.png";
import illustration3 from "@/public/assets/Illustration3.png";
import Illustration1 from "@/src/components/Icons/Illustration1";
import Illustration1Dark from "@/src/components/Icons/Illustration1dark";
import Illustration2 from "@/src/components/Icons/Illustration2";
import Illustration2Dark from "@/src/components/Icons/Illustration2dark";
import Icon1 from "@/src/components/Icons/Icon1";
import Icon2 from "@/src/components/Icons/Icon2";
import Icon3 from "@/src/components/Icons/Icon3";
import Icon4 from "@/src/components/Icons/Icon4";
import Icon5 from "@/src/components/Icons/Icon5";
import useThemeStore from "@/src/store/themeStore";
import Footer from "@/src/components/Footer/Footer";
import Navbar from "@/src/components/Navbar/Navbar";
import Link from "next/link";
import Github from "../components/Icons/Github";
import LinkedIn from "../components/Icons/LinkedIn";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import ScrollerBlob from "../components/Navbar/ScrollerBlob";

export default function LandingPages() {
  const token = getCookie("token");
  const router = useRouter();

  if (token) {
    router.push("/dashboard");
  }

  const theme = useThemeStore((state) => state.theme);

  return (
    <>
      <Navbar landingPage={true} />
      <div data-testid="landing-page" className=" h mx-auto">
        <section>
          <div
            className={`xl:flex md:p-24 p-6 section1 pb-44 ${
              theme === "light"
                ? "bg-[#f7f6ee]  text-black"
                : "bg-[#12141d] text-white"
            }`}
          >
            <div>
              {theme === "light" ? <Illustration1 /> : <Illustration1Dark />}
            </div>
            <div className="px-5">
              <div className="pt-2 text-lg text-[#f43f5e] font-medium">
                <p>Ensuring maximum security</p>
              </div>
              <div className="md:pt-8 pt-3">
                <h2 className={`md:text-7xl text-3xl font-bold`}>
                  Secure your digital life with the power of open source.
                </h2>
              </div>
              <div>
                <h2 className="md:mr-40  pt-7 pb-5 text-[#595a61] text-lg">
                  Key Safe liberates you from the burden of memorizing
                  passwords, ensuring your credentials are securely stored and
                  easily accessible whenever you need them.
                </h2>
                <Link data-testid="get-started-link" href="/auth/register">
                  <button className="bg-[#ef4444] shadow-md hover:bg-[#e04747] text-white py-3 px-8">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
            <Image
              src={Ribbon1}
              alt="decoration"
              className="hidden md:block absolute p-0 ml-[75rem] top-[25rem]"
            />
          </div>
        </section>

        <section id="about">
          <div className=" "></div>
          <div className=" md:flex px-5 xl:px-24 py-16 justify-between">
            <div className="p-3 md:w-96 ">
              <div>
                <Icon1></Icon1>
              </div>
              <h2 className="font-bold py-5">Easy & Convenient</h2>
              <p className="text-[#595a61]">
                Real-time problem solving is not just about time, it&apos;s
                about time. This allows you to solve problems within a specified
                time problem has a solution.
              </p>
            </div>

            <div className="p-3 md:w-96 ">
              <div>
                <Icon2 />
              </div>
              <h2 className="font-bold py-5">Top-Notch Security</h2>
              <p className="text-[#595a61]">
                Security is paramount, and we take it seriously. Our platform
                employs state-of-the-art encryption techniques to safeguard your
                sensitive data.{" "}
              </p>
            </div>

            <div className="p-3 md:w-96 ">
              <div>
                <Icon3></Icon3>
              </div>
              <h2 className="font-bold py-5">Open Source Transparency</h2>
              <p className="text-[#595a61]">
                Transparency is at the core of our values. As an open-source
                platform, we believe in fostering trust and collaboration within
                our community.{" "}
              </p>
            </div>
          </div>
        </section>

        <section>
          <div
            className={`flex py-4 items-center  xl:px-24  section3  ${
              theme === "light"
                ? "bg-[#f7f6ee]  text-black"
                : "bg-[#12141d] text-white"
            }`}
          >
            <div className="md:px-5 px-11 py-4 md:py-36 flex-col flex align-middle">
              <div className="xl:mr-56  ">
                <h2 className={`md:text-5xl text-2xl font-bold`}>
                  Key Safe takes care of your credentials.
                </h2>
              </div>
              <div className="xl:mr-72">
                <h2 className="  pt-7 text-[#595a61] text-base">
                  With Key Safe, you can trust that your credentials are only
                  accessible to you, providing peace of mind in an increasingly
                  digital world.
                </h2>
              </div>
            </div>

            <div>
              {theme === "light" ? <Illustration2 /> : <Illustration2Dark />}
            </div>
          </div>
        </section>

        <section>
          <div className="flex py-4  md:px-24 items-center bg-[#fafafa]">
            <div className="hidden md:block w-[37rem]  px-5">
              <Image src={illustration3} alt="" />
            </div>

            <div className="px-11 xl:py-24 py-11 flex-col flex align-middle">
              <div className="xl:ml-52 ">
                <h2 className={`md:text-5xl text-2xl font-bold`}>
                  All password within a reach
                </h2>
              </div>
              <div className="xl:ml-52">
                <h2 className=" xl:mr-20 text-left pt-7 text-[#595a61] text-base">
                  Save all your password at one place within minutes. And you
                  don&apos;t have to crack your head to remember them.
                </h2>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="text-center p-10 py-20 section4 bg-[#18181b]">
            <h2 className={`text-5xl font-bold text-white py-5`}>
              Join Our Community
            </h2>
            <p className="text-white text-pretty xl:text-center py-5 xl:px-80  px-0">
              Key Safe thrives on community support and contributions. Whether
              you&apos;re a developer, a security enthusiast, or simply someone
              who values secure password management, we welcome you to join us.
              Contribute to the project, report issues, or share your feedback.
            </p>
            <div className="flex mx-auto justify-center font-semibold  text-white">
              <Github />
              <Link href="https://github.com/abhijeetnishal/Password-Shield">
                <p className="px-3 hover:underline">Github</p>
              </Link>

              <LinkedIn />
              <Link href="https://www.linkedin.com/in/abhijeetkumar7565/">
                <p className="px-3 hover:underline">Linkedin</p>
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="xl:flex py-5 md:py-10 items-center md:px-20 xl:px-24  bg-[#fafafa]">
            <div className="px-5 flex-col py-5 justify-center flex align-middle">
              <div className="">
                <h2 className={`text-3xl  text-balance xl:text-left font-bold`}>
                  Ready to get started?
                </h2>
              </div>
              <div>
                <h2 className=" text-balance xl:text-left xl:mr-40 pt-4  pb-3 text-[#595a61] text-base">
                  Dive into a world where password management is no longer a
                  headache. Our platform welcomes you to streamline your digital
                  security effortlessly.
                </h2>
                <div className="text-">
                  <Link href="/auth/login">
                    <button className="bg-[#ef4444] shadow-md  hover:bg-[#e04747] text-white py-3 px-5">
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="md:flex py-10  align-middle justify-center">
              <div className="xl:mx-10 mx-auto px-5 my-2 w-72 border-2 rounded py-5 bg-white">
                <div>
                  <Icon5></Icon5>
                </div>
                <h2 className="font-bold py-3">Store data on cloud</h2>
                <p className="text-[#595a61]">
                  Safeguard your sensitive information with confidence on our
                  platform, where data protection is our top priority.{" "}
                </p>
              </div>
              <div className="xl:mx-10 mx-auto px-5 w-72 my-2 border-2 rounded py-5 bg-white">
                <div>
                  <Icon4></Icon4>
                </div>
                <h2 className="font-bold py-3">Connect dots smartly</h2>
                <p className="text-[#595a61]">
                  Experience the efficiency of smart solutions that anticipate
                  your needs, empowering you to conquer any obstacle with ease.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <ScrollerBlob />
    </>
  );
}
