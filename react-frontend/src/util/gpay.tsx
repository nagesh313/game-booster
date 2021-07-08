import React, { useState, useEffect } from "react";
const win: any = window;
const { googlePayClient } = win;

const baseCardPaymentMethod = {
  type: "CARD",
  parameters: {
    allowedCardNetworks: ["VISA", "MASTERCARD"],
    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
  },
};

const googlePayBaseConfiguration = {
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [baseCardPaymentMethod],
};

export function GPayComponent(props: any) {
  const [gPayBtn, setGPayBtn] = useState<any>(null);

  function createAndAddButton() {
    if (googlePayClient) {
      const googlePayButton = googlePayClient.createButton({
        buttonColor: "default",
        buttonType: "long",
        onClick: processPayment,
      });
      setGPayBtn(googlePayButton);
    }
  }

  function processPayment() {
    const tokenizationSpecification = {
      type: "PAYMENT_GATEWAY",
      parameters: {
        gateway: "stripe",
        "stripe:version": "v3",
        "stripe:publishableKey": "pk_test_35p114pH8oNuHX72SmrvsFqh00Azv3ZaIA",
      },
    };

    const cardPaymentMethod = {
      type: "CARD",
      tokenizationSpecification: tokenizationSpecification,
      parameters: {
        allowedCardNetworks: ["VISA", "MASTERCARD"],
        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
        billingAddressRequired: true,
        billingAddressParameters: {
          format: "FULL",
          phoneNumberRequired: true,
        },
      },
    };

    const transactionInfo = {
      totalPriceStatus: "FINAL",
      totalPrice: props.amount,
      currencyCode: "USD",
    };

    const merchantInfo = {
      // merchantId: '01234567890123456789', Only in PRODUCTION
      merchantName: "Example Merchant Name",
    };

    const paymentDataRequest = {
      ...googlePayBaseConfiguration,
      ...{
        allowedPaymentMethods: [cardPaymentMethod],
        transactionInfo,
        merchantInfo,
      },
    };
    console.log(paymentDataRequest);
    //TODO enable me
    props.paymentSuccess();
    // googlePayClient
    //   .loadPaymentData(paymentDataRequest)
    //   .then(function (paymentData: any) {
    //     console.log(paymentData);

    //     props.paymentSuccess();
    //   })
    //   .catch(function (err: any) {
    //     console.log(err);
    //     props.paymentFailed();
    //   });
  }

  useEffect(() => {
    googlePayClient
      .isReadyToPay(googlePayBaseConfiguration)
      .then(function (response: any) {
        if (response.result) {
          createAndAddButton();
        } else {
          alert("Unable to pay using Google Pay");
        }
      })
      .catch(function (err: any) {
        console.error("Error determining readiness to use Google Pay: ", err);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <div
        onClick={processPayment}
        dangerouslySetInnerHTML={{ __html: gPayBtn && gPayBtn.innerHTML }}
      />
    </div>
  );
}
