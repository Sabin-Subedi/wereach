import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Countdown from "../components/Countdown";
import NavbrandNav from "../components/NavbrandNav";
import useVerify from "../hooks/useVerify";

function VerifyScreen() {
const history = useHistory()
  const { userInfo } = useSelector((state) => state.user);
  const splitEmail = userInfo?.email?.split("@");
  const {verifyOtp,loading} = useVerify()


  const [iat, setIat] = useState(Math.floor(Date.now() / 1000))
  const [exp, setExp] = useState(Math.floor(Date.now() / 1000) + 1 * 60)

 useEffect(() => {
     if(userInfo?.emailVerified){
        history.push("/")
     }
 }, [userInfo,history])


  return (
    <div>
      <NavbrandNav button={false} />
      <Col xs={10} sm={7} md={4} className="mx-auto rounded-3">
        <Card className="p-4 p-sm-5 mt-4">
          <div className="d-flex justify-content-center">
            <img
              src="/password.svg"
              alt=""
              srcset=""
              style={{ width: "40%" }}
            />
          </div>
          <Card.Title className="fs-4 text-success text-center my-3 mt-4">
            Confirm that it's you
          </Card.Title>
          <p>
            We've sent an email to{" "}
            <span className="fw-bold">
              {splitEmail && splitEmail[0].substring(0, 1)}...
              {splitEmail &&
                splitEmail[0].substring(
                  splitEmail[0].length - 2,
                  splitEmail[0].length
                )}
              @{splitEmail && splitEmail[1]}
            </span>{" "}
            with a six digit code. Enter the code in the code box below and
            press Confirm.
          </p>
         
          <Formik
       initialValues={{ otpCode: '',  }}
       validate={values => {
         const errors = {};
         console.log(values.otpCode)
         if (values.otpCode.length !== 6) {
           errors.otpCode = 'Enter 6-digit Otp Code.';
         } 
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           verifyOtp(values.otpCode)
           setSubmitting(false);
         }, 400);
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
      
         <Form onSubmit={handleSubmit}>
           <Form.Control
           className={ errors.otpCode &&
            "border-danger focus-danger error_focus "}
             type="textr"
             name="otpCode"
             maxLength={6}
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.otpCode}
            
             placeholder='Enter 6-digit Otp Code'
           />
           <p className='text-danger mb-0'>{errors.otpCode && touched.otpCode && errors.otpCode}</p>
          
         
         <div className="d-grid mt-3">

            <Button variant='success' type='submit' className=''>Verify your email</Button>
         </div>
           
         <p className='text-success text-center mt-3 mb-0 fs-8'>Didn't Recieve a code? <Countdown seconds={exp -iat} /></p>
         </Form>


        
       )}
        
     </Formik>
        
        </Card>
      </Col>
    </div>
  );
}

export default VerifyScreen;
