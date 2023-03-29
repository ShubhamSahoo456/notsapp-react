import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpLogin = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();
  const tabChange = function (val) {
    let ele = document.querySelectorAll("input");
    if (ele[val].value != "") {
      if (val == 9) {
        ele[val].focus();
      } else {
        ele[val + 1].focus();
      }
    } else if (ele[val].value == "") {
      if (val == 0) {
        ele[val].focus();
      } else {
        ele[val - 1].focus();
      }
    }
    let num = "+91";
    ele.forEach((element) => {
      num += element.value;
    });
    console.log(num);
    setMobileNumber(num);
  };

  const generateOtp = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/generateOtp",
        { phone: mobileNumber }
      );
      if (data) {
        navigate(`/verify/?phone=${data.Details.phone}`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const pasteValue = (ev) => {
    let elsInput = document.querySelectorAll("input");
    const clip = ev.clipboardData.getData("text"); // Get clipboard data
    const pin = clip.replace(/\s/g, ""); // Sanitize string
    const ch = [...pin]; // Create array of chars
    elsInput.forEach((el, i) => (el.value = ch[i] ?? "")); // Populate inputs
    elsInput[pin.length - 1].focus();
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-8 text-center">
            <div className="row">
              <div className="col-12 mt-5 bgWhite">
                <div className="title">Enter Mobile Number</div>

                <form action="" className="mt-5">
                  <input
                    className="otp"
                    type="text"
                    onChange={() => tabChange(0)}
                    minLength="1"
                    maxLength="1"
                    onPaste={pasteValue}
                    autoFocus
                  />
                  <input
                    className="otp"
                    type="text"
                    onChange={() => tabChange(1)}
                    maxLength="1"
                    onPaste={pasteValue}
                  />
                  <input
                    className="otp"
                    type="text"
                    onChange={() => tabChange(2)}
                    maxLength="1"
                    onPaste={pasteValue}
                  />
                  <input
                    className="otp"
                    type="text"
                    onChange={() => tabChange(3)}
                    maxLength="1"
                    onPaste={pasteValue}
                  />
                  <input
                    className="otp"
                    type="text"
                    onChange={() => tabChange(4)}
                    maxLength="1"
                    onPaste={pasteValue}
                  />
                  <input
                    className="otp"
                    type="text"
                    onChange={() => tabChange(5)}
                    maxLength="1"
                    onPaste={pasteValue}
                  />
                  <input
                    className="otp"
                    type="text"
                    onChange={() => tabChange(6)}
                    maxLength="1"
                    onPaste={pasteValue}
                  />
                  <input
                    className="otp"
                    type="text"
                    onChange={() => tabChange(7)}
                    maxLength="1"
                    onPaste={pasteValue}
                  />
                  <input
                    className="otp"
                    type="text"
                    onChange={() => tabChange(8)}
                    maxLength="1"
                    onPaste={pasteValue}
                  />
                  <input
                    className="otp"
                    type="text"
                    onChange={() => tabChange(9)}
                    maxLength="1"
                    onPaste={pasteValue}
                  />
                </form>
                <hr className="mt-4" />
                <button
                  onClick={generateOtp}
                  className="btn btn-primary btn-block mt-4 mb-4 customBtn"
                >
                  Send Otp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpLogin;
