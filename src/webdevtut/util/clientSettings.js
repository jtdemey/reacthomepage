import { cli } from "winston/lib/winston/config";

const clientSettings = {
  width: 1200,
  height: 800
};

export default clientSettings;

export const getClientSettings = () => {
  clientSettings.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; 
  clientSettings.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; 
};