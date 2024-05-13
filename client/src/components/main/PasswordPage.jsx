import React, { useEffect, useState } from 'react'
import DeleteConfirmation from './DeleteConfirmation'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'
import { Cookies } from 'react-cookie'
import '../../styles/PasswordPage.css'
import EditPassword from './EditPassword'
import CreatePassword from '../main/CreatePassword'
import commonWebsiteSymbolImg from '../../assets/commonWebsiteSymbol.png' 
import eye from '../../assets/eye-image.png';
import cutEye from '../../assets/cut-eye-image.png';
import editBtnImg from '../../assets/editBtnImg.png'
import deleteBtn from '../../assets/deleteBtnblue.png'


const PasswordPage = () => {
    const cookies = new Cookies();
    const cookieValue = cookies.get('myCookie');
    const userId = cookieValue._id;

    const [data, setData] = useState(null);
    const [decryptedPassword, setDecryptedPassword] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [showPopUpDelete, setShowPopUpDelete] = useState(false);
    const [showPopUpEdit, setShowPopUpEdit] = useState(false);
    const [showPopUpAdd, setShowPopUpAdd]  = useState(false);

    const [deleteId, setDeleteId] = useState(null);
    const [editId, setEditId] = useState(null);
    
    const [updateData, setUpdateData] = useState({websiteName:'', password:''});

    const [updateBtnClick, setUpdateBtnClick] = useState(false);

    const [dataLength, setDataLength] = useState(0);

    const [containerHeight, setContainerHeight] = useState(0);

    const [isPasswordEyeBtnClicked, setIsPasswordEyeBtnClicked] = useState(false);

    useEffect(() => {
        // declare the async data fetching function
        setIsLoading(true);
        const fetchData = async () => {
            // get the data from the api
            const response = await fetch(`${process.env.REACT_APP_HOST_URL}/passwords/all/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            // convert the data to json
            const data = await response.json();
            setData(data);

            setDataLength(data.length);

            const height = data.length * 140; // Assuming each item is 50px tall
            setContainerHeight(height);
            //console.log(data);
            setIsLoading(false);
        }
        
        // call the function
        fetchData()
        // make sure to catch any error
        .catch(console.error);
        //eslint-disable-next-line
    }, []);

    async function decrypt(passwordId){
        setIsPasswordEyeBtnClicked(!isPasswordEyeBtnClicked);
        //showHidebtn();
        const response = await fetch(`${process.env.REACT_APP_HOST_URL}/passwords/specific/${passwordId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        
        const data = await response.json();
        // console.log(data);
        setDecryptedPassword(data); 

    }

    useEffect(() => {
        setUpdateData(updateData);
        //console.log(updateData);

        const websiteName = updateData.websiteName;
        const password = updateData.password;
        if(websiteName!=='' && password!=='' && updateBtnClick){
            //console.log(updateData);
            const fetchData = async () => {
                // get the data from the api
                const response = await fetch(`${process.env.REACT_APP_HOST_URL}/passwords/${editId}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        websiteName,
                        password
                    }),
                    credentials: 'include',
                });
                response.json().then(data => ({
                    data: data,
                })
                ).then(res => {
                    //console.log(res.data);
                    window.location.reload(false);
                })
            }
            
            // call the function
            fetchData()
            // make sure to catch any error
            .catch(console.error);
        }
        //eslint-disable-next-line
    }, [updateData]);

    function handleDeleteClick(passwordId){
        setShowPopUpDelete(true);
        setDeleteId(passwordId);
    }

    function handleEditClick(passwordId){
        setShowPopUpEdit(true);
        setEditId(passwordId);
    }

    function handleAddClick(){
        setShowPopUpAdd(true);
    }

    function handleCloseDialogDelete(){
        setShowPopUpDelete(false);
    }

    function handleCloseDialogEdit(){
        setShowPopUpEdit(false);
    }

    function handleCloseDialogAdd(){
        setShowPopUpAdd(false);
    }

    return (
        <div className='main-container' style={{ height: `${containerHeight}px` }}>
            <div className='headingContainer'>
                <div className='yourSavedPasswordText'>
                    Your Saved Passwords
                </div>
                <button className='addNewPassword' onClick={()=>handleAddClick()}>
                    <div className='addNewText'>+Add New</div>
                </button>
                {
                    (showPopUpAdd && userId) && (
                        <CreatePassword
                            onClose={handleCloseDialogAdd}
                        />
                    )
                }
            </div>
            
            <div className='sub-main-container'>
                {
                (dataLength && !isLoading) ? 
                    (data.map((mainData, index) => (
                        <div className='singlePasswordContainer' key={index}>
                            <div className='commonImgNamePasswordDecypt'>
                                <img className='commonWebsiteImg' src={commonWebsiteSymbolImg} alt="" />
                                <div className='namePasswordDecryptContainer'>
                                    <div className='namePasswordContainer'>
                                        <div className='subWebsiteNameContainer'>
                                            {mainData.websitename}
                                        </div>
                                        <div className='subPasswordContainer'>
                                            Password: {(isPasswordEyeBtnClicked && decryptedPassword && decryptedPassword.id === mainData._id) ? decryptedPassword.decryptedPassword : '***********'}
                                        </div>
                                    </div>
                                    <button onClick={()=> decrypt(mainData._id)} className='decryptBtn'>
                                        {
                                            isPasswordEyeBtnClicked ? (<img src={cutEye} alt=''  className='decryptBtnImg'/> )
                                            : (<img src={eye} alt='' className='decryptBtnImg'/> )
                                        }
                                    </button>
                                </div>
                            </div>
                            <div className='editDeleteContainer'>
                                <div className='editContainer'>
                                    <button className='editSubContainer' onClick={()=>handleEditClick(mainData._id)}>
                                        <img className='editImg' src={editBtnImg} alt="" />
                                        <div className='editText'>Edit</div>
                                    </button>
                                    {
                                        (showPopUpEdit && editId===mainData._id) && (
                                            <EditPassword
                                                item = {mainData.websitename}
                                                onClose={handleCloseDialogEdit}
                                                editData = {setUpdateData}
                                                updateBtn = {setUpdateBtnClick}
                                            />
                                        )
                                    }
                                </div>
                                <div className='deleteContainer'>
                                    <button className='deleteSubContainer' onClick={()=>handleDeleteClick(mainData._id)}>
                                        <img className='deleteImg' src={deleteBtn} alt="" />
                                        <div className='deleteTextBtn'>Delete</div>
                                    </button> 
                                    {
                                        (showPopUpDelete && deleteId===mainData._id) && (
                                            <DeleteConfirmation
                                                passwordId={mainData._id}
                                                item={mainData.websiteName}
                                                onClose={handleCloseDialogDelete}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                    ) : 
                    (
                        (isLoading)?
                        (
                            <LoadingSpinner/>
                        )
                        :
                        (
                            <div>
                                You haven't saved any password.
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default PasswordPage