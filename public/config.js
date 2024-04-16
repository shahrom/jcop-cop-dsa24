/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: config.js
 * Created: Monday, 13th June 2022 6:04:30 pm
 * Modified: Tuesday, 14th June 2022 1:54:21 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

var appState = {
  mode: "stage",
  deployConfig: {
    appEnv: "",
    socketPort: "55410",
    restPort: "55455",
    chatPort: "55443",
    mediaPort: "55443",
    authenPort: "55444",
    chatGroupId: 1,
    domainName: "https://mabpoc.scs.my",
    serverIP: "192.168.189.14",
    uavURL: "https://vc.sdev.my/uavkemensah",
    camURL: "https://mabpoc.scs.my:45443/nc2p.eots/",
  },
  stageConfig: {
    appEnv: "(STAGING)",
    socketPort: "45410",
    restPort: "45455",
    chatPort: "45443",
    mediaPort: "45443",
    authenPort: "45444",
    chatGroupId: 2,
    domainName: "https://mabpoc.scs.my",
    serverIP: "192.168.189.24",
    uavURL: "https://vc.sdev.my/uavkemensah",
    camURL: "https://mabpoc.scs.my:45443/nc2p.eots/",
  },
  devConfig: {
    appEnv: "(DEV)",
    socketPort: "35410",
    restPort: "35455",
    chatPort: "35443",
    mediaPort: "35443",
    authenPort: "35444",
    chatGroupId: 2,
    domainName: "https://mabpoc.scs.my",
    serverIP: "192.168.189.34",
    uavURL: "https://vc.sdev.my/uavkemensah",
    camURL: "https://mabpoc.scs.my:45443/nc2p.eots/",
  },
  displayConfig: {
    version: "2.1.0.74",
    title: "MAB",
    titleColor: "#891FE8",
    logo: "img/logo/atm-logo.png",
    appColor1: "purple", // Header Buttons
    appColor2: "purple", // Map Buttons
    appColor3: "rgba(62,19,67,0.5)", // Header Background
    appColor4: "rgba(62,19,67,1)", // Drawer
    defaultLat: 33.20485337356785,
    defaultLng: 35.362065331490065,
    defaultZoom: 12,
    background: "img/wallpaper/mab.jpg",
  },
  autoRefresh: {
    enabled: true,
    intervalSec: 1800,
  },
};
window.__INITIAL_STATE__ = appState;
