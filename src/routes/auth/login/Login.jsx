import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Typography,
  notification,
} from "antd";
import { Link } from "react-router-dom";
const { Title, Text } = Typography;
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const errorNotification = (message) => {
    api.error({
      message: "Error",
      description: message,
      showProgress: true,
      pauseOnHover: true,
      placement: "bottomRight",
    });
  };

  const successNotification = () => {
    api.success({
      message: "Success",
      description: "Logged in successfully",
      showProgress: true,
      pauseOnHover: true,
      placement: "bottomRight",
    });
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://dummyjson.com/auth/login",
        values
      );
      dispatch({ type: "LOGIN", payload: data });
      successNotification();
    } catch (error) {
      console.error(error);
      errorNotification(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        name="basic"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Title className="text-center">Login</Title>
        <Form.Item
          label="Username"
          name="username"
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
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item
          className="w-full"
          wrapperCol={{
            span: 24,
          }}
        >
          <Button
            className="w-full"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Login
          </Button>
        </Form.Item>
        <Divider>
          {" "}
          <span className="text-gray-500">Or</span>
        </Divider>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        />
        <Text className="mt-[20px] block text-center">
          {" "}
          Don't have an account? <Link to={"/auth/register"}>Register</Link>
        </Text>
      </Form>
    </>
  );
};

export default Login;
