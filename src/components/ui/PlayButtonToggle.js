import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";

function PlayButtonToggle(props) {

  function clickHandler() {
    props.onClick();
  }
  
  if (props.paused) {
    return (
      <PlayArrowIcon
        sx={{ "&:hover": { cursor: "pointer" }, fontSize: 60 }}
        onClick={clickHandler}
      />
    );
  } else {
    return (
      <PauseOutlinedIcon
        sx={{ "&:hover": { cursor: "pointer" }, fontSize: 60 }}
        onClick={clickHandler}
      />
    );
  }
}

export default PlayButtonToggle;
