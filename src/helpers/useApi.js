import { useEffect, useState, useMemo, useRef } from "react";
import axios from "../config/axios";
import { useIonLoading, useIonToast } from "@ionic/react";
import { config } from "../config/config";

const useApi = (params) => {
  const [response, setResponse] = useState({});
  const [showLoader, hideLoader] = useIonLoading();
  const [present] = useIonToast();
  //Deep Comparision not possible for object and array so converting to string
  const paramsCompare = JSON.stringify(params);

  // const person = useMemo(
  //   () => params,
  //   [] //no dependencies so the value doesn't change
  // );

  const presentToast = (message, type) => {
    present({
      message: message,
      duration: 2000,
      position: "bottom",
      color: type ? type : "info",
    });
  };

  const setApi = async (params) => {
    showLoader(config.LoaderOptions);
    await axios
      .get(null, {
        params: params,
      })
      .then((response) => {
        hideLoader();

        if (response.data.message) {
          presentToast(response.data.message);
        }

        if (response.data.messages) {
          for (const [key, value] of Object.entries(response.data.messages)) {
            value.forEach((message) => {
              presentToast(message, key);
            });
          }
        }
        setResponse(response.data.data);
      });
  };

  useEffect(() => {
    setApi(params);
  }, [paramsCompare]);

  return response;
};

export default useApi;
