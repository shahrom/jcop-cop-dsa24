/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: PopUpTemplates.js
 * Created: Saturday, 19th March 2022 5:47:23 pm
 * Modified: Saturday, 19th March 2022 6:49:40 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2022 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import { Decimal2DMS, DMS2Decimal } from "dms-to-decimal";

export const reportTemplate = (data) => {
  // Convert the date and time from UTC to localTime & Date string
  var dateTime1 =
    new Date(data.time_of_validity).toLocaleDateString("en-GB") +
    " " +
    new Date(data.time_of_validity).toLocaleTimeString("en-GB");

  var dateTime2 =
    new Date(data.time_of_receipt).toLocaleDateString("en-GB") +
    " " +
    new Date(data.time_of_receipt).toLocaleTimeString("en-GB");

  return (
    <div style={{ padding: "10px", backgroundColor: "black", fontSize: 14 }}>
      <table>
        <tr>
          <td style={{ color: "gray" }}>Time Reported:</td>
          <td style={{ color: "cyan" }}>&nbsp;{dateTime1}</td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Time Received:</td>
          <td style={{ color: "cyan" }}>&nbsp;{dateTime2}</td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Report Type:</td>
          <td style={{ color: "cyan" }}>&nbsp;{data.report_type}</td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Location:</td>
          <td style={{ color: "cyan" }}>&nbsp;{data.location}</td>
        </tr>
      </table>
      <br />
      <div style={{ display: "flex", flexDirection: "row", padding: 2 }}>
        <img
          title={"ImageList:1,Report"}
          onClick={(e) => {}}
          // src={window.location.href + data.attachment}
          src={data.attachment}
          alt=""
          object-fit="contain"
          width="100%"
          height="auto"
        />
      </div>

      <br />
      <div style={{ display: data.description.length > 0 ? "block" : "none" }}>
        <p style={{ color: "gray" }}>Description:</p>
        <p style={{ color: "orange", marginTop: "-10px" }}>{data.description}</p>
      </div>
    </div>
  );
};

export const trackTemplate = (data) => {
  return (
    <div style={{ padding: 10 }}>
      <table>
        <tr>
          <td style={{ color: "gray" }}>Time Reported:</td>
          <td style={{ color: "orange" }}>
            &nbsp;{" "}
            {new Date(data.time_of_validity).toLocaleDateString("en-GB") +
              " " +
              new Date(data.time_of_validity).toLocaleTimeString("en-GB")}
          </td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Time Received:</td>
          <td style={{ color: "orange" }}>
            &nbsp;{" "}
            {new Date(data.time_of_receipt).toLocaleDateString("en-GB") +
              " " +
              new Date(data.time_of_receipt).toLocaleTimeString("en-GB")}
          </td>
        </tr>

        <tr>
          <td style={{ color: "gray" }}>Battery %:</td>
          <td
            style={{
              color:
                data.device_status.battery_percentage >= 50
                  ? "lime"
                  : data.device_status.battery_percentage >= 30
                  ? "orange"
                  : "red",
            }}
          >
            &nbsp; {data.device_status.battery_percentage}
          </td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Network Type:</td>
          <td style={{ color: "white" }}>&nbsp; {data.device_status.network_type}</td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Transmit Interval:</td>
          <td style={{ color: "white" }}>
            &nbsp; {data.device_status.transmit_interval}
          </td>
        </tr>

        <tr>
          <td style={{ color: "gray" }}>Course:</td>
          <td style={{ color: "cyan" }}>
            &nbsp;{" "}
            {data.spatial.course != undefined
              ? data.spatial.course.toFixed(1) + "\u00B0"
              : ""}
          </td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Speed:</td>
          <td style={{ color: "cyan" }}>
            &nbsp;{" "}
            {data.spatial.speed != undefined
              ? data.spatial.speed.toFixed(1) + " km/h"
              : ""}
          </td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Latitude:</td>
          <td style={{ color: "cyan" }}>
            &nbsp; {Decimal2DMS(data.spatial.geometry.coordinates[1], "latitude")}
          </td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Longitude:</td>
          <td style={{ color: "cyan" }}>
            &nbsp; {Decimal2DMS(data.spatial.geometry.coordinates[0], "longitude")}
          </td>
        </tr>
      </table>

      <br />
      <hr style={{ color: "gray", opacity: 0.2 }} />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <p
          onClick={(e) => {}}
          title={"VideoCall:" + data.blue_track_id + "," + data.user_label}
          style={{
            display:
              data.blue_track_type_id === 1 || data.blue_track_type_id === 2
                ? "block"
                : "none",
            marginLeft: 5,
            backgroundColor: "#027DE9",
            color: "white",
            width: 100,
            height: 25,
            cursor: "pointer",
            borderRadius: 5,
            padding: 5,
            textAlign: "center",
          }}
        >
          VIDEO CALL
        </p>
        <p
          onClick={(e) => {}}
          title={"MarkerTrail:" + data.blue_track_id + "," + data.user_label}
          style={{
            // display:
            //   data.blue_track_type_id === 1 || data.blue_track_type_id === 2
            //     ? "block"
            //     : "none",
            marginLeft: 5,
            backgroundColor: "#027DE9",
            color: "white",
            width: 100,
            height: 25,
            cursor: "pointer",
            borderRadius: 5,
            padding: 5,
            textAlign: "center",
          }}
        >
          TRAIL
        </p>
      </div>
    </div>
  );
};

