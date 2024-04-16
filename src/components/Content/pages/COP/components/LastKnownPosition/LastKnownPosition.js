/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: LastKnownPosition.js
 * Created: Tuesday, 2nd August 2022 2:41:20 pm
 * Modified: Wednesday, 17th August 2022 11:21:15 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect, useRef } from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import UserList from "./components/UserList";
import { getOpsSelected } from "app/copSlice";
import { setMapTool, getAuthToken, setMapCommand } from "app/appSlice";

// icons
import CloseIcon from "@material-ui/icons/Close";

export default function LastKnownPosition() {
  var dispatch = useDispatch();
  const token = useSelector(getAuthToken);
  const opsSelected = useSelector(getOpsSelected);

  const [open, setOpen] = React.useState(false);
  const [userList, setUserList] = React.useState([]);
  const isTablet = useMediaQuery("(max-width:1300px)");

  const refOpen = useRef();
  refOpen.current = open;

  const useStyles = makeStyles({
    paper: {
      height: window.innerWidth - 100,
      width: 450,
      marginTop: isTablet ? 95 : 135,
      backgroundColor: "rgba(0,0,0,0.2)",
      backdropFilter: "blur(15px)",
    },
  });
  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => {
      window.MessageDispatcher.SubscribeDispatcher("LAST_POSITION", (param) => {
        switch (param.Command) {
          case "DISPLAY_LIST":
            setOpen(true);
            break;
          case "CLOSE_LIST":
            setOpen(false);
            break;
        }
      });
    }, 1000);
  }, []);

  useEffect(() => {
    LoadUserList();
  }, [opsSelected]);

  const LoadUserList = () => {
    setTimeout(() => {
      // var url = `https://mabpoc.scs.my:${window.appConfig.restPort}/blue_track/blue_track_id/0`;
      var url = `https://mabpoc.scs.my:${window.appConfig.restPort}/blue_track/organization_id/${opsSelected.organization_id}`;

      fetch(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((result) => result.json())
        .then((data) => {
          // var lst = [];
          // for (var i = 0; i < data.length; i++) {
          //   if (data[i].organization_id === opsSelected.organization_id) {
          //     lst.push(data[i]);
          //   }
          // }
          // setUserList(lst);
          setUserList(data);
        })
        .catch(function (err) {
          console.log("UserList:" + err);
        });
    }, 1000);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(setMapTool(""));
  };

  return (
    <div>
      <Drawer
        classes={{ paper: classes.paper }}
        anchor={"right"}
        open={open}
        variant={"persistent"}
        onClose={() => setOpen(false)}
      >
        <div>
          <div>
            <p
              style={{
                textAlign: "center",
                backgroundColor: "orange",
                padding: 10,
                margin: 10,
                color: "black",
                fontSize: 18,
              }}
            >
              LOKASI JEJAK TERAKHIR
            </p>
          </div>
          <div style={{ float: "right", marginTop: -48, marginRight: 15 }}>
            <div
              onClick={() => handleClose()}
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                borderRadius: 50,
                width: 35,
                height: 35,
                cursor: "pointer",
              }}
            >
              <Tooltip title="CLOSE">
                <CloseIcon
                  style={{
                    color: "white",
                    fontSize: 24,
                    marginLeft: 5,
                    marginTop: 5,
                  }}
                />
              </Tooltip>
            </div>
          </div>
        </div>

        <UserList data={userList} />
      </Drawer>
    </div>
  );
}
