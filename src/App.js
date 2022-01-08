import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

// const HatsPage = () => (
//   <div>
//     <h1>HATS PAGE</h1>
//   </div>
// );

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    // 進來網站啟動firebase訂閱auth的功能 隨時監聽是否是登入狀態
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // 登入後 把會員資料寫進 firestore裏面(要是firestore沒有的話)
        const userRef = await createUserProfileDocument(userAuth);

        // 即時監聽變化並讀取 onSnapshot
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      // 為了登出狀態
      // 要是有登入這邊會比上面的await更先執行 要是userAuth不存在 則設定null 存在的話 這裡會設定userAuth一大包object
      // 但最後會設定onSnapshot裡面的
      setCurrentUser(userAuth);
    });
  }

  // 離開網站 要取消訂閱firebase的auth功能
  componentWillUnmount() {
    this.unsubscribeFromAuth();
    // 參考資料
    // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#onAuthStateChanged
    // https://stackoverflow.com/questions/42762443/how-can-i-unsubscribe-to-onauthstatechanged
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signIn"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />

          {/* <Route path="/hats" component={HatsPage} /> */}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
