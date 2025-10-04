import { Button, Checkbox, Form, Input, Space } from "antd";
import { PiPawPrintFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      className="bg-white border border-stone-200 
                    flex flex-col gap-2
                    px-12 py-2 rounded-md"
    >
      {/* 로고 */}
      <div className="flex justify-center items-center">
        <button
          type="button"
          title="NyangBook"
          className={`font-adlam px-1 py-6 flex items-center gap-3 text-orange-600 transition-all duration-300 `}
        >
          <PiPawPrintFill className="text-5xl" />
          <p
            className={`text-3xl  
              
              `}
          >
            NyangBook
          </p>
        </button>
      </div>
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
          name="id"
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

        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>로그인 유지하기</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Space>
            <Button type="primary" htmlType="submit">
              로그인
            </Button>
            <Button
              type="default"
              htmlType="button"
              onClick={() => {
                navigate("/sign_up");
              }}
            >
              회원가입
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Index;
