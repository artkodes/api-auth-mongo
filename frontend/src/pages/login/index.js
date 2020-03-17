import React, { useState } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Form, Icon, Input, Button, message } from "antd";
import "./login.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import Results from "../../components/Results";

function Index(props) {
  const [isSuccess, setSuccess] = useState(false);
  const [user, setUser] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        axios
          .post("/login", { email: values.email, password: values.password })
          .then(res => {
            console.log("res", res);
            console.log(res.data.message == undefined);
            if (res.data.message != undefined) {
              message.warning("le mot de passe ou l'email est incorrect");
            } else {
              var msg = "welcome " + res.data.user.firstname;
              setUser(res.data.user);
              setSuccess(true);
              message.success(msg);
            }
          })
          .catch(error => {
            console.log("err", error);
          });
      }
    });
  };

  const { getFieldDecorator } = props.form;

  const form = () => {
    return (
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item className="form__item">
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="email"
            />
          )}
        </Form.Item>
        <Form.Item className="form__item">
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item className="form__item">
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div className="login__container">
      {isSuccess ? <Results user={user} /> : form()}
    </div>
  );
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Index);

export default WrappedNormalLoginForm;
