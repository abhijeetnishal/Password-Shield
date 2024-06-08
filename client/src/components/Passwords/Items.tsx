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

type Props = {
  item: any;
  onUpdate: Function;
};

const PasswordItem = ({ item, onUpdate }: Props) => {
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

  return (
    <div className="my-3">
      <div className="border rounded">
        <div className="flex flex-row items-center justify-start">
          <div>
            <Image
              className="m-1"
              width={60}
              height={60}
              src={commonWebsiteSymbolImg}
              alt=""
            />
          </div>
          <div className="flex flex-col m-1 items-start  justify-center">
            <div className="">{item.website_name}</div>
            <div className="flex flex-row">
              <p className="text-sm text-gray-400">
                Password:{" "}
                {isPasswordEyeBtnClicked
                  ? decryptPassword(item.password, item.iv)
                  : "***********"}
              </p>
              <button
                onClick={() =>
                  setIsPasswordEyeBtnClicked(!isPasswordEyeBtnClicked)
                }
                className="ml-1"
              >
                {isPasswordEyeBtnClicked ? (
                  <Image src={cutEye} alt="" className="" />
                ) : (
                  <Image src={eye} alt="" className="" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="border-t flex flex-row items-center justify-end">
          <div className="">
            <button
              className="flex border border-cyan-600 rounded p-1  flex-row items-center text-cyan-600"
              onClick={() => setShowPopUp({ type: "edit", status: true })}
            >
              <Image className="" src={editBtnImg} alt="" />
              <p className="ml-1 text-sm">Edit</p>
            </button>

            {showPopUp.type === "edit" && showPopUp.status ? (
              <EditPassword
                item={item}
                onClose={() =>
                  setShowPopUp((prev) => ({ ...prev, status: false }))
                }
                onSubmit={onUpdateData}
              />
            ) : null}
          </div>

          <div className="">
            <button
              className="m-1 border rounded border-cyan-600  p-1 flex flex-row items-center text-cyan-600"
              onClick={() => setShowPopUp({ type: "delete", status: true })}
            >
              <Image className="" src={deleteBtn} alt="" />
              <div className="ml-1 text-sm">Delete</div>
            </button>

            {showPopUp.type === "delete" && showPopUp.status ? (
              <DeleteConfirmation
                item={item}
                onClose={() =>
                  setShowPopUp((prev) => ({ ...prev, status: false }))
                }
                onSubmit={onUpdateData}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordItem;
