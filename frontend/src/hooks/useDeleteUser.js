import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

function useDeleteUser() {
  const history = useHistory();
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

  }, [addToast, message, error, history]);

  const deleteUser = useCallback(
    (id) => {
      setLoading(true);
      setMessage("");
      setError("");

      const token = window.localStorage.getItem("token");

      axios({
        method: "delete",
        url: `/auth/user/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(({ data: { data, message,  } }) => {
          setMessage(message);
          dispatch({ type: "DELETE_USER", payload: data,  });
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response);
          setError(
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message
          );
        });
    },
    [dispatch]
  );

  return { deleteUser, loading, message, error, success };
}

export default useDeleteUser;
