import React, { useState } from "react";
import SaveBtn from "@/public/assets/save-btn.png";
import Image from "next/image";
import decryptPassword from "@/src/utils/Decrypt";
import useThemeStore from "@/src/store/themeStore";
import PasswordStrengthIndicator from "./PasswordStrength";

export type EditPasswordProps = {
  item: any;
  onClose: () => void;
  onSubmit: Function;
};

const EditPassword = (props: EditPasswordProps) => {
  const { item, onClose, onSubmit } = props;

  const [websiteName, setWebsiteName] = useState(item.website_name);
  const [password, setPassword] = useState(
    decryptPassword(item.password, item.iv)
  );
  const [message, setMessage] = useState("");
  const theme = useThemeStore((state) => state.theme);


  return (
    
<section className={`fixed z-50 inset-0 overflow-y-auto   bg-black bg-opacity-40`}>
<div className="flex items-end sm:items-center justify-center min-h-full md:p-4 text-center sm:p-0">
  <div className={`relative ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-[#1c1c1c] text-white'} rounded-lg m text-left shadow-xl transform transition-all sm:my-8`}>
    <div
      data-testid="create-password"
      className=" pt-5 pb-4 w-96 min-w-fit sm:p-6 sm:pb-4 rounded-lg"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className=" flex flex-col md:px-0 px-5"
      >
        <div className="flex items-center justify-between pb-2  border-b rounded-t dark:border-gray-600">
          <h3 className={`text-xl font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          Edit Details
          </h3>
          <button onClick={onClose} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

        </div>
        <div className="flex flex-col my-2 mt-4">
          <div>
            <label htmlFor="siteName" className="block mb-2 text-sm font-medium">Website Name</label>
            <input type="text" name="siteName" id="siteName" className={`${theme==='light' ?'bg-gray-50 text-gray-900': 'bg-[#292929] text-white' } border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `} placeholder="KeySafe.com"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              required />
          </div>

        </div>

        <div className="flex flex-col ">
          <div>
          <div className={`flex justify-between items-center mb-2 my-1 `}>
            <label htmlFor="password" className="block  text-sm font-medium ">Password</label>
            <PasswordStrengthIndicator password={password} />
            </div>
            <input type="password" name="password" id="password" placeholder="••••••••" className={`${theme==='light' ?'bg-gray-50 text-gray-900': 'bg-[#292929] text-white' } border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `} required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        

        <button
 onClick={() =>
  onSubmit("edit", {
    _id: item._id,
    websiteName: websiteName,
    password: password,
  })
}        className={`px-3 mt-4 py-2  ${theme === 'dark' ? 'bg-[#292929] text-[#73d285]' : 'bg-[#F8F8FF] text-[#73d285]'} border border-gray-500 rounded-lg hover:text-white  hover:bg-[#73d285]`}

      >
        Save
      </button>
        <p className="text-red-500 self-center m-1 font-light">
          {message}
        </p>
      </div>
    </div>
  </div>
</div>






</section>
  );
};

export default EditPassword;
