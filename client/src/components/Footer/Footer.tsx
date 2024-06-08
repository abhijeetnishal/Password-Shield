import { Link as ScrollLink } from "react-scroll";

export default function Footer() {
  return (
    <div>
      <footer className=" p-0 m-0  shadow bg-[#12141d] ">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href=""
              className="flex items-center cursor-pointer mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                KeySafe
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
              <li>
                <ScrollLink to="about" smooth duration={500}>
                  <p className="cursor-pointer hover:underline me-4 md:me-6">
                    About
                  </p>
                </ScrollLink>
              </li>
              <li>
                <a
                  href="https://github.com/abhijeetnishal/Password-Shield"
                  className="hover:underline me-4 md:me-6"
                >
                  GitHub
                </a>
              </li>
              <li>
                <ScrollLink to="contact" smooth duration={500}>
                  <p className="hover:underline cursor-pointer me-4 md:me-6">
                    Contact
                  </p>
                </ScrollLink>
              </li>
              <li>
                <a href="/auth/register" className="hover:underline">
                  Register
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6  sm:mx-auto border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center ">
            © 2024{" "}
            <a href="" className="hover:underline">
              Key Safe
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
