"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState<boolean>(true);
  const router = useRouter();
  const { id, token } = router.query;

  useEffect(() => {
    const verifyEmailUrl = async () => {
      if (id && token) {
        try {
          const url = `http://localhost:8000/api/v1/users/${id}/verify/${token}`;
          const { data } = await axios.get(url);
          console.log("Verification data:", data);
          setValidUrl(true);
        } catch (error) {
          console.error(error);
          setValidUrl(false);
        }
      }
    };

    verifyEmailUrl();
  }, [id, token]);

  return (
    <>
      {validUrl ? (
        <div>
          <h1>Email verified successfully</h1>
          <a href="/login">
            <button>Login</button>
          </a>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </>
  );
};

export default EmailVerify;
