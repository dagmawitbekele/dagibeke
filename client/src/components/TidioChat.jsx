import { useEffect } from "react";

const TidioChat = () => {
  useEffect(() => {
    // Only add the script if it hasn't been added yet
    if (!document.getElementById("tidio-script")) {
      const script = document.createElement("script");
      script.id = "tidio-script";
      script.src = "//code.tidio.co/cjzvtngoh5b9njhsu2dkhasorreljdov.js"; // Replace with your Tidio key
      script.async = true;

      // Optional: handle when the script is loaded
      script.onload = () => {
        console.log("Tidio script loaded");
        if (window.tidioChatApi) {
          window.tidioChatApi.open(); // Opens Tidio automatically
        }
      };

      document.body.appendChild(script);
    } else {
      // If script already exists, just open Tidio
      if (window.tidioChatApi) {
        window.tidioChatApi.open();
      }
    }
  }, []);

  return null; // No UI element needed
};

export default TidioChat;
