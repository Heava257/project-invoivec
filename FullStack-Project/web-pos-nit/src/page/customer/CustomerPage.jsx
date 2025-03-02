import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { request } from "../../util/helper";
import { MdDelete, MdEdit } from "react-icons/md";
import MainPage from "../../component/layout/MainPage";
import { getProfile } from "../../store/profile.store";
function CustomerPage() {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    visibleModal: false,
    id: null,
    txtSearch: "",
    user_id: null,
    isEditing: false,
  });
  useEffect(() => {
    const userId = getProfile();
    if (userId) {
      setState((prev) => ({ ...prev, user_id: userId }));
    } else {
      message.error("No user ID found. Please log in again.");
    }
  }, []);
  useEffect(() => {
    if (state.user_id) {
      getList();
    }
  }, [state.user_id]);
  const getList = async () => {
    if (!state.user_id) {
      message.error("User ID is required!");
      return;
    }
    const param = {
      txtSearch: state.txtSearch || "",
    };
    try {
      setLoading(true);
      const { id } = getProfile();
      if (!id) return;
      const res = await request(`customer/${id}`, "get", param);
      setLoading(false);
      if (res?.success) {
        setList(res.list || []);
      } else {
        message.error(res?.message || "Failed to fetch customer list");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching customer list:", error);
      message.error("Failed to fetch customer list");
    }
  };
  const onClickAddBtn = () => {
    setState((prev) => ({
      ...prev,
      visibleModal: true,
      isEditing: false,
      id: null,
    }));
    form.resetFields();
  };
  const onClickEdit = (record) => {
    setState((prev) => ({
      ...prev,
      visibleModal: true,
      isEditing: true,
      id: record.id,
    }));
    form.setFieldsValue(record);
  };
  const onClickDelete = (record) => {
    if (!record.id) {
      message.error("Customer ID is missing!");
      return;
    }
    Modal.confirm({
      title: "Remove Customer",
      content: "Are you sure you want to remove this customer?",
      onOk: async () => {
        try {
          const res = await request(`customer/${record.id}`, "delete"); 
          if (res && !res.error) {
            message.success(res.message);
            getList();
          } else {
            message.error(res.message || "This customer is currently in use and cannot be deleted.!");
          }
        } catch (error) {
          console.error("Delete Error:", error);
          message.error("An error occurred while deleting the customer.");
        }
      },
    });
  };
  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      const { id, isEditing } = state;
      if (isEditing) {
        const res = await request(`customer/${id}`, "put", values);
        if (res && !res.error) {
          message.success("Customer updated successfully!");
          setState((prev) => ({ ...prev, visibleModal: false }));
          getList();
        } else {
          message.error("Failed to update customer.");
        }
      } else {
        const res = await request("customer", "post", values);
        if (res && !res.error) {
          message.success("Customer created successfully!");
          setState((prev) => ({ ...prev, visibleModal: false }));
          getList();
        } else {
          message.error("Failed to create customer.");
        }
      }
    } catch (error) {
      console.error("Validation or API error:", error);
    }
  };
  const handleModalCancel = () => {
    setState((prev) => ({ ...prev, visibleModal: false }));
    form.resetFields();
  };
  return (
    <MainPage loading={loading}>
      <div className="pageHeader">
        <Space>
          <div>Seller Management</div>
          <Input.Search
            onChange={(e) =>
              setState((prev) => ({ ...prev, txtSearch: e.target.value }))
            }
            allowClear
            onSearch={getList}
            placeholder="Search by name"
          />
          <Button type="primary" onClick={getList}>
            Filter
          </Button>
        </Space>
        <Button type="primary" onClick={onClickAddBtn}>
          NEW
        </Button>
      </div>
      <Table
        rowKey="id"
        dataSource={list}
        columns={[
          {
            key: "no",
            title: "No",
            render: (_, __, index) => index + 1,
            width: 60,
          },
          {
            key: "name",
            title: "Name",
            dataIndex: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
          },
          {
            key: "type",
            title: "Seller Type",
            dataIndex: "type",
          },
          {
            key: "email",
            title: "Email",
            dataIndex: "email",
          },
          {
            key: "tel",
            title: "Tel",
            dataIndex: "tel",
          },
          {
            key: "address",
            title: "Address",
            dataIndex: "address",
            ellipsis: true,
          },
          {
            key: "status",
            title: "Status",
            dataIndex: "status",
            render: (status) => (
              <Tag color={status === 1 ? "green" : "red"}>
                {status === 1 ? "Active" : "Inactive"}
              </Tag>
            ),
            filters: [
              { text: "Active", value: 1 },
              { text: "Inactive", value: 0 },
            ],
            onFilter: (value, record) => record.status === value,
          },
          {
            key: "action",
            title: "Action",
            align: "center",
            width: 120,
            render: (_, record) => (
              <Space>
                <Button
                  type="primary"
                  icon={<MdEdit />}
                  onClick={() => onClickEdit(record)}
                  size="small"
                />
                <Button
                  type="primary"
                  danger
                  icon={<MdDelete />}
                  onClick={() => onClickDelete(record)}
                  size="small"
                />
              </Space>
            ),
          },
        ]}
      />
      <Modal
        title={state.isEditing ? "Edit Customer" : "Create Customer"}
        visible={state.visibleModal}
        onOk={handleModalSubmit}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tel"
            name="tel"
            rules={[{ required: true, message: "Tel is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Address is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Type is required" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </MainPage>
  );
}
export default CustomerPage;