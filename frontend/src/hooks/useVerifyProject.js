import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

function useVerifyProject() {
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

    message && history.push("/admin/dashboard?filter=projects");
  }, [addToast, message, error, history]);

  const verifyProject = useCallback(
    (id) => {
      setLoading(true);
      setMessage("");
      setError("");

      const token = window.localStorage.getItem("token");

      axios({
        method: "get",
        url: `/project/verify/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(({ data: { data, message, project,all } }) => {
          setMessage(message);
          dispatch({ type: "VERIFY_PROJECT", payload: data, project: project ,admin: all});
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

  return { verifyProject, loading, message, error, success };
}

export default useVerifyProject;
