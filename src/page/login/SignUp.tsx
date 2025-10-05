import { Button, Form, Input } from "antd";
import { postSignUp, supabase } from "./loginApi";

const SignUp = () => {
  const onFinish = async (values: any) => {
    const { email, password } = values;
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(`❌ 오류: ${error.message}`);
    } else {
      alert("✅ 회원가입 성공! 이메일 인증을 완료해주세요.");
    }
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
          name="email"
          label="이메일"
          rules={[
            {
              type: "email",
              message: "이메일 양식에 맞게 작성해주세요",
            },
            {
              required: true,
              message: "이메일을 입력해주세요",
            },
          ]}
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
        <Form.Item
          name="confirm"
          label="비밀번호 확인"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "비밀번호 확인을 입력해주세요",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("비밀번호와 일치하지 않습니다"),
                );
              },
            }),
          ]}
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
