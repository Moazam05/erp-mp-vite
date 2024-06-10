import { useEffect } from "react";

export const GooglePay = ({
  setCreatingSession,
  sessionId,
  amount,
  paymentMetaData,
  scriptURL,
}) => {
  useEffect(() => {
    if (!sessionId || !scriptURL) return;
    setCreatingSession(false);
    const divID = document.getElementById("gp-card-element");
    divID.innerHTML = "";
    const script = document.createElement("script");
    script.src = scriptURL;
    script.async = true;
    script.setAttribute("nonce", "lVK1zSTtmsPsHYG6l7rhyg");
    script.onload = () => {
      setCreatingSession(true);

      function payment(response) {
        // Here you need to pass session id to you backend here
        // var sessionId = response.sessionId;
        // var cardBrand = response.cardBrand;
        // var cardIdentifier = response.cardIdentifier;
        console.log(response);
      }

      const config = {
        sessionId: sessionId,
        amount: amount,
        currencyCode: paymentMetaData.currency_code,
        countryCode: paymentMetaData.iso_code,
        cardViewId: "gp-card-element",
        callback: payment,
        style: {
          frameHeight: 51,
          button: {
            height: "50px",
            text: "pay", // Accepted values: ["pay", "book", "buy", "order", "subscribe"]
            borderRadius: "20px",
            color: "default", // Accepted colors: ["black", "white", "default"]
            language: "en",
          },
        },
      };
      if (window.myFatoorahGP) {
        window.myFatoorahGP.init(config);
      }
      setCreatingSession(false);
    };
    document.body.appendChild(script);
  }, [sessionId]);

  return <div id="gp-card-element"></div>;
};
