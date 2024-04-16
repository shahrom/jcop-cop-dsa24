const childrenSideBySideStyle = {
  display: "flex",
  flexDirection: "row",
};

export const SmallPanelChart = (props) => (
  <div className={"small"} onClick={() => props.handleSlideIndex(props.index)}>
    <p style={{ fontSize: 14, marginTop: 0 }}>{props.label}</p>
    <div>{props.icon}</div>
  </div>
);

export const LongPanelButton = (props) => (
  <div>
    <div style={childrenSideBySideStyle}>
      <div className={"long"} onClick={() => props.handleSlideIndex(props.index)}>
        <div>{props.icon}</div>
      </div>
      <div style={{ fontFamily: "Poppins", width: 400 }}>
        <p style={{ fontSize: 16, color: "white" }}>{props.title}</p>
        <p style={{ fontSize: 14, color: "gray", marginTop: -10 }}>{props.label}</p>
      </div>
    </div>
  </div>
);

export const BigPanelChart = (props) => (
  <div className={"iso-medium"} onClick={() => props.handleSlideIndex(props.index)}>
    <p style={{ fontSize: 14, marginTop: 10, marginLeft: 10 }}>{props.label}</p>
    <div>{props.icon}</div>
  </div>
);
