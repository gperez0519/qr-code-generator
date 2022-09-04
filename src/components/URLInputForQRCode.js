import React, { useState } from "react";
import { sanitizeURL } from "../util/sanitizeURL";
import { ImSpinner9 } from "react-icons/im";

import "./urlInput.css";

import axios from "axios";

const URLInput = () => {
  const [url, setURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrCode, setQRCode] = useState("");
  const [error, setErrorMessage] = useState("");
  const [success, setSuccessMessage] = useState("");

  const updateURL = (urlForQRCode) => {
    setErrorMessage("");
    if (
      urlForQRCode.length > 4 &&
      urlForQRCode.indexOf("www.") >= 0 &&
      urlForQRCode.indexOf("http") < 0 &&
      urlForQRCode.indexOf("://") < 0
    ) {
      urlForQRCode = `https://${urlForQRCode}`;

      // set the URL code based on the value input from user
      setURL(urlForQRCode);
    } else {
      // set the URL code based on the value input from user
      setURL(urlForQRCode);
    }

    if (success && qrCode) {
      setSuccessMessage("");
      setQRCode("");
    }
  };

  const sanitizeAndRetrieveQRCode = async () => {
    if (url) {
      // Set loading at valid QR code generation.
      setLoading(true);

      // Reset error message
      setErrorMessage("");

      try {
        // Clean the URL passed and valid using util
        const urlSanitized = sanitizeURL(url);

        if (urlSanitized !== "") {
          const response = await axios.post("/get-qrcode", {
            url: urlSanitized,
          });

          // capture the axios data response.
          let data = response.data;

          // Set the response QR Code
          setQRCode(data.data);

          // Set loading to false since the response was successful.
          setLoading(false);

          // Set the success message to indicate to user this QR code generation was successful
          setSuccessMessage("Successful QR Code Generation!");
        } else {
          // Set loading to false since there was an error.
          setLoading(false);

          setErrorMessage(
            "Invalid URL. Please enter a valid URL and try again!"
          );
        }
      } catch (error) {
        // Set loading to false since there was an error.
        setLoading(false);

        // console.log(`Unsuccessful response to front end ${error.message}`);
        // console.log(`Unsuccessful response to front end code ${error.code}`);
        setErrorMessage(
          error.code === "ERR_BAD_REQUEST" || error.code === "ECONNREFUSED"
            ? "Invalid URL. Please enter a valid URL and try again!"
            : error.message
        );
      }
    } else {
      // if the url was not valid display the error message to the user.
      setErrorMessage("Enter a valid URL");
    }
  };

  const handleKeyPress = e => {
    //it triggers by pressing the enter key
    if (e.code === "Enter") {
      sanitizeAndRetrieveQRCode();
    }
  };

  return (
    <div className="main-qr-container">
      {error && <div className="errorOccurred">{error}</div>}
      {success && <div className="successQRCodeRetrieval">{success}</div>}
      <input
        className="url-input"
        onChange={(e) => updateURL(e.target.value)}
        name="url-input"
        placeholder="Enter URL for QR Code"
        onKeyPress={handleKeyPress}
        value={url}
      />

      <button
        className="btnQRCodeGenerator"
        disabled={url === ""}
        onClick={sanitizeAndRetrieveQRCode}
      >
        {!loading ? "Generate QR Code" : <ImSpinner9 className="flameSpin" />}
      </button>
      {qrCode && <div dangerouslySetInnerHTML={{ __html: qrCode }} />}
    </div>
  );
};

export default URLInput;
