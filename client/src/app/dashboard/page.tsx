"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/src/components/Loaders/LoadingSpinner";
import CreatePassword from "../../components/Passwords/CreatePassword";
import AuthHoc from "@/src/components/AuthHoc";
import useAuthStore from "@/src/store/authStore";
import useFetch from "@/src/hooks/useFetch";
import { PasswordsService } from "@/src/services/PasswordService";
import PasswordItem from "@/src/components/Passwords/PasswordItem";
import AuthNavbar from "@/src/components/Navbar/AuthNavbar";
import useThemeStore from "@/src/store/themeStore";

const PasswordPage = () => {
  const token = useAuthStore((state) => state.authToken);

  const [passwordsData, setPasswordsData] = useState<any>([]);
  const [showPopUp, setShowPopUp] = useState({
    type: "",
    status: false,
  });

  const theme = useThemeStore((state) => state.theme);

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

  const onUpdateData = (type: string, newPassword: any) => {
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
      <div
        data-testid="password-page"
        className={`h-auto pb-10 min-h-screen ${
          theme === "dark" ? "bg-black text-white" : "bg-[#F8F7F4] text-black"
        }`}
      >
        <AuthNavbar />
        <div>
          <div className="mx-auto">
            {passwordsData && passwordsData.length > 0 ? (
              <>
                <div className=" flex justify-end px-2 py-4 mx-10">
                  <h1 className="font-medium"></h1>
                  <button
                    onClick={() => setShowPopUp({ type: "add", status: true })}
                    className={`px-5 shadow border border-gray-500 ${
                      theme === "dark"
                        ? "bg-[#292929c3] text-[#73D285]"
                        : "bg-[#ffffff] text-[#33ac49] font-semibold"
                    } hover:ring-1  ring-gray-600 rounded-md py-1`}
                  >
                    + Add
                  </button>
                </div>
                {showPopUp.type === "add" && showPopUp.status ? (
                  <CreatePassword
                    onClose={() =>
                      setShowPopUp((prev) => ({ ...prev, status: false }))
                    }
                    onSubmit={onAddPassword}
                  />
                ) : null}
              </>
            ) : null}

            <div className=" mx-auto min-w-fit">
              {passwordsData && passwordsData.length > 0 ? (
                passwordsData.map((item: any, index: number) => (
                  <PasswordItem
                    key={index}
                    index={index}
                    item={item}
                    onUpdate={onUpdateData}
                  />
                ))
              ) : isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <div className="text-center   ">
                    <h2 className="text-2xl pt-40 pb-10">
                      It looks like you have not saved any passwords yet
                    </h2>
                    <button
                      onClick={() =>
                        setShowPopUp({ type: "add", status: true })
                      }
                      className={`px-5 ${
                        theme === "dark"
                          ? "bg-[#292929c3] text-[#73D285]"
                          : "bg-[#ffffff] text-[#33ac49] font-semibold"
                      } hover:ring-1  ring-gray-600 rounded-md py-1`}
                    >
                      + Add
                    </button>

                    {showPopUp.type === "add" && showPopUp.status ? (
                      <CreatePassword
                        onClose={() =>
                          setShowPopUp((prev) => ({ ...prev, status: false }))
                        }
                        onSubmit={onAddPassword}
                      />
                    ) : null}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthHoc>
  );
};

export default PasswordPage;
