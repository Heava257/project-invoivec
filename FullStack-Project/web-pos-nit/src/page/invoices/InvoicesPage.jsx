import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { request } from "../../util/helper";
// import axios from "axios";

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  useEffect(() => {
    getlist();
  }, []);

  const getlist = async () => {
    setLoading(true);
    // var param = {
    //   txtSearch: state.txtSearch,
    // };
    const res = await request("invoices", "get");
    setLoading(false);
    if (res) {
      setList(res.list);
    }
  };

  const handleAddInvoice = async (values) => {
    try {
      await request("invoices","post", { ...values, items: [] });
      message.success("Invoice added!");
      getlist();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to add invoice");
    }
  };

  const handleDeleteInvoice = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/invoices/${id}`);
      message.success("Invoice deleted!");
      getlist();
    } catch (error) {
      message.error("Failed to delete invoice");
    }
  };

//   const columns = [
//     { title: "Invoice Number", dataIndex: "invoice_number", key: "invoice_number" },
//     { title: "Buyer", dataIndex: "buyer_name", key: "buyer_name" },
//     { title: "Total Amount ($)", dataIndex: "total_amount", key: "total_amount" },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <Button danger onClick={() => handleDeleteInvoice(record.id)}>Delete</Button>
//       ),
//     },
//   ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Invoice Management</h2>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>New Invoice</Button>
      <Table dataSource={list} columns={[
        {
            key: "no",
            title: "No",
            dataIndex:"invoice_number",
            // render: (item, data, index) => index + 1,
          }, 
          {
            key: "invoice_date",
            title: "invoice_date",
            dataIndex:"invoice_date",
            // render: (item, data, index) => index + 1,
          },



      ]} loading={loading} rowKey="id" style={{ marginTop: 20 }} 
    
      
      />

      <Modal title="Create Invoice" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleAddInvoice}>
          <Form.Item name="invoice_number" label="Invoice Number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="buyer_name" label="Buyer Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="total_amount" label="Total Amount ($)" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Button type="primary" htmlType="submit">Save</Button>
        </Form>
      </Modal>
     
    </div>
  );
};

export default InvoicesPage;
