"use client";
import React, { useEffect, useState } from "react";
import DeleteConfirmation from "../main/deleteConfirmation";
import LoadingSpinner from "../layout/loadingSpinner";
import { Cookies } from "react-cookie";
import EditPassword from "../main/editPassword";
import CreatePassword from "../create/page";
import commonWebsiteSymbolImg from "../../public/assets/commonWebsiteSymbol.png";
import eye from "../../public/assets/eye-image.png";
import cutEye from "../../public/assets/cut-eye-image.png";
import editBtnImg from "../../public/assets/editBtnImg.png";
import deleteBtn from "../../public/assets/deleteBtnblue.png";
import Image from "next/image";

const PasswordPage = () => {
  const cookies = new Cookies();
  const cookieValue = cookies.get("myCookie");
  const [data, setData] = useState<
    { websitename?: string; websiteName?: string; _id: string }[] | null
  >(null);
  const [decryptedPassword, setDecryptedPassword] = useState<{
    decryptedPassword: string;
    id: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [showPopUpDelete, setShowPopUpDelete] = useState(false);
  const [showPopUpEdit, setShowPopUpEdit] = useState(false);
  const [showPopUpAdd, setShowPopUpAdd] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState<string | null>(null);

  const [updateData, setUpdateData] = useState({
    websiteName: "",
    password: "",
  });

  const [updateBtnClick, setUpdateBtnClick] = useState(false);

  const [dataLength, setDataLength] = useState(0);

  const [containerHeight, setContainerHeight] = useState(0);

  const [isPasswordEyeBtnClicked, setIsPasswordEyeBtnClicked] = useState(false);

  useEffect(() => {
    // declare the async data fetching function
    setIsLoading(true);
    const fetchData = async () => {
      // get the data from the api
      const response = await fetch(
        `${process.env.REACT_APP_HOST_URL}/passwords/all/${cookieValue._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      // convert the data to json
      const data = await response.json();
      setData(data);

      setDataLength(data.length);

      const height = data.length * 140; // Assuming each item is 50px tall
      setContainerHeight(height);
      //console.log(data);
      setIsLoading(false);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
    //eslint-disable-next-line
  }, []);

  async function decrypt(passwordId: string) {
    setIsPasswordEyeBtnClicked(!isPasswordEyeBtnClicked);
    //showHidebtn();
    const response = await fetch(
      `${process.env.REACT_APP_HOST_URL}/passwords/specific/${passwordId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    // console.log(data);
    setDecryptedPassword(data);
  }

  useEffect(() => {
    setUpdateData(updateData);
    //console.log(updateData);

    const websiteName = updateData.websiteName;
    const password = updateData.password;
    if (websiteName !== "" && password !== "" && updateBtnClick) {
      //console.log(updateData);
      const fetchData = async () => {
        // get the data from the api
        const response = await fetch(
          `${process.env.REACT_APP_HOST_URL}/passwords/${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              websiteName,
              password,
            }),
            credentials: "include",
          }
        );
        response
          .json()
          .then((data) => ({
            data: data,
          }))
          .then((res) => {
            //console.log(res.data);
            //window.location.reload(false);
            window.location.reload();
          });
      };

      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }
    //eslint-disable-next-line
  }, [updateData]);

  function handleDeleteClick(passwordId: any) {
    setShowPopUpDelete(true);
    setDeleteId(passwordId);
  }

  function handleEditClick(passwordId: any) {
    setShowPopUpEdit(true);
    setEditId(passwordId);
  }

  function handleAddClick() {
    setShowPopUpAdd(true);
  }

  function handleCloseDialogDelete() {
    setShowPopUpDelete(false);
  }

  function handleCloseDialogEdit() {
    setShowPopUpEdit(false);
  }

  function handleCloseDialogAdd() {
    setShowPopUpAdd(false);
  }

  return (
    <div
      data-testid="password-page"
      className=""
      style={{ height: `${containerHeight}px` }}
    >
      <div className=" flex flex-row justify-between items-center px-2 py-4">
        <h1 className="font-medium">Your Saved Passwords</h1>
        <button
          className="text-white bg-teal-500 p-1 rounded"
          onClick={() => handleAddClick()}
        >
          <p className="">+Add New</p>
        </button>
        {showPopUpAdd && cookieValue._id && (
          <CreatePassword onClose={handleCloseDialogAdd} />
        )}
      </div>

      <div className=" m-2 p-2 lg:w-1/2">
        {data !== null && dataLength && !isLoading ? (
          data.map(
            (
              mainData: {
                websitename?: string;
                websiteName?: string;
                _id: any;
              },
              index: number
            ) => (
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
                    <div className="">{mainData.websitename}</div>
                    <div className="flex flex-row">
                      <p className="text-sm text-gray-400">
                        Password:{" "}
                        {isPasswordEyeBtnClicked &&
                        decryptedPassword &&
                        decryptedPassword.id === mainData._id
                          ? decryptedPassword.decryptedPassword
                          : "***********"}
                      </p>
                      <button
                        onClick={() => decrypt(mainData._id)}
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
                      onClick={() => handleEditClick(mainData._id)}
                    >
                      <Image className="" src={editBtnImg} alt="" />
                      <p className="ml-1 text-sm">Edit</p>
                    </button>
                    {showPopUpEdit && editId === mainData._id && (
                      <EditPassword
                        item={mainData.websiteName || ""}
                        onClose={handleCloseDialogEdit}
                        editData={setUpdateData}
                        updateBtn={setUpdateBtnClick}
                      />
                    )}
                  </div>
                  <div className="">
                    <button
                      className="m-1 border rounded border-cyan-600  p-1 flex flex-row items-center text-cyan-600"
                      onClick={() => handleDeleteClick(mainData._id)}
                    >
                      <Image className="" src={deleteBtn} alt="" />
                      <div className="ml-1 text-sm">Delete</div>
                    </button>
                    {showPopUpDelete && deleteId === mainData._id && (
                      <DeleteConfirmation
                        passwordId={mainData._id}
                        item={mainData.websiteName || ""}
                        onClose={handleCloseDialogDelete}
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          )
        ) : isLoading ? (
          <LoadingSpinner />
        ) : (
          <div>You haven&apos;t saved any password.</div>
        )}
      </div>
    </div>
  );
};

export default PasswordPage;
