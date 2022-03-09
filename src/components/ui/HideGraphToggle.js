import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";

function HideGraphToggle(props) {
  if (props.backgroundOn) {
    return (
      <ToggleOffOutlinedIcon
        sx={{ "&:hover": { cursor: "pointer" }, fontSize: 60 }}
        onClick={props.toggleHandler}
      />
    );
  } else {
    return (
      <ToggleOnOutlinedIcon
        sx={{ "&:hover": { cursor: "pointer" }, fontSize: 60 }}
        onClick={props.toggleHandler}
        color="success"
      />
    );
  }
}

export default HideGraphToggle;
