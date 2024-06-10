import { useEffect } from "react";

export const AmeCard = ({
  setCreatingSession,
  sessionId,
  countryCode,
  scriptURL,
}) => {
  useEffect(() => {
    const divID = document.getElementById("ae-card-element");
    divID.innerHTML = "Please try again later.";
    if (!sessionId || !scriptURL) return;
    divID.innerHTML = "";
    setCreatingSession(false);
    const script = document.createElement("script");
    script.src = scriptURL;
    script.async = true;
    script.onload = () => {
      setCreatingSession(true);
      const config = {
        countryCode: countryCode,
        sessionId: sessionId,
        cardViewId: "ae-card-element",
        supportedNetworks: "ae",
        callback: (response) => {
          console.log(response);
        },
        style: {
          hideCardIcons: false,
          direction: "ltr",
          cardHeight: 130,
          tokenHeight: 130,
          input: {
            color: "black",
            fontSize: "17px",
            fontFamily: "sans-serif",
            inputHeight: "50px",
            inputMargin: "10px",
            borderColor: "c7c7c7",
            borderWidth: "1px",
            borderRadius: "8px",
            boxShadow: "",
            placeHolder: {
              holderName: "Name On Card",
              cardNumber: "Number",
              expiryDate: "MM / YY",
              securityCode: "CVV",
            },
          },
          text: {
            saveCard: "Save card info for future payment.",
            addCard: "Use another Card!",
            deleteAlert: {
              title: "Delete",
              message: "Test",
              confirm: "yes",
              cancel: "no",
            },
          },
          label: {
            display: false,
            color: "black",
            fontSize: "13px",
            fontWeight: "normal",
            fontFamily: "sans-serif",
            text: {
              holderName: "Card Holder Name",
              cardNumber: "Card Number",
              expiryDate: "Expiry Date",
              securityCode: "Security Code",
            },
          },
          error: {
            borderColor: "red",
            borderRadius: "8px",
            boxShadow: "0px",
          },
        },
      };
      if (window.myFatoorah) {
        window.myFatoorah.init(config);
      }
      const iFrame = document.querySelector("[name='iframeCardView']");
      if (iFrame) {
        iFrame.style.width = "100%";
        iFrame.style.height = "300px";
      }
      setCreatingSession(false);
    };
    document.body.appendChild(script);
  }, [sessionId]);

  return <div id="ae-card-element"></div>;
};
