import React, { useState } from "react";
import SaveBtn from "@/public/assets/save-btn.png";
import Image from "next/image";

export type EditPasswordProps = {
  item: string;
  editData: (arg: { websiteName: string; password: string }) => void;
  updateBtn: (arg: boolean) => void;
  onClose: () => void;
};

const EditPassword = (props: EditPasswordProps) => {
  const { item, onClose, editData, updateBtn } = props;

  const [websiteName, setWebsiteName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function updateFunc() {
    if (websiteName && password) {
      updateBtn(true);
      editData({ websiteName, password });
    } else {
      setMessage("Enter All Details");
    }
  }

  return (
    <div
      data-testid="edit-password"
      onClick={onClose}
      className="shadow fixed right-[5%] left-[5%] lg:right-1/4 lg:left-1/4 flex flex-row items-start justify-center bg-white  "
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="shadow-md border rounded flex flex-col w-full p-4"
      >
        <h1 className="text-xl self-center">Edit {item} Data</h1>
        <div className="flex flex-col my-2">
          <label htmlFor="" className="text-gray-500 text-sm">
            Website Name
          </label>

          <input
            className="border rounded p-2 text-sm"
            type="text"
            value={websiteName}
            onChange={(e) => setWebsiteName(e.target.value)}
            placeholder="Google"
          />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="" className="text-gray-500 text-sm">
            Password
          </label>

          <input
            className="border rounded p-2 text-sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="1234567sdfgh"
          />
        </div>
        <div className="flex flex-row items-center justify-evenly">
          <button
            className="border border-teal-600 w-full text-teal-600 bg-gray-300 m-1 rounded p-1"
            onClick={onClose}
          >
            Cancel{" "}
          </button>
          <button
            className="flex flex-row items-center justify-center border border-teal-600  bg-teal-600 m-1 rounded p-1 text-white w-full"
            onClick={updateFunc}
          >
            <Image className="" src={SaveBtn} alt="" />
            <p className="">Save</p>
          </button>
        </div>
        <div className="text-red-500 self-center m-1 font-light">{message}</div>
      </div>
    </div>
  );
};

export default EditPassword;
