import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useToasts } from 'react-toast-notifications'

function useAddVolunteer() {
    const [loading, setLoading] = useState(false)
    const {addToast} = useToasts()
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const dispatch = useDispatch()

    
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
      }, [addToast,message,error]);

    const addVolunteer = useCallback(
        (id,token) => {
            setLoading(true)
            setMessage('')
            setError('')
            const config = {
                "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
            }

            axios({
                method: "put",
                url: `/project/add/volunteer/${id}`,
          
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                
              }).then(({data:{data,message,success}})=> {
                setMessage(message)
                console.log(data)
                dispatch({ type: 'ADD_VOLUNTEER', payload: data })
            }).finally(()=> {
                setLoading(false)
            }).catch((err) => {
                setError(err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,)
            })
        },
        [dispatch],
    )

    return {addVolunteer,loading,message,error,success}
}

export default useAddVolunteer
