import React from "react";
import ReactDOM from "react-dom";
declare const paypal: any;
const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

export function PayPalComponent(props: any) {
  const createOrder = (data: any, actions: any) => {
    if (!(props.amount > 0)) {
      alert("Please have postive amount in total Value");
      debugger;
    } else {
      return actions.order.create({
        env: "sandbox",
        client: {
          sandbox: "demo_sandbox_client_id",
          production: "demo_production_client_id",
        },
        purchase_units: [
          {
            amount: {
              value: props.amount,
              currency: "USD",
            },
          },
        ],
      });
    }
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture();
  };
  return (
    <PayPalButton
      createOrder={(data: any, actions: any) => createOrder(data, actions)}
      onApprove={(data: any, actions: any) => onApprove(data, actions)}
      // onApprove={handle_approve}
      // onError={handle_error}
      // onCancel={handle_cancel}
    />
  );
}
