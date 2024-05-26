"use client";
import React, { useState } from "react";
import SaveBtn from "@/public/assets/save-btn.png";
import Image from "next/image";

export type CreatePasswordProps = {
  onClose: () => void;
  onSubmit: Function;
};

const CreatePassword = (props: CreatePasswordProps) => {
  const { onClose, onSubmit } = props;

  const [websiteName, setWebsiteName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  return (
    <section className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-40">
      <div className="flex items-end sm:items-center justify-center min-h-full md:p-4 text-center sm:p-0">
        <div className="relative bg-white rounded-lg m text-left shadow-xl transform transition-all sm:my-8">
          <div
            data-testid="create-password"
            className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-lg"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="m-2 flex flex-col w-full"
            >
              <div className="">
                <h1 className="text-xl self-center">Add New</h1>
              </div>
              <div className="flex flex-col my-2">
                <label htmlFor="" className="text-gray-500 text-sm">
                  Website Name
                </label>
                <input
                  className="border rounded p-2 text-sm"
                  type="text"
                  name="websitename"
                  value={websiteName}
                  placeholder="websitename"
                  onChange={(e) => setWebsiteName(e.target.value)}
                />
              </div>
              <div className="flex flex-col my-2">
                <label htmlFor="" className="text-gray-500 text-sm">
                  Password
                </label>
                <input
                  className="border rounded p-2 text-sm"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className=" flex flex-row items-center justify-evenly">
                <button
                  className="border border-teal-600 w-full text-teal-600 bg-gray-300 m-1 rounded p-1"
                  onClick={onClose}
                >
                  Cancel{" "}
                </button>
                <button
                  className="flex flex-row items-center justify-center border border-teal-600  bg-teal-600 m-1 rounded p-1 text-white w-full"
                  onClick={() => onSubmit("add", { websiteName, password })}
                >
                  <Image className="" src={SaveBtn} alt="" />
                  <div className="">Save</div>
                </button>
              </div>
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

export default CreatePassword;
