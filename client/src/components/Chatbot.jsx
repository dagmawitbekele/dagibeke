import { useEffect } from "react";

const TidioChat = () => {
  useEffect(() => {
    // Prevent multiple scripts
    if (!window.tidioChatApi) {
      const script = document.createElement("script");
      script.src = "//code.tidio.co/cjzvtngoh5b9njhsu2dkhasorreljdov.js";
      script.async = true;
      script.onload = () => {
        console.log("Tidio script loaded successfully");
      };
      document.body.appendChild(script);
    }
  }, []);

  return null;
};

export default TidioChat;
