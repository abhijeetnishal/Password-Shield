"use client";

import AuthNavbar from '@/src/components/Headers/AuthNavbar';
import React, { useEffect, useState } from 'react';
import PasswordStrengthIndicator from '@/src/components/Passwords/PasswordStrength';
import SiteIcon from '@/src/components/Icons/SiteIcon';
import { PasswordsService } from "@/src/services/PasswordService";

import useAuthStore from '@/src/store/authStore';
import useTitleStore from '@/src/store/titleStore';
import useFetch from '@/src/hooks/useFetch';
import decryptPassword from '@/src/utils/Decrypt';

import AuthHeader from "@/src/components/Headers/AuthHeader";
import PasswordItem from "@/src/components/Passwords/PasswordItem";
 

import LoadingSpinner from '@/src/components/Loaders/LoadingSpinner';
import useThemeStore from '@/src/store/themeStore';
import AuthHoc from '@/src/components/AuthHoc';
import CreatePassword from '@/src/components/Passwords/CreatePassword';
import EditPassword from '@/src/components/Passwords/EditPassword';
import DeleteConfirmation from '@/src/components/Passwords/DeleteConfirmation';

 
export default function Page() {
  const token = useAuthStore((state) => state.authToken);
  const setTitle = useTitleStore((state) => state.setTitle);

  useEffect(() => {
    setTitle("KeySafe | Dashboard");
  }, [setTitle]);

  const theme = useThemeStore((state) => state.theme);

  const [passwordsData, setPasswordsData] = useState<any>([]);
  const [showPopUp, setShowPopUp] = useState({
    type: "",
    status: false,
  });

  const [{ data, isLoading, isError }, getPasswordsAPI] = useFetch(null);
  const [{ data: addData, isLoading: isAddDataLoading, isError: isAddDataError }, getPasswordAddAPI] = useFetch(null);
  const [{ data: editData, isLoading: isEditDataLoading, isError: isEditDataError }, getPasswordEditAPI] = useFetch(null);
  const [{ }, getPasswordDeleteAPI] = useFetch(null);

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
    getPasswordDeleteAPI(() => () => PasswordsService.DeleteUserPassword(id, token));
    const updatedPasswords = passwordsData.filter((obj: any) => obj._id !== id);
    setPasswordsData(updatedPasswords);
    setShowPopUp((prev) => ({ ...prev, status: false }));
  };

  const handleSubmit = (type: string, item: any) => {
    if (type === "add") {
      getPasswordAddAPI(() => () => PasswordsService.addUserPassword(item, token));
    } else {
      getPasswordEditAPI(() => () => PasswordsService.UpdateUserPassword(item._id, item, token));
    }
  };

  const [isExpanded, setIsExpanded] = useState<boolean[]>(Array(passwordsData.length).fill(false));
  const [passwords, setPasswords] = useState<string[]>(passwordsData.map((item: any, index: number) => item.password));
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setIsExpanded(prevState => {
      const newExpandedCards = [...prevState];
      newExpandedCards[index] = !newExpandedCards[index];
      return newExpandedCards;
    });
  };

  const handlePasswordChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newPasswords = [...passwords];
    newPasswords[index] = e.target.value;
    setPasswords(newPasswords);
  };

  const handleCopy = async (index: number) => {
    try {
      await navigator.clipboard.writeText(passwords[index]);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 3000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Split the data into two columns
  const column1Data = passwordsData.filter((item: any, index: number) => index % 2 === 0);
  const column2Data = passwordsData.filter((item: any, index: number) => index % 2 !== 0);

  return (
    <AuthHoc>
      <div className={`mx-auto min-h-screen ${theme === 'light' ? 'bg-[#e3edf3]' : 'bg-black'}`}>
        {/*  NavBar  */}
        <AuthNavbar landingPage={false} />
        {passwordsData && passwordsData.length > 0 ?
          <>
            {/* Flex For Add Button */}
            <div className='flex justify-end m-2 mt-5 px-5'>
              <button onClick={() => setShowPopUp({ type: "add", status: true })} className={`px-5 ${theme === 'dark' ? 'bg-[#292929c3] text-[#73D285]' : 'bg-[#ffffff] text-[#33ac49] font-semibold'} hover:ring-1  ring-gray-600 rounded-md py-1`}>
                + Add
              </button>
            </div>
            {showPopUp.type === "add" && showPopUp.status ? (
              <CreatePassword
                onClose={() => setShowPopUp((prev) => ({ ...prev, status: false }))}
                onSubmit={handleSubmit}
              />
            ) : null}
            {/* Main Page */}
            <div className='md:flex justify-center  md:mx-48'>
              {/* Column 1  */}
              <div className='flex flex-col px-4'>
                {column1Data.map((item: any, index: number) => (
                  <div key={index} className={`cursor-pointer transition-all duration-300 ease-in-out md:w-96 my-3 rounded-xl shadow-lg pt-3 px-1 ${isExpanded[index * 2] ? `h-auto ${theme === 'light' ? 'bg-white' : 'bg-[black]'} border border-gray-500` : `h-16  ${theme === 'light' ? 'bg-white' : 'bg-[#1b1b1b]'}  `}`}>
                    <div onClick={() => toggleExpand(index * 2)} className='flex p-0 justify-between items-center'>
                      <div className="flex justify-start items-center">
                        <SiteIcon />
                        <h2 className={`text-xl font-bold ${theme === 'light' ? 'test-black' : 'text-[#a0a0a1]'}`}>{item.website_name}</h2>
                      </div>
                      <p className={`${theme === 'light' ? 'test-black' : 'text-white'} mx-5`}>{isExpanded[index * 2] ? '▲' : '▼'}</p>
                    </div>
                    {isExpanded[index * 2] && (
                      <div className="p-6 pt-3">
                        <div onClick={() => toggleExpand(index * 2)} className="flex justify-between items-center text-[#CECECE]">
                          <h2 className='text-xl'>{item.website_name}</h2>
                          <p>Mar 06, 2023</p>
                        </div>
                        <div className="flex justify-between items-center my-2 text-[#CECECE]">
                          <p className='mr-4 text-sm'>Password Strength</p>
                          <PasswordStrengthIndicator password={decryptPassword(item.password[index * 2], item.iv)} />
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                          <input
                            type="password"
                            readOnly
                            value={decryptPassword(item.password[index * 2], item.iv)}
                            onChange={(e) => handlePasswordChange(index * 2, e)}
                            className="bg-[#292929] border border-gray-700 text-[#7a7a7a] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full mr-1 p-2"
                          />
                          <button
                            className="px-4 py-2 ml-1 bg-violet-600 text-white rounded-lg hover:bg-violet-500"
                            onClick={() => handleCopy(index * 2)}
                          >
                            {copiedIndex === index * 2 ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                        <div className="mt-5 flex justify-between items-center">
                          <button
                            onClick={() => setShowPopUp({ type: "edit", status: true })}
                            className="px-3 w-28 py-2 mr-1 bg-[#292929] text-white rounded-lg hover:bg-violet-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setShowPopUp({ type: "delete", status: true })}
                            className="px-3 w-28 py-2 mx-1 bg-[#292929] text-[#E74C3C] hover:text-white rounded-lg hover:bg-[#E74C3C]"
                          >
                            Delete
                          </button>

                          {showPopUp.type === "edit" && showPopUp.status ? (
                            <EditPassword
                              item={item}
                              onClose={() => setShowPopUp((prev) => ({ ...prev, status: false }))}
                              onSubmit={handleSubmit}
                            />
                          ) : null}

                          {showPopUp.type === "delete" && showPopUp.status ? (
                            <DeleteConfirmation
                              item={item}
                              onClose={() => setShowPopUp((prev) => ({ ...prev, status: false }))}
                              onSubmit={onDeletePassword}
                            />
                          ) : null}

                          <button
                            onClick={() => toggleExpand(index * 2)}
                            className="px-3 w-28 py-2 ml-1 bg-[#292929] text-white rounded-lg hover:bg-violet-500"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className='flex flex-col px-4'>
                {column2Data.map((item: any, index: number) => (
                  <div key={index} className={`cursor-pointer transition-all duration-300 ease-in-out md:w-96 my-3 rounded-xl shadow-lg pt-3 px-1 ${isExpanded[index * 2 + 1] ? `h-auto ${theme === 'light' ? 'bg-white' : 'bg-[black]'} border border-gray-500` : `h-16 ${theme === 'light' ? 'bg-white' : 'bg-[#1b1b1b]'}`}`}>
                    <div onClick={() => toggleExpand(index * 2 + 1)} className='flex p-0 justify-between items-center'>
                      <div className="flex justify-start items-center">
                        <SiteIcon />
                        <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-black' : 'text-[#a0a0a1]'}`}>{item.website_name}</h2>
                      </div>
                      <p className={`${theme === 'light' ? 'text-black' : 'text-white'} mx-5`}>{isExpanded[index * 2 + 1] ? '▲' : '▼'}</p>
                    </div>
                    {isExpanded[index * 2 + 1] && (
                      <div className="p-6 pt-3">
                        <div onClick={() => toggleExpand(index * 2 + 1)} className="flex justify-between items-center text-[#CECECE]">
                          <h2 className='text-xl'>{item.website_name}</h2>
                          <p>Mar 06, 2023</p>
                        </div>
                        <div className="flex justify-between items-center my-2 text-[#CECECE]">
                          <p className='mr-4 text-sm'>Password Strength</p>
                          <PasswordStrengthIndicator password={decryptPassword(item.password[index * 2 + 1], item.iv)} />
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                          <input
                            type="password"
                            readOnly
                            value={decryptPassword(item.password[index * 2 + 1], item.iv)}
                            onChange={(e) => handlePasswordChange(index * 2 + 1, e)}
                            className="bg-[#292929] border border-gray-700 text-[#7a7a7a] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full mr-1 p-2"
                            placeholder="********"
                          />
                          <button
                            className="px-4 py-2 ml-1 bg-violet-600 text-white rounded-lg hover:bg-violet-500"
                            onClick={() => handleCopy(index * 2 + 1)}
                          >
                            {copiedIndex === index * 2 + 1 ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                        <div className="mt-5 flex justify-between items-center">
                          <button
                            onClick={() => setShowPopUp({ type: "edit", status: true })}
                            className="px-3 w-28 py-2 mr-1 bg-[#292929] text-white rounded-lg hover:bg-violet-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setShowPopUp({ type: "delete", status: true })}
                            className="px-3 w-28 py-2 mx-1 bg-[#292929] text-[#E74C3C] hover:text-white rounded-lg hover:bg-[#E74C3C]"
                          >
                            Delete
                          </button>

                          {showPopUp.type === "edit" && showPopUp.status ? (
                            <EditPassword
                              item={item}
                              onClose={() => setShowPopUp((prev) => ({ ...prev, status: false }))}
                              onSubmit={handleSubmit}
                            />
                          ) : null}

                          {showPopUp.type === "delete" && showPopUp.status ? (
                            <DeleteConfirmation
                              item={item}
                              onClose={() => setShowPopUp((prev) => ({ ...prev, status: false }))}
                              onSubmit={onDeletePassword}
                            />
                          ) : null}

                          <button
                            onClick={() => toggleExpand(index * 2 + 1)}
                            className="px-3 w-28 py-2 ml-1 bg-[#292929] text-white rounded-lg hover:bg-violet-500"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
          : isLoading ?

            <LoadingSpinner />
            :
            <>
              <h2 className={`text-center mt-40 text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Aww Snap! You Dont Have Any Saved Passwords Yet</h2>
              <div className='flex justify-center m-2 mt-4 px-5'>
                <button onClick={() => setShowPopUp({ type: "add", status: true })} className={`px-5 ${theme === 'dark' ? 'bg-[#292929c3] text-[#73D285]' : 'bg-[#ffffff] text-[#33ac49] font-semibold'} hover:ring-1  ring-gray-600 rounded-md py-1`}>
                  + Add
                </button>
              </div>
              {showPopUp.type === "add" && showPopUp.status ? (
                <CreatePassword
                  onClose={() => setShowPopUp((prev) => ({ ...prev, status: false }))}
                  onSubmit={handleSubmit}
                />
              ) : null}
            </>
        }
      </div>
    </AuthHoc>
  );
}
