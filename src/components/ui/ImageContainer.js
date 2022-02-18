import classes from "./ImageContainer.module.css";

function ImageContainer(props) {
  if (props.type === "acc") {
    return <img className={classes.accordion} src={props.src} alt={props.alt}></img>
  } else if (props.type === "home") {
    return <img className={classes.home} src={props.src} alt={props.alt}></img>
  } else if (props.type === "me") {
    return <img className={classes.me} src={props.src} alt={props.alt}></img>
  }
}

export default ImageContainer;
