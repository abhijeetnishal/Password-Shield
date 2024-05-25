"use client";
import React, { useEffect, useState } from "react";
import DeleteConfirmation from "../../components/Passwords/deleteConfirmation";
import LoadingSpinner from "@/src/components/Loaders/LoadingSpinner";
import EditPassword from "../../components/Passwords/editPassword";
import CreatePassword from "../../components/Passwords/page";
import commonWebsiteSymbolImg from "@/public/assets/commonWebsiteSymbol.png";
import eye from "@/public/assets/eye-image.png";
import cutEye from "@/public/assets/cut-eye-image.png";
import editBtnImg from "@/public/assets/editBtnImg.png";
import deleteBtn from "@/public/assets/deleteBtnblue.png";
import Image from "next/image";
import AuthHoc from "@/src/components/AuthHoc";
import useAuthStore from "@/src/store/authStore";
import useFetch from "@/src/hooks/useFetch";
import { PasswordsService } from "@/src/services/PasswordService";
import AuthHeader from "@/src/components/Headers/AuthHeader";
import decryptPassword from "@/src/utils/Decrypt";

const PasswordPage = () => {
  const token = useAuthStore((state) => state.authToken);

  const [passwordsData, setPasswordsData] = useState<any>([]);
  const [showPopUp, setShowPopUp] = useState({
    type: "",
    status: false,
  });

  const [isPasswordEyeBtnClicked, setIsPasswordEyeBtnClicked] = useState(false);

  const [{ data, isLoading, isError }, getPasswordsAPI] = useFetch(null);
  const [
    { data: addData, isLoading: isAddDataLoading, isError: isAddDataError },
    getPasswordAddAPI,
  ] = useFetch(null);
  const [
    { data: editData, isLoading: isEditDataLoading, isError: isEditDataError },
    getPasswordEditAPI,
  ] = useFetch(null);
  const [{}, getPasswordDeleteAPI] = useFetch(null);

  useEffect(() => {
    if (token) {
      getPasswordsAPI(() => () => PasswordsService.getUserPasswords(token));
    }
  }, [token]);

  useEffect(() => {
    const { code } = data;

    if (code === 200) {
      const { data: result } = data;

      setPasswordsData(result);
    }
  }, [data, isError]);

  useEffect(() => {
    const { code } = addData;

    if (code === 201) {
      const result = addData.data;

      setPasswordsData([...passwordsData, result]);
      setShowPopUp((prev) => ({ ...prev, status: false }));
    }
  }, [addData, isAddDataError]);

  useEffect(() => {
    const { code } = editData;

    if (code === 200) {
      const result = editData.data;

      const updatedPasswords = passwordsData.map((item: any) => {
        if (item._id === result._id) {
          return result;
        }
        return item;
      });

      setPasswordsData(updatedPasswords);
      setShowPopUp((prev) => ({ ...prev, status: false }));
    }
  }, [editData, isEditDataError]);

  const onDeletePassword = (id: string) => {
    getPasswordDeleteAPI(
      () => () => PasswordsService.DeleteUserPassword(id, token)
    );

    const updatedPasswords = passwordsData.filter((obj: any) => obj._id !== id);

    setPasswordsData(updatedPasswords);
    setShowPopUp((prev) => ({ ...prev, status: false }));
  };

  const handleSubmit = (type: string, item: any) => {
    if (type === "add") {
      getPasswordAddAPI(
        () => () => PasswordsService.addUserPassword(item, token)
      );
    } else {
      getPasswordEditAPI(
        () => () => PasswordsService.UpdateUserPassword(item._id, item, token)
      );
    }
  };

  return (
    <AuthHoc>
      <AuthHeader />
      <div data-testid="password-page" className="">
        <div className=" flex flex-row justify-between items-center px-2 py-4">
          <h1 className="font-medium">Your Saved Passwords</h1>
          <button
            className="text-white bg-teal-500 p-1 rounded"
            onClick={() => setShowPopUp({ type: "add", status: true })}
          >
            <p className="">+Add New</p>
          </button>
        </div>

        {showPopUp.type === "add" && showPopUp.status ? (
          <CreatePassword
            onClose={() => setShowPopUp((prev) => ({ ...prev, status: false }))}
            onSubmit={handleSubmit}
          />
        ) : null}

        <div className="m-2 p-2 lg:w-1/2">
          {passwordsData && passwordsData.length > 0 ? (
            passwordsData.map((item: any, index: number) => (
              <div className="border rounded" key={index}>
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
                      onClick={() =>
                        setShowPopUp({ type: "edit", status: true })
                      }
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
                        onSubmit={handleSubmit}
                      />
                    ) : null}
                  </div>

                  <div className="">
                    <button
                      className="m-1 border rounded border-cyan-600  p-1 flex flex-row items-center text-cyan-600"
                      onClick={() =>
                        setShowPopUp({ type: "delete", status: true })
                      }
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
                        onSubmit={onDeletePassword}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            ))
          ) : isLoading ? (
            <LoadingSpinner />
          ) : (
            <div>You haven&apos;t saved any password.</div>
          )}
        </div>
      </div>
    </AuthHoc>
  );
};

export default PasswordPage;
