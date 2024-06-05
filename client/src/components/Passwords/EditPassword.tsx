import React, { useState } from "react";
import SaveBtn from "@/public/assets/save-btn.png";
import Image from "next/image";
import decryptPassword from "@/src/utils/Decrypt";

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

  return (
    <section className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-40">
      <div className="flex items-end sm:items-center justify-center min-h-full md:p-4 text-center sm:p-0">
        <div className="relative bg-white rounded-lg m text-left shadow-xl transform transition-all sm:my-8">
          <div
            data-testid="edit-password"
            className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-lg"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex flex-col w-full"
            >
              <h1 className="text-xl self-center">
                Edit {item.Website_name} Data
              </h1>
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
                  type="text"
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
                  onClick={() =>
                    onSubmit("edit", {
                      _id: item._id,
                      websiteName: websiteName,
                      password: password,
                    })
                  }
                >
                  <Image className="" src={SaveBtn} alt="" />
                  <p className="">Save</p>
                </button>
              </div>
              <div className="text-red-500 self-center m-1 font-light">
                {message}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditPassword;
