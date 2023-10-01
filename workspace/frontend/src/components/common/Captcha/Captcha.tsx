import React, { Component } from "react";
import './Captcha.scss';
import { TextField } from '@mui/material';
import BackNavBar from 'components/common/BackNavBar/BackNavBar';

import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha
} from "react-simple-captcha";

class CaptchaTest extends Component<{setPassCaptcha: (value: boolean) => void}> {

  componentDidMount() {
    loadCaptchaEnginge(6, 'black', 'white');
  }

  doSubmit = () => {
    let user_captcha_input = document.getElementById("user_captcha_input") as HTMLInputElement;
    let user_captcha = user_captcha_input.value;

    if (validateCaptcha(user_captcha) == true) {
      loadCaptchaEnginge(6, 'black', 'white');
      user_captcha_input.value = "";
      this.props.setPassCaptcha(true)
    } else {
      alert("다시 입력해 주세요");
      user_captcha_input.value = "";
      this.props.setPassCaptcha(false)
    }
    
  };

  render() {
    return (
      <div>
        <BackNavBar title="" />
        <div className="captcha-container">
          <div className="form-group">
            <LoadCanvasTemplate reloadText="새로고침"/>
            <div className="captcha-input">
              <div>
                <TextField id="user_captcha_input" />
              </div>
              <div className="captcha-input-button">
                <button
                  onClick={() => this.doSubmit()}
                >
                  <h3>입력</h3>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CaptchaTest;
