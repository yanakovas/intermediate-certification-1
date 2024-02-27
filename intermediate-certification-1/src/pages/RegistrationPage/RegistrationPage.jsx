import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import s from './registration_page.module.css';
import { ApiRoute } from '../../consts';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
export const RegistrationPage = () => {
  const [form] = Form.useForm();
  const [message, setMessage] = useState('');
  const [isResultSuccess, setIsResultSuccess] = useState();
  const onFinish = (values) => {
    fetch(`http://localhost:9500${ApiRoute.Registration}`, {
      method: 'POST',
      body: JSON.stringify({ values }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        setMessage(data.message);
        setIsResultSuccess(data.success);
      })
      .catch(function (error) {
        console.warn('Something went wrong.', error);
      });
  };

  const messageClass = isResultSuccess ? s.success : s.error;

  return (
    <div className={s.registration}>
      <h2 style={{ margin: 0 }}>Регистрация</h2>
      <div className={`${s.message} ${messageClass}`}>{message}</div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{
          maxWidth: 500,
          width: '100%',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="login"
          label="Login"
          rules={[
            {
              required: true,
              message: 'Please input your login!',
            },
            {
              validator: (_, value) => {
                if (value === '') {
                  return Promise.reject();
                } else if (/^[a-zA-Z0-9]+$/.test(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    'Login should include numbers and latin letters only'
                  );
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              validator: (_, value) => {
                if (value === '') {
                  return Promise.reject();
                } else if (/^[a-z]+$/.test(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    'Password should include low latin letters only'
                  );
                }
              },
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
