import { IonToast, IonLoading } from "@ionic/react";
import { format, parseISO } from "date-fns";
// https://date-fns.org/

// export const Url = "https://constellationesports.com/beta/";
export const Url = "http://localhost:8888/esports_web/";

export const Notification = ({ show, message }) => {
  return (
    <IonToast
      isOpen={show}
      message={message}
      duration={1500}
      position="bottom"
      color="danger"
    />
  );
};

export const Loading = ({ show }) => {
  return <IonLoading isOpen={show} />;
};

export const Formatdate = ({ date }) => {
  const _date = format(parseISO(date), "d MMM, yyyy");
  return <>Created on {_date}</>;
};

export const Truncate = (_input, limit) => {
  let input = _input.replace(/<[^>]*>?/gm, "");
  return input.length > limit ? `${input.substring(0, limit)}...` : input;
};

export const LoaderOptions = {
  translucent: true,
  spinner: "crescent",
  showBackdrop: true,
};
