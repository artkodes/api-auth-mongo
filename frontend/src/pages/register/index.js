import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";

import axios from "axios";

import "./register.scss";
import Results from "../../components/Results";
function Index(props) {
  const { getFieldDecorator } = props.form;
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [user, setUser] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        axios
          .post("/sign-up", values)
          .then(res => {
            console.log("res", res);
            if (res.data.error != undefined) {
              message.warning(res.data.error.message);
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

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty({ confirmDirty: confirmDirty || !!value });
    console.log(confirmDirty);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  const form = () => {
    return (
      <Form {...formItemLayout} className="login-form" onSubmit={handleSubmit}>
        <Form.Item label="Firstname" className="form__item">
          {getFieldDecorator("firstname", {
            rules: [
              {
                required: true,
                message: "Please input your firstname!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Lastname" className="form__item">
          {getFieldDecorator("lastname", {
            rules: [
              {
                required: true,
                message: "Please input your lastname!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="E-mail" className="form__item">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback className="form__item">
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: validateToNextPassword
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback className="form__item">
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={handleConfirmBlur} />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            className="login-form-button"
            type="primary"
            htmlType="submit"
          >
            Register
          </Button>
          Or <Link to="/">login!</Link>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div className="register__container">
      {isSuccess ? <Results user={user} /> : form()}
    </div>
  );
}
const WrappedRegistrationForm = Form.create({ name: "register" })(Index);

export default WrappedRegistrationForm;