export const trailTemplate = (data) => {
  return (
    <div style={{ padding: 10, fontWeight: "normal" }}>
      <table>
        <tr>
          <td style={{ color: "gray" }}>Status:</td>
          <td style={{ color: "lime" }}>
            &nbsp;{" "}
            {new Date(data.time_of_validity).toLocaleDateString("en-GB") +
              " " +
              new Date(data.time_of_validity).toLocaleTimeString("en-GB")}
          </td>
        </tr>

        <tr>
          <td style={{ color: "gray" }}>Lat:</td>
          <td style={{ color: "white" }}>
            &nbsp; {Decimal2DMS(data.spatial.geometry.coordinates[1], "latitude")}
          </td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Long:</td>
          <td style={{ color: "white" }}>
            &nbsp; {Decimal2DMS(data.spatial.geometry.coordinates[0], "longitude")}
          </td>
        </tr>

        <tr>
          <td style={{ color: "gray" }}>Course:</td>
          <td style={{ color: "white" }}>
            &nbsp;{" "}
            {data.spatial.course != undefined
              ? data.spatial.course.toFixed(1) + "\u00B0"
              : ""}
          </td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Speed:</td>
          <td style={{ color: "white" }}>
            &nbsp;{" "}
            {data.spatial.speed != undefined
              ? data.spatial.speed.toFixed(1) + " km/h"
              : ""}
          </td>
        </tr>

        <tr>
          <td style={{ color: "gray" }}>Type:</td>
          <td style={{ color: data.is_offline ? "#B200FF" : "orange" }}>
            &nbsp; {data.is_offline ? "OFFLINE" : "ONLINE"}
          </td>
        </tr>
      </table>
    </div>
  );
};

export const radioTemplate = (data) => {
  return (
    <div style={{ padding: 10 }}>
      <table>
        <tr>
          <td style={{ color: "gray" }}>CallSign:</td>
          <td>&nbsp;{data.user_label}</td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Agensi:</td>
          <td>&nbsp;{data.organization_name.toUpperCase()}</td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Type:</td>
          <td style={{ color: "orange" }}>&nbsp;{"RESPONDER"}</td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Status:</td>
          <td style={{ color: "lime" }}>&nbsp; AKTIF</td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Lat:</td>
          <td>
            &nbsp;
            {Decimal2DMS(data.spatial.geometry.coordinates[1], "latitude")}
          </td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Long:</td>
          <td>
            &nbsp;
            {Decimal2DMS(data.spatial.geometry.coordinates[0], "longitude")}
          </td>
        </tr>
      </table>
    </div>
  );
};

