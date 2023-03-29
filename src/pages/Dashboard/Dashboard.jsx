import React, { useEffect, useState } from "react";
import { PROFILE_DEFAULT, VERIFIED_ICON } from "../../constant/image";
import {
  S3_BUCKET,
  ACCESS_KEY,
  REGION,
  SECRET_KEY,
} from "../../constant/core-helper";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const Dashboard = () => {
  const [profile, setProfile] = useState("");

  // useEffect(() => {
  //   const ws = new WebSocket("ws://localhost:8000/echo/1");
  //   ws.addEventListener("message", function (e) {
  //     console.log(e);
  //   });
  // }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: `${file.name}-${Date.now()}`,
    };

    myBucket.upload(params, (err, ec2data) => {
      if (err) {
        console.log(err);
      }
      console.log(ec2data);
      setProfile(ec2data.Location);
    });
  };
  return (
    <>
      <div className="container dashboard-container d-flex align-items-center justify-content-center">
        <div className="row w-100 d-flex align-items-center justify-content-center">
          <div className="col-md-6">
            <div className="card p-3 row">
              <div className="profile-circle d-flex align-items-center justify-content-center">
                <div className="row">
                  <div className="col-6">
                    {" "}
                    <img src={VERIFIED_ICON} />
                  </div>
                  <div className="col-6">
                    <img
                      alt="profile pic"
                      src={profile ? profile : PROFILE_DEFAULT}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="btn trash-icon"
                  onClick={() => setProfile("")}
                ></button>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="file"
                    id="profileImg"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleUpload(e)}
                  />
                  <div className="upload-wrapper d-flex align-items-center justify-content-center">
                    <label htmlFor="profileImg" className="upload-btn">
                      Click here to Upload image
                    </label>
                  </div>
                </div>

                <div className="col-md-12 mt-3">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstname"
                    maxLength={50}
                    minLength={2}
                  />
                </div>

                <div className="col-md-12 mt-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastname"
                    maxLength={50}
                    minLength={2}
                  />
                </div>

                <div className="col-md-12 mt-3">
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="mobile"
                    maxLength={50}
                    minLength={2}
                  />
                </div>

                <div className="col-md-12 mt-3">
                  <button className="btn btn-primary w-25" type="button">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
