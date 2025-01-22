// import React from "react";
// import { Image } from "antd";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";

// const Landing = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="w-screen h-screen flex flex-row items-center justify-around text-center text-8xl text-color-950 bg-color-50 p-10">
//       <p className="leading-none">INI CERITANYA LANDING PAGE</p>
//       <Image
//         src="https://i.pinimg.com/originals/70/07/8c/70078c68ec943a2a618394b8d4147094.jpg"
//         alt="join sirkel kami"
//         preview={false}
//         className="mr-2"
//       />
//       <Button
//         onClick={() => {
//           navigate("/auth/login");
//         }}
//       >
//         Login boss
//       </Button>
//       <Button
//         onClick={() => {
//           navigate("/auth/registration");
//         }}
//       >
//         Registrasi boss
//       </Button>
//     </div>
//   );
// };

// export default Landing;

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Carousel,
  Col,
  FloatButton,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  Tabs,
  Typography,
} from "antd";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Header, Footer, Content } = Layout;

const Landing = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // State for showing modal
  const navigate = useNavigate();

  // Handle the button click to navigate to login page
  const handleMainClick = () => {
    navigate("/auth/login", { replace: true });
  };

  // Show the Contact Us modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle form submission
  const handleFormSubmit = (values) => {
    console.log("Form values:", values);
    // You can send the form data to an API or handle it here
    setIsModalVisible(false); // Close modal after submission
  };

  // Handle cancel action of the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout className="text-white min-h-screen">
      <Header className="flex justify-between items-center py-4 px-4 bg-color-500">
        <div className="flex items-center space-x-4">
          <div className="flex aspect-square items-center justify-center rounded-lg">
            <img
              src={`/LogoDesignVisioWhite.svg`}
              alt="Design Visio Logo"
              className="w-10 h-10 ml-[0.1rem]"
            />
          </div>
          <span className="text-3xl font-bold text-white">DesignVisio</span>
        </div>
        <Button
          type="default"
          // className=" bg-color-500 hover:bg-color-600 text-white"
          className="bg-color-50 border-color-200 hover:bg-color-50 text-color-950"
          onClick={showModal} // Show the modal on button click
        >
          Contact Us
        </Button>
      </Header>

      <Content className="bg-color-50 flex flex-col justify-center items-center px-4 gap-10 bg-[url('https://img.pikbest.com/origin/09/17/44/52KpIkbEsTRs9.jpg!w700wp')] bg-cover">
        <Card className="flex flex-col justify-center items-center gap-6 p-20 bg-opacity-65">
          <div className="flex flex-col items-center gap-5">
            <div className="text-5xl font-bold text-color-950">
              Design Your Dream Space
            </div>
            <div className="text-2xl text-color-800">
              Explore inspiration and bring your dream space to life
              effortlessly!
            </div>
          </div>

          <div className="">
            <Button
              onClick={handleMainClick}
              className="bg-color-500 hover:bg-color-600 text-white text-xl h-15 w-44 rounded-xl"
            >
              Get Started
            </Button>
          </div>
        </Card>
      </Content>

      <Footer className="bg-color-500 text-center p-4 text-white">
        Copyright © 2025 DesignVisio.com - Powered by Domain Expansion
      </Footer>

      {/* Floating Action Buttons for Social Media */}
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{
          color: "#b17d41",
          position: "fixed",
          bottom: 24,
          right: 24,
        }}
        icon={<InstagramOutlined />}
      >
        <FloatButton
          icon={<InstagramOutlined />}
          onClick={() => window.open("https://www.instagram.com", "_blank")}
        />
        <FloatButton
          icon={<TwitterOutlined />}
          onClick={() => window.open("https://www.twitter.com", "_blank")}
        />
        <FloatButton
          icon={<FacebookOutlined />}
          onClick={() => window.open("https://www.facebook.com", "_blank")}
        />
      </FloatButton.Group>

      {/* Modal for Contact Us Form */}
      <Modal
        title="Contact Us"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="contact-modal"
        destroyOnClose
      >
        <Form layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Please enter your message!" }]}
          >
            <Input.TextArea placeholder="Enter your message" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#FFF0DC",
                color: "#000000",
                width: "100%",
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Landing;
