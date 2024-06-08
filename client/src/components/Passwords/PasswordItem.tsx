import commonWebsiteSymbolImg from "@/public/assets/commonWebsiteSymbol.png";
import eye from "@/public/assets/eye-image.png";
import cutEye from "@/public/assets/cut-eye-image.png";
import editBtnImg from "@/public/assets/editBtnImg.png";
import deleteBtn from "@/public/assets/deleteBtnblue.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import EditPassword from "./EditPassword";
import decryptPassword from "@/src/utils/Decrypt";
import useFetch from "@/src/hooks/useFetch";
import { PasswordsService } from "@/src/services/PasswordService";
import useAuthStore from "@/src/store/authStore";
import PasswordStrengthIndicator from "./PasswordStrength";
import SiteIcon from "../Icons/SiteIcon";
import useThemeStore from "@/src/store/themeStore";

type Props = {
  index: number;
  item: any;
  onUpdate: Function;
};

const PasswordItem = ({ index, item, onUpdate }: Props) => {
  const token = useAuthStore((state) => state.authToken);

  const [isPasswordEyeBtnClicked, setIsPasswordEyeBtnClicked] = useState(false);
  const [showPopUp, setShowPopUp] = useState({
    type: "",
    status: false,
  });

  const [
    { data: editData, isLoading: isEditDataLoading, isError: isEditDataError },
    getPasswordEditAPI,
  ] = useFetch(null);

  useEffect(() => {
    const { code } = editData;

    if (code === 200) {
      const result = editData.data;

      onUpdate("edit", result);
      setShowPopUp((prev) => ({ ...prev, status: false }));
    }
  }, [editData, isEditDataError]);

  const onUpdateData = (type: string, item: any) => {
    if (type === "edit") {
      getPasswordEditAPI(
        () => () => PasswordsService.UpdateUserPassword(item._id, item, token)
      );
    } else {
      onUpdate("delete", item);
      setShowPopUp((prev) => ({ ...prev, status: false }));
    }
  };

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const theme = useThemeStore((state) => state.theme);


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(decryptPassword(item.password, item.iv));
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 3000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  function formatDate(dateString: string) {
    const date = new Date(dateString);


    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }


  // Example usage:



  return (

    <div className={`cursor-pointer w-[23rem] mx-auto transition-all border border-gray-600 duration-300 ease-in-out md:w-96 my-3 rounded-xl shadow-lg pt-3 px-1 ${isExpanded ? `h-auto ${theme === 'light' ? 'bg-[#F8F7F4]' : 'bg-[black]'} border border-gray-500` : `h-16 ${theme === 'light' ? 'bg-[white]' : 'bg-[#1b1b1b]'}`}`}>
      <div onClick={toggleExpand} className='flex p-0 justify-between items-center'>
        <div className="flex px-4 justify-start items-center">
          <SiteIcon />
          <h2 className={`text- mx-2 font-medium ${theme === 'light' ? 'text-black' : 'text-[#ffffff]'}`}>{item.website_name}</h2>
        </div>
        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} mx-5`}>{isExpanded ? '▲' : '▼'}</p>
      </div>
      {isExpanded && (
        <div className="p-6 pt-5">
          <div className={`flex justify-between items-center ${theme==='dark'?'text-[#CECECE]': 'text-[#252525]' }`}>
            <h2 className='text-base font-normal'>{item.website_name}</h2>
            <p className='text-sm font-normal'>{formatDate(item.created_at)}</p>
          </div>
          <div className={`flex justify-between items-center my-1 ${theme==='dark'?'text-[#CECECE]': 'text-[#252525]' }`}>
            <p className='mr-4 text-sm'>Password Strength</p>
            <PasswordStrengthIndicator password={decryptPassword(item.password, item.iv)} />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <input
              type={isPasswordEyeBtnClicked ? "text" : "password"}
              readOnly
              value={decryptPassword(item.password, item.iv)}
              className={`${theme === 'dark' ? 'bg-[#292929] text-[#7a7a7a]' : 'bg-[#F8F8FF] text-[black]'}  border border-gray-700  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full mr-1 p-2`}
              placeholder="********"

            />
            <button
              className="px-2 py-2 ml-1 min-w-20 bg-violet-600 text-white rounded-lg hover:bg-violet-500"
              onClick={handleCopy}
            >
              {copiedIndex === index ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <button
              onClick={() => setShowPopUp({ type: "edit", status: true })}
              className={`px-3 w-28 py-2 mr-1 ${theme === 'dark' ? 'bg-[#292929] text-white' : 'bg-[#F8F8FF] text-[black]'} border border-gray-500 rounded-lg hover:bg-violet-500`}
            >
              Edit
            </button>
            <button
              onClick={() => setShowPopUp({ type: "delete", status: true })}
              className={`px-3 w-28 py-2 mx-1 ${theme === 'dark' ? 'bg-[#292929] text-[#E74C3C]' : 'bg-[#F8F8FF] text-[#E74C3C]'} border border-gray-500 rounded-lg hover:text-white  hover:bg-[#E74C3C]`}

            >
              Delete
            </button>

            {showPopUp.type === "edit" && showPopUp.status ? (
              <EditPassword
                item={item}
                onClose={() => setShowPopUp((prev) => ({ ...prev, status: false }))}
                onSubmit={onUpdateData}
              />
            ) : null}

            {showPopUp.type === "delete" && showPopUp.status ? (
              <DeleteConfirmation
                item={item}
                onClose={() => setShowPopUp((prev) => ({ ...prev, status: false }))}
                onSubmit={onUpdateData}
              />
            ) : null}

            <button
              onClick={toggleExpand}
              className={`px-3 w-28 py-2 ml-1 ${theme === 'dark' ? 'bg-[#292929] text-white' : 'bg-[#F8F8FF] text-[black]'} border border-gray-500 rounded-lg hover:bg-violet-500`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordItem;
