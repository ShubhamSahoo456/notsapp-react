import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const parm = new URLSearchParams(window.location.search);
  const phone = "+" + parm.get("phone").trim();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const tabChange = function (val) {
    let ele = document.querySelectorAll("input");
    if (ele[val].value != "") {
      if (val == 5) {
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
    let num = "";
    ele.forEach((element) => {
      num += element.value;
    });
    setOtp(num);
  };

  const verifyOtp = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/verifyOtp",
        { phone, otp }
      );
      if (data) {
        localStorage.setItem("userInfo", "data");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-8 text-center">
            <div className="row">
              <div className="col-12 mt-5 bgWhite">
                <div className="title">Verify OTP</div>

                <form action="" className="mt-5">
                  <input
                    className="otp"
                    type="number"
                    onKeyUp={() => tabChange(0)}
                    maxLength={1}
                  />
                  <input
                    className="otp"
                    type="number"
                    onKeyUp={() => tabChange(1)}
                    maxLength={1}
                  />
                  <input
                    className="otp"
                    type="number"
                    onKeyUp={() => tabChange(2)}
                    maxLength={1}
                  />
                  <input
                    className="otp"
                    type="number"
                    onKeyUp={() => tabChange(3)}
                    maxLength={1}
                  />
                  <input
                    className="otp"
                    type="number"
                    onKeyUp={() => tabChange(4)}
                    maxLength={1}
                  />
                  <input
                    className="otp"
                    type="number"
                    onKeyUp={() => tabChange(5)}
                    maxLength={1}
                  />
                </form>
                <hr className="mt-4" />
                <button
                  onClick={verifyOtp}
                  className="btn btn-primary btn-block mt-4 mb-4 customBtn"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
