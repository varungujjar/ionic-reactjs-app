import axios from "axios";
import { config } from "./config";

export default axios.create({
  baseURL: config.baseUrl,
  params: {
    option: "com_ajax",
    group: "system",
    plugin: "ajax",
    format: "json",
  },
});
