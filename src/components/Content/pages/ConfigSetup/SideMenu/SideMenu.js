import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";

// icons
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SettingsIcon from "@material-ui/icons/Settings";
import VpnLockIcon from "@material-ui/icons/VpnLock";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import WebIcon from "@material-ui/icons/Web";
import PersonalVideoIcon from "@material-ui/icons/PersonalVideo";
import AssessmentIcon from "@material-ui/icons/Assessment";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InfoIcon from "@material-ui/icons/Info";
import CallToActionIcon from "@material-ui/icons/CallToAction";
import DnsIcon from "@material-ui/icons/Dns";

var accordianId = 0;

const handleChange = (props, index) => {
  accordianId = index;
  // alert("handleChange" + accordianId);
  props.setAccIndex(index);
  props.init();
};

const MenuItem = (props) => {
  accordianId = props.setIndex;

  // alert("MenuItem" + accordianId);
  return (
    <Accordion
      onChange={() => handleChange(props, props.id)}
      expanded={props.id === accordianId ? true : false}
      style={{
        backgroundColor: "rgba(0,0,0,0)",
        margin: 0,
        padding: 0,
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            style={{
              marginTop: 0,
              color: props.id === accordianId ? props.color : "white",
            }}
          />
        }
      >
        <span
          style={{
            marginRight: 10,
            color: props.id === accordianId ? props.color : "white",
          }}
        >
          {props.icon}
        </span>
        <Typography
          style={{
            fontSize: 14,
            color: props.id === accordianId ? props.color : "white",
          }}
        >
          {props.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails style={{ margin: 0, padding: 0, margintop: -10 }}>
        {props.content}
      </AccordionDetails>
    </Accordion>
  );
};

export default function SideMenu(props) {
  const [selected, setSelected] = React.useState(0);
  const [accIndex, setAccIndex] = React.useState(0);

  React.useEffect(() => {
    setAccIndex(props.setIndex);
  }, [props.setIndex]);

  const handleSelection = (index) => {
    props.handleSelection(index);
    setSelected(index);
  };

  const init = () => {
    setSelected(0);
  };

  const SubMenuItem = (props) => (
    <div>
      <List style={{ margin: 0, padding: 0, width: 250 }}>
        <ListItem
          onClick={() => handleSelection(props.id)}
          button
          style={{ margin: 0, padding: 0 }}
        >
          <ListItemText
            primary={
              <p
                style={{
                  fontSize: 14,
                  margin: 0,
                  padding: 0,
                  color: props.id === selected ? props.color : "white",
                }}
              >
                {props.label}
              </p>
            }
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              style={{ color: props.id === selected ? props.color : "white" }}
            >
              {props.icon}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          color: "gray",
          padding: 20,
          width: 400,
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.1) 50%)",
          boxShadow: "0px 0px 30px -20px #000 inset, 0px 0px",
        }}
      >
        <p
          style={{
            margin: 0,
            padding: 0,
            color: "yellow",
            fontSize: 18,
            fontWeight: 400,
          }}
        >
          <span>
            <span style={{ color: "gray" }}></span>
            SETTINGS
          </span>
        </p>
      </div>

      <div style={{ overflow: "auto", height: window.innerHeight - 200 }}>
        <MenuItem
          id={1}
          title={"STATUS"}
          icon={<DashboardIcon />}
          setAccIndex={setAccIndex}
          init={init}
          setIndex={accIndex}
          color={props.color}
          content={
            <div style={{ marginLeft: 50, fontSize: 14 }}>
              <SubMenuItem
                color={props.color}
                id={1}
                label={"Dashboard"}
                icon={<WebIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={2}
                label={"License"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={3}
                label={"Password"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={4}
                label={"Logout"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <br />
            </div>
          }
        />
        <MenuItem
          id={2}
          title={"REPORTING"}
          setAccIndex={setAccIndex}
          init={init}
          setIndex={accIndex}
          icon={<AssessmentIcon />}
          color={props.color}
          content={
            <div style={{ marginLeft: 50, fontSize: 14 }}>
              <SubMenuItem
                color={props.color}
                id={2}
                label={"Health"}
                icon={<CallToActionIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={3}
                label={"Insight"}
                icon={<CallToActionIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={10}
                label={"NetFlow"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={6}
                label={"Settings"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={4}
                label={"Traffic"}
                icon={<CallToActionIcon style={{ height: 15 }} />}
              />
              <br />
            </div>
          }
        />
        <MenuItem
          id={3}
          title={"SYSTEM"}
          setAccIndex={setAccIndex}
          init={init}
          setIndex={accIndex}
          icon={<PersonalVideoIcon />}
          color={props.color}
          content={
            <div style={{ marginLeft: 50, fontSize: 14 }}>
              <SubMenuItem
                color={props.color}
                id={5}
                label={"Access"}
                icon={<WebIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={11}
                label={"Configuration"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={12}
                label={"Gateways"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={13}
                label={"High Availability"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={14}
                label={"Routers"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={15}
                label={"Settings"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={16}
                label={"Trust"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={17}
                label={"Wizard"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={18}
                label={"Log Files"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={6}
                label={"Dianogstics"}
                icon={<WebIcon style={{ height: 15 }} />}
              />
              <br />
            </div>
          }
        />
        <MenuItem
          id={4}
          title={"INTERFACE"}
          setAccIndex={setAccIndex}
          init={init}
          setIndex={accIndex}
          icon={<WebIcon />}
          color={props.color}
          content={
            <div style={{ marginLeft: 50, fontSize: 14 }}>
              <SubMenuItem
                color={props.color}
                id={20}
                label={"[LAN]"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={21}
                label={"[WAN1]"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={8}
                label={"Assignments"}
                icon={<WebIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={23}
                label={"Overview"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={24}
                label={"Settings"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={25}
                label={"Wireless"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={26}
                label={"Pont-To-Point"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={27}
                label={"Other Types"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={28}
                label={"Dianogstics"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <br />
            </div>
          }
        />
        <MenuItem
          id={5}
          title={"FIREWALL"}
          setAccIndex={setAccIndex}
          init={init}
          setIndex={accIndex}
          icon={<WhatshotIcon />}
          color={props.color}
          content={
            <div style={{ marginLeft: 50, fontSize: 14 }}>
              <SubMenuItem
                color={props.color}
                id={29}
                label={"Shaper"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={30}
                label={"Aliases"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={9}
                label={"Rules"}
                icon={<WebIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={32}
                label={"NAT"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={33}
                label={"Groups"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={34}
                label={"Virtual IP's"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={35}
                label={"Settings"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={36}
                label={"Log Files"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={37}
                label={"Dianogstics"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <br />
            </div>
          }
        />
        <MenuItem
          id={6}
          title={"VPN"}
          setAccIndex={setAccIndex}
          init={init}
          setIndex={accIndex}
          VpnLockIcon
          icon={<VpnLockIcon />}
          color={props.color}
          content={
            <div style={{ marginLeft: 50, fontSize: 14 }}>
              <SubMenuItem
                color={props.color}
                id={38}
                label={"IPsec"}
                icon={<DnsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={10}
                label={"OpenVPN"}
                icon={<WebIcon style={{ height: 15 }} />}
              />
              <br />
            </div>
          }
        />
        <MenuItem
          id={7}
          title={"SERVICES"}
          setAccIndex={setAccIndex}
          init={init}
          setIndex={accIndex}
          icon={<SettingsIcon />}
          color={props.color}
          content={
            <div style={{ marginLeft: 50, fontSize: 14 }}>
              <SubMenuItem
                color={props.color}
                id={40}
                label={"Access"}
                icon={<SettingsIcon style={{ height: 15 }} />}
              />
              <SubMenuItem
                color={props.color}
                id={41}
                label={"Configuration"}
                icon={<SettingsIcon style={{ height: 15 }} />}
              />
              <br />
            </div>
          }
        />
      </div>
    </div>
  );
}
