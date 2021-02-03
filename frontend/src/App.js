import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,  Bounce } from 'react-toastify';

import AuthPage from './pages/authpage.component';
import PostsPage from './pages/postspage.component';
import EditPostPage from './pages/editpostpage.component';
import Header from './components/header.component';
import Spinner from './components/spinner/spinner.component';
import { logoutUser } from './redux/actions/authActionCreators';

const App = ({ user, dispatchLogoutAction }) => {
  return (
    <React.Fragment>
      <ToastContainer position="top-center" autoClose={2000}
        hideProgressBar transition={Bounce} />
      <Spinner />
      <Header isLoggedIn={user.isLoggedIn} userName={user.fullName}
        onLogout={dispatchLogoutAction} />
      <div className="container my-5">
        {!user.isLoggedIn ?
          (<Switch>
            <Route exact path="/auth" component={AuthPage} />
            <Redirect to="/auth" />
          </Switch>) :
          (<Switch>
            <Route exact path="/posts" component={PostsPage} />
            <Route exact path="/edit-post" component={EditPostPage} />
            <Route exact path="/edit-post/:postId" component={EditPostPage} />
            <Redirect to="/posts" />
          </Switch>)
        }
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
  dispatchLogoutAction: () => dispatch(logoutUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
