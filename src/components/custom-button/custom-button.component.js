// import './custom-button.styles.scss';

import { CustomButtonContainer } from './custom-button.styles';

const CustomButton = ({
  children,
  ...props
  // isGoogleSignIn,
  // inverted,
  // ...otherProps
}) => (
  // <button
  //   className={`${inverted ? 'inverted' : ''} ${
  //     isGoogleSignIn ? 'google-sign-in' : ''
  //   } custom-button`}
  //   {...otherProps}
  // >
  //   {children}
  // </button>
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;
