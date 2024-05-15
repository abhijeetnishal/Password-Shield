import React, { useEffect, useState } from "react";
import "../../styles/EditPassword.css";
import eye from "../../assets/eye-image.png";
import cutEye from "../../assets/cut-eye-image.png";
import SaveBtn from "../../assets/save-btn.png";

const EditPassword = (props) => {
  const { item, onClose, editData, updateBtn } = props;

  const [websiteName, setWebsiteName] = useState(item.websitename);
  const [password, setPassword] = useState(item.password);
  const [message, setMessage] = useState("");
  const [isEyeBtnClicked, setIsEyeBtnClicked] = useState(true);
  const [passwordType,setPasswordType] = useState('password');

  async function decrypt(passwordId){
    setIsEyeBtnClicked(!isEyeBtnClicked);
    if(isEyeBtnClicked){
    const response = await fetch(`${process.env.REACT_APP_HOST_URL}/passwords/specific/${passwordId}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    
    const data = await response.json();
    console.log(data);
    setPasswordType('text');
    setPassword(data.decryptedPassword);
  }else{
    setPasswordType('password');
  } 

}

  function updateFunc() {
    if (websiteName && password) {
      updateBtn(true);
      editData({ websiteName, password });
    } else {
      setMessage("Enter All Details");
    }
  }
  return (
    <div onClick={onClose} className="editOverlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="editModalContainer"
      >
        <div className="editDataText">{`Edit ${item.websitename}`}</div>
        <div className="websiteNameContainer">
          <div>
            <label htmlFor="" className="websiteName">
              Website Name
            </label>
          </div>
          <div>
            <input
              className="inputField"
              type="text"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              placeholder="Google"
            />
          </div>
        </div>
        <div className="passwordContainer">
          <div>
            <label htmlFor="" className="websiteName">
              Password
            </label>
          </div>
          <div className="passwordInput">
            <input
              className="inputField"
              type={passwordType}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="1234567sdfgh"
            />
            <button
              onClick={() => decrypt(item._id)}
              className="eyeButton"
            >
              {isEyeBtnClicked ? (
                <img src={eye} alt=""/>
              ) : (
                <img src={cutEye} alt=""/>
              )}
            </button>
          </div>
        </div>
        <div className="editBtnContainer">
          <button className="cancelBtn" onClick={onClose}>
            cancel{" "}
          </button>
          <button className="saveBtn" onClick={updateFunc}>
            <img className="saveBtnImg" src={SaveBtn} alt="" />
            <div className="saveText">Save</div>
          </button>
        </div>
        <div className="editMessage">{message}</div>
      </div>
    </div>
  );
};

export default EditPassword;
