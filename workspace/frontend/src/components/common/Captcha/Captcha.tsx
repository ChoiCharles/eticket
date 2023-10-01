import React, { Component } from "react";
import './Captcha.scss';
import { Button, TextField } from '@mui/material';

import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha
} from "react-simple-captcha";

class CaptchaTest extends Component {
  componentDidMount() {
    loadCaptchaEnginge(6);
  }

  doSubmit = () => {
    let user_captcha_input = document.getElementById("user_captcha_input") as HTMLInputElement;
    let user_captcha = user_captcha_input.value;

    if (validateCaptcha(user_captcha) == true) {
      alert("Captcha Matched");
      loadCaptchaEnginge(6);
      user_captcha_input.value = "";
    } else {
      alert("Captcha Does Not Match");
      user_captcha_input.value = "";
    }
    
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="form-group">
            <div className="col mt-3">
              <LoadCanvasTemplate className="captcha-templa"/>
            </div>

            <div className="col mt-3">
              <div>
                <TextField fullWidth id="user_captcha_input" />
              </div>
            </div>

            <div className="col mt-3">
              <div>
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => this.doSubmit()}
                  style={{ background: '#80C0C0', color: 'white' }}
                >
                  입력
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CaptchaTest;
