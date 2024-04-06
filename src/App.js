import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Polls from "./components/Polls";
import New from "./components/New";
import Leader from "./components/Leader";
import { initData } from "./store/actions/shared";
import { connect } from "react-redux";
import NotFound from "./components/NotFound";
import ShowQuestion from "./components/ShowQuestion";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";

const App = ({ initData }) => {
  useEffect(() => {
    initData();
  }, [initData]);

  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Polls} />
        <ProtectedRoute path="/add" component={New} />
        <ProtectedRoute path="/leaderboard" component={Leader} />
        <ProtectedRoute
          path="/questions/:question_id"
          component={ShowQuestion}
        />
        <ProtectedRoute component={NotFound} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authUser: state.authUser && state.authUser.user,
});

export default connect(mapStateToProps, { initData })(App);
