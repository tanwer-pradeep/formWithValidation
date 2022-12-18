import React, { useState } from "react";

// const {  Button, Form, Input, InputNumber  } = antd;
import { Button, Form, Input, message } from "antd";
import {
  detailValidationApi,
  userLoginApi,
  userRegistrationApi
} from "./util/axios";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [isRegistering, setIsRegistering] = useState(true);

  const switching = () => {
    setIsRegistering(!isRegistering);
  };

  const onFinish = async (values) => {
    const responseFormMail = await detailValidationApi(
      "email",
      `emailId=${values.email}`
    );
    if (responseFormMail?.status === 200 && responseFormMail?.data.failed) {
      message.warning(responseFormMail?.data.message);
      return;
    }
    const responseForPhone = await detailValidationApi(
      "phone",
      `contactNo=${values.phoneNumber}`
    );
    if (responseForPhone?.status === 200 && responseForPhone?.data.failed) {
      message.warning(responseForPhone?.data.message);
      return;
    }

    const registrationResponse = await userRegistrationApi(values);
    if (
      registrationResponse.status === 200 &&
      registrationResponse?.data?.message
    ) {
      message.success(registrationResponse?.data.message);
      form.resetFields();
      return;
    } else if (
      registrationResponse.status === 400 &&
      registrationResponse?.data?.Message
    ) {
      message.error(registrationResponse?.data.Message);
      return;
    }
  };

  const checkEmail = async (event) => {
    const emailToCheck = event.target.value;

    const response = await detailValidationApi(
      "email",
      `emailId=${emailToCheck}`
    );
    if (response?.status === 200 && response?.data.failed) {
      message.warning(response?.data.message);
    }
  };

  const checkContactNumber = async (event) => {
    const phoneToCheck = event.target.value;
    const response = await detailValidationApi(
      "phone",
      `contactNo=${phoneToCheck}`
    );
    if (response?.status === 200 && response?.data.failed) {
      message.warning(response?.data.message);
    }
  };

  const onUserLoginFinish = async (details) => {
    const response = await userLoginApi(details);
    if (response?.data?.data && response.data.message) {
      message.success(response.data.message);
      window.localStorage.setItem("isUserAuthenticated", true)
      setTimeout(() => window.location.pathname = '/listing', 500)
    } else message.error(response?.data.message);
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
  };

  if (isRegistering) {
    return (
      <Form
        form={form}
        {...layout}
        name="registration-form"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={"firstName"}
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"lastName"}
          label="Last Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"email"}
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input onBlur={checkEmail} />
        </Form.Item>

        <Form.Item
          name={"phoneNumber"}
          label="Phone Number"
          rules={[
            {
              // type: "number",
              required: true,
            },
            () => ({
              validator(_, value) {
                if (!value || (value.length == 10 && value.match(/^[0-9]*$/))) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Please input a valid phone number!")
                );
              },
            }),
          ]}
        >
          <Input onBlur={checkContactNumber} />
        </Form.Item>
        <Form.Item
          name={"userName"}
          label="User Name"
          rules={[
            {
              required: true,
            },
            () => ({
              validator(_, value) {
                if (!value || (value.length >= 6 && !value.match(/\s/))) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "The username must contains 6 letter or more and no empty spaces are allowed!"
                  )
                );
              },
            }),
          ]}
        >
          <Input autoComplete="username" />
        </Form.Item>
        <Form.Item
          name={"password"}
          label="Password"
          hasFeedback
          rules={[
            {
              required: true,
            },
            () => ({
              validator(_, value) {
                const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
                if (!value || value.match(passRegex)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "The password must have one numeric digit, one uppercase and one lowercase letter, and atleast 6 letter long!"
                  )
                );
              },
            }),
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
        <Form.Item
          name={"confirmPassword"}
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
        <span>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 4,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 4,
            }}
          >
            <Button type="primary" onClick={switching}>
              Sign In
            </Button>
          </Form.Item>
        </span>
      </Form>
    );
  }
  return (
    <Form
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onUserLoginFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" onClick={switching}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
