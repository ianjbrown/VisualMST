import classes from "./Centered.module.css";
function Centered(props) {
    return <div className={classes.centered}>{props.children}</div>
}

export default Centered;