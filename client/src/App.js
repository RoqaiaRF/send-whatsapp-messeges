import React, { useState } from "react";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.min.css';
import './App.css';
import { Layout, message, Modal, Spin } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const { Header, Content } = Layout;

var QRCode = require("qrcode.react");
const App = () => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [msg, setMessage] = useState("");
  const [qrcode, setQRCode] = useState(false);
  const [collapsed, setcollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const toggle = () => {
    setcollapsed(!collapsed)
  }
  const getQRCode = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api", { phone, msg });
      if (res.data) {
        showModal();
        setQRCode(res.data);
      }      
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('حدث خطأ غير متوقع')
    }
  };    


  return (
    <Layout>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
            
        <QRCode value={qrcode} />
            
          <Spin tip="ادخل الرمز من داخل الواتساب في اعلى الشاشه ..." size="middle" spinning={loading}>
            <div className="whats-app-conent bg-white p-5">
            <div className="whts-app-header">
              <h3 className="title">
                برنامج ارسال للواتسآب
              </h3>
            </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">رقم الهاتف</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="رقم الهاتف" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">نص الرسالة: </label>
                <textarea className="form-control" id="exampleFormControlTextarea1" value={msg} onChange={(e) => setMessage(e.target.value)} rows="3"></textarea>
              </div>
              <div className="my-1">
                <button className="btn btn-primary" onClick={getQRCode} >Get QRCode</button>
              </div>
            </div>
          </Spin>
        </Content>
      </Layout>
    </Layout>

  );
};

export default App;
