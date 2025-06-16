"use client";

import React from "react";
import { Button, Form, Input, Divider, notification } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { LoginFormValues } from "@/types/form.type";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

const Login = () => {
  const [api, contextHolder] = notification.useNotification();
  const onFinish = (values: LoginFormValues) => {
    const res = signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/dashboard",
    });

    res.then((res) => {
      console.log(res?.error);

      if (res?.error === null) {
        redirect("/dashboard");
      } else {
        api.error({
          message: "Đăng nhập thất bại",
          description: res?.error,
          placement: "topRight",
        });
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {contextHolder}
        <h2 className="text-2xl font-semibold text-center text-blue-600">Đăng nhập</h2>
        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ!" }]}
          >
            <Input placeholder="Nhập email của bạn" />
          </Form.Item>

          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
            <Input.Password placeholder="Nhập mật khẩu của bạn" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <Divider>Hoặc</Divider>

        <Button
          type="default"
          icon={<GoogleOutlined />}
          block
          className="flex items-center justify-center"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          <span>Đăng nhập với Google</span>
        </Button>
      </div>
    </div>
  );
};

export default Login;
