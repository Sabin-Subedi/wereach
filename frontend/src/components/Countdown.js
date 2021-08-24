import React, { useEffect, useState } from "react"
import moment from "moment"
import useResend from "../hooks/useResend"

export default function Countdown({ seconds }) {
    const {resendOtp} = useResend()
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    if (!timeLeft) return

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeLeft])

  const handleClick = () => {
      resendOtp()
  }

  return (
    <>
      {timeLeft > 0 ? (
        <span className="text-primary fs-8">
          Resend in ({moment.utc(timeLeft * 1000).format("mm:ss")})
        </span>
      ) : (
        <span className="text-primary fs-8 pointer" onClick={handleClick}>
          Resend Now
        </span>
      )}
    </>
  )
}
