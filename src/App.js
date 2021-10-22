import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import AlgorithmsPage from "./pages/Algorithms";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/algorithms">
          <AlgorithmsPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
