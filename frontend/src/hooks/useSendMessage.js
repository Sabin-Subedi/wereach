import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);


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
  }, [addToast, message, error]);

  const sendMessage = useCallback(
    (data,resetForm) => {
      setLoading(true);
      setMessage("");
      setError("");

      axios({
        method: "post",
        url: `/message`,

        data: data,
      })
        .then(({ data: { data, message, success } }) => {
          setMessage(message);
      
          success &&  resetForm({email: "", fullname: "", description: ""})
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
    []
  );

  return { sendMessage, loading, message, error, success };
}

export default useSendMessage;
