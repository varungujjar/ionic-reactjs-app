import { useEffect } from "react";
import { useIonToast } from "@ionic/react";
import { closeCircle } from "ionicons/icons";

//Function to decode the messages from the API and dispatching to Context
export const setToast = (GlobalContext, data) => {
  const dispatchToastMessages = (message, type) => {
    GlobalContext.setToastMessages({
      message: message,
      type: type,
    });
  };

  if (data.message) {
    dispatchToastMessages(data.message, data.type ? data.type : "primary");
  }

  if (data.messages) {
    for (const [key, value] of Object.entries(data.messages)) {
      value.forEach((message) => {
        dispatchToastMessages(message, key);
      });
    }
  }
};

//Renders the Toast
export const RenderToast = ({ message, type, onDismiss }) => {
  const [present] = useIonToast();

  useEffect(() => {
    present({
      duration: 3000,
      position: "bottom",
      color: type,
      showCloseButton: true,
      //   icon: "",
      onDidDismiss: onDismiss,
      htmlAttributes: "",
      // header: "Header",
      message: message,
      buttons: [
        {
          side: "end", // start
          icon: closeCircle,
          // text: "Close",
          role: "cancel",
          handler: onDismiss,
        },
      ],
    });
  }, [message]);
};

RenderToast.defaultProps = {
  type: "primary",
  message: "Notification Message",
};
