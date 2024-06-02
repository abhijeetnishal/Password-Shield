"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/src/components/Loaders/LoadingSpinner";
import CreatePassword from "../../components/Passwords/CreatePassword";
import AuthHoc from "@/src/components/AuthHoc";
import useAuthStore from "@/src/store/authStore";
import useFetch from "@/src/hooks/useFetch";
import { PasswordsService } from "@/src/services/PasswordService";
import AuthHeader from "@/src/components/Headers/AuthHeader";
import decryptPassword from "@/src/utils/Decrypt";

const PasswordPage = () => {
  const token = useAuthStore((state) => state.authToken);

  const setTitle = useTitleStore((state) => state.setTitle);
  useEffect(() => {
    setTitle("KeySafe | Dashboard");
  }, [setTitle]);


  const [passwordsData, setPasswordsData] = useState<any>([]);
  const [showPopUp, setShowPopUp] = useState({
    type: "",
    status: false,
  });

  const [{ data, isLoading, isError }, getPasswordsAPI] = useFetch(null);
  const [
    { data: addData, isLoading: isAddDataLoading, isError: isAddDataError },
    getPasswordAddAPI,
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

  const onAddPassword = (item: any) => {
    getPasswordAddAPI(
      () => () => PasswordsService.addUserPassword(item, token)
    );
  };

  const onUpdatePassword = (type: string, newPassword: any) => {
    let updatedPasswords = [];
    if (type === "edit") {
      updatedPasswords = passwordsData.map((item: any) => {
        if (item._id === newPassword._id) {
          return newPassword;
        }
        return item;
      });
    } else {
      updatedPasswords = passwordsData.filter(
        (obj: any) => obj._id !== newPassword._id
      );

      getPasswordDeleteAPI(
        () => () => PasswordsService.DeleteUserPassword(newPassword._id, token)
      );
    }

    setPasswordsData(updatedPasswords);
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
            onSubmit={onAddPassword}
          />
        ) : null}

        <div className="m-2 p-2 lg:w-1/2">
          {passwordsData && passwordsData.length > 0 ? (
            passwordsData.map((item: any, index: number) => (
              <PasswordItem
                key={index}
                item={item}
                onUpdate={onUpdatePassword}
              />
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
