import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("password don't match");
      return;
    }

    try {
      // 成功建立帳號後 會返回一個object 取用裡面的user
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      // 成功建立帳號會自動幫我們登入
      // 登入後 把會員資料寫進 firestore裏面(要是firestore沒有的話)
      // app.js的那個createUserProfileDocument會先被觸發 才觸發這個component
      // 這邊調用 createUserProfileDocument 是因為要把 displayName 存進去 所以無法共用app.js的那個createUserProfileDocument
      await createUserProfileDocument(user, { displayName });

      // 因為被導去別的頁面 所以就不用在setState了
      // this.setState({
      //   displayName: '',
      //   email: '',
      //   password: '',
      //   confirmPassword: '',
      // });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="displayName"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="email"
            required
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="password"
            required
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="confirmPassword"
            required
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
