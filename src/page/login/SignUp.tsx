import { Button, Form, Input } from "antd";
import { postSignUp } from "./loginApi";

const SignUp = () => {
  const onFinish = async (values: any) => {
    const result = await postSignUp(values);
    const dataMap = result.dataMap;
    if (result.message === "OK") {
      alert("회원가입 성공!!!!");
    }
    console.log("result", result);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size="large"
      >
        <Form.Item
          label="ID"
          name="user_id"
          rules={[{ required: true, message: "아이디를 입력해주세요" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="PW"
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <div className="flex items-center gap-2">
            <Button type="primary" htmlType="submit" block>
              회원가입
            </Button>
            <Button type="default" htmlType="reset" block>
              초기화
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
