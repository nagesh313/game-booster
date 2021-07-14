import { withSnackbar } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { failureToast } from "../util/util";
declare const paypal: any;
const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

function PayPal(props: any) {
  const createOrder = (props: any, data: any, actions: any) => {
    return actions.order.create({
      // env: "sandbox",
      // client: {
      //   sandbox: "demo_sandbox_client_id",
      //   production: "demo_production_client_id",
      // },
      purchase_units: [
        {
          amount: {
            value: props.amount,
            currency: "USD",
          },
        },
      ],
    });
  };

  const onApprove = async (props: any, data: any, actions: any) => {
    const order = await actions.order.capture();
    props.paymentSuccess(order);
  };
  const onError = (props: any, err: any) => {
    props.paymentFailed(err);
  };
  const onCancel = (props: any, data: any, actions: any) => {
    props.enqueueSnackbar("Payment Cancelled", failureToast);
  };
  return (
    <PayPalButton
      createOrder={(data: any, actions: any) =>
        createOrder(props, data, actions)
      }
      onApprove={(data: any, actions: any) => onApprove(props, data, actions)}
      onError={(data: any) => onError(props, data)}
      onCancel={(data: any, actions: any) => onCancel(props, data, actions)}
    />
  );
}

export const PayPalComponent = withSnackbar(PayPal);
