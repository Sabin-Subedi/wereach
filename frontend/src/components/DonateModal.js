import axios from "axios";
import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import {
  Button,
  Col,
  Container,
  FormControl,
  FormLabel,
  Modal,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { donateMoney } from "../actions/projectActions";
import { useToasts } from "react-toast-notifications";

function DonateModal(props) {
  const { addToast } = useToasts();
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const [amount, setAmount] = useState(100);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, [history, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(
      donateMoney(localStorage.getItem("token"), props.id, paymentResult)
    );
  };

  return (
    <div>
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Make a Donation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <div className="d-flex align-items-center">
              <FormLabel className="">Amount($):</FormLabel>
              <FormControl
                className="ms-2"
                type="number"
                value={amount}
                onChange={(e) => {
                  if (
                    e.target.value >
                    props.data?.donationAmount - props.data?.donatedAmount
                  ) {
                    addToast("You can't donate more than the asked amount.", {
                      appearance: "error",
                      autoDismiss: true,
                    });
                    setAmount(
                      props.data?.donationAmount - props.data?.donatedAmount
                    );
                  } else {
                    setAmount(e.target.value);
                  }
                }}
              ></FormControl>
            </div>
            <div className="mt-4">
              <h5 className="text-center">Donate Now Using</h5>

              <PayPalButton amount={amount} onSuccess={successPaymentHandler} />
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DonateModal;