export const cameraTemplate = (data) => {
  return (
    <div style={{ padding: 10 }}>
      <table>
        <tr>
          <td style={{ color: "gray" }}>Id:</td>
          <td>&nbsp;CAM-01</td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Type:</td>
          <td style={{ color: "orange" }}>&nbsp;{"PTZ"}</td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Lat:</td>
          <td>&nbsp;{Decimal2DMS(3.199741290938884, "latitude")}</td>
          {/* <td>&nbsp;2.766594</td> */}
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Long:</td>
          <td>&nbsp;{Decimal2DMS(101.74582139727264, "longitude")}</td>
          {/* <td>&nbsp;102.7675796</td> */}
        </tr>
      </table>

      <br />
      <hr style={{ color: "gray", opacity: 0.2 }} />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <p
          onClick={(e) => {}}
          title={"CameraStream:" + data.blue_track_id + "," + data.user_label}
          style={{
            marginLeft: 5,
            backgroundColor: "#027DE9",
            color: "white",
            width: 150,
            height: 25,
            cursor: "pointer",
            borderRadius: 5,
            padding: 5,
            textAlign: "center",
          }}
        >
          VIDEO STREAMING
        </p>
      </div>
    </div>
  );
};

export const uavTemplate = (data) => {
  return (
    <div style={{ padding: 10 }}>
      <table>
        <tr>
          <td style={{ color: "gray" }}>Id:</td>
          <td>&nbsp;{data.user_label}</td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Type:</td>
          <td style={{ color: "orange" }}>&nbsp;{"UAV"}</td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Lat:</td>
          <td>
            &nbsp;
            {Decimal2DMS(data.spatial.geometry.coordinates[1], "latitude")}
          </td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Long:</td>
          <td>
            &nbsp;
            {Decimal2DMS(data.spatial.geometry.coordinates[0], "longitude")}
          </td>
        </tr>
      </table>

      <br />
      <hr style={{ color: "gray", opacity: 0.2 }} />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <p
          onClick={(e) => {}}
          title={"MarkerTrail:" + data.blue_track_id + "," + data.user_label}
          style={{
            marginLeft: 5,
            backgroundColor: "#027DE9",
            color: "white",
            width: 100,
            height: 25,
            cursor: "pointer",
            borderRadius: 5,
            padding: 5,
            textAlign: "center",
          }}
        >
          TRAIL
        </p>
        <p
          onClick={(e) => {}}
          // title={"CameraStream:" + data.blue_track_id + "," + data.user_label}
          title={"UAVStream:" + data.blue_track_id + "," + data.user_label}
          style={{
            marginLeft: 5,
            backgroundColor: "#027DE9",
            color: "white",
            width: 150,
            height: 25,
            cursor: "pointer",
            borderRadius: 5,
            padding: 5,
            textAlign: "center",
          }}
        >
          VIDEO STREAMING
        </p>
      </div>
    </div>
  );
};

export const stationTemplate = (data) => {
  return (
    <div style={{ padding: 10 }}>
      <table>
        <tr>
          <td style={{ color: "gray" }}>Name:</td>
          <td>&nbsp;{data.user_label}</td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Location:</td>
          <td style={{ color: "orange" }}>&nbsp;{"TRACK"}</td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Lat:</td>
          <td>
            &nbsp;
            {Decimal2DMS(data.spatial.geometry.coordinates[1], "latitude")}
          </td>
        </tr>
        <tr>
          <td style={{ color: "gray" }}>Long:</td>
          <td>
            &nbsp;
            {Decimal2DMS(data.spatial.geometry.coordinates[0], "longitude")}
          </td>
        </tr>
      </table>
    </div>
  );
};
