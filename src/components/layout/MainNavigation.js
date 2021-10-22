import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import classes from "./MainNavigation.module.css";


function MainNavigaton() {
  const history = useHistory();

  function clickHandler() {
    history.replace("/");
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo} onClick={clickHandler}>
        Visualising MST algorithms
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/algorithms">Algorithms</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigaton;
