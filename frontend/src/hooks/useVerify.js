import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

function useVerify() {
    const history = useHistory()
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    error &&
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });

    message &&
      addToast(message, {
        appearance: "success",
        autoDismiss: true,
      });

    message && history.push("/");
  }, [addToast, message, error,history]);

  const verifyOtp = useCallback(
    (code) => {
      setLoading(true);
      setMessage("");
      setError("");

      const token = window.localStorage.getItem("token");

      axios({
        method: "post",
        url: `/auth/verify`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          otpCode: code,
        },
      })
        .then(({ data: { data, message} }) => {
          setMessage(message);
          dispatch({ type: "VERIFY_EMAIL", payload: data });
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((err) => {
          setError(
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message
          );
        });
    },
    [dispatch]
  );

  return { verifyOtp, loading, message, error, success };
}

export default useVerify;
