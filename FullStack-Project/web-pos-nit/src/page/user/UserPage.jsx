import React, { useEffect, useState } from "react";
import { request } from "../../util/helper";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { resetWarned } from "antd/es/_util/warning";
import { configStore } from "../../store/configStore";
function UserPage() {
  const [form] = Form.useForm();
  const { config } = configStore();
   const [filter, setFilter] = useState({
      txt_search: "",
      category_id: "",
      brand: "",
    });
  const [state, setState] = useState({
    list: [],
    role: [],
    loading: false,
    visible: false,
  });
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const res = await request("auth/get-list", "get");
    if (res && !res.error) {
      setState((pre) => ({
        ...pre,
        list: res.list,
        role: res.role,
      }));
    }
  };

  const onClickEdit = (data) => {
    setState((pre)=>({
      ...pre,
      // handleOpenModal
      visible:true
    }))
    form.setFieldsValue({
    ...data
    });
    //
    // form.getFieldValue("id")
  };
  const clickBtnDelete = (item) => {
    Modal.confirm({
      title: "Delete",
      content: "Are you sure to remove?",
      onOk: async () => {
        const res = await request("user", "delete", {
          id: item.id,
        });
        if (res && !res.error) {
          message.success(res.message);
          const newList = state.list.filter((item1) => item1.id != item.id);
          setState((pre) => ({
            ...pre,
            list: newList,
          }));
        }
      },
    });
  };

  const handleCloseModal = () => {
    setState((pre) => ({
      ...pre,
      visible: false,
    }));
    form.resetFields();
  };

  const handleOpenModal = () => {
    setState((pre) => ({
      ...pre,
      visible: true,
    }));
  };
  // {"name":"a","username":"b","password":"12","role_id":2,"is_active":0}
  const onFinish = async (item) => {
    if (item.password !== item.confirm_password) {
      message.warning("Password and Confirm Password Not Match!");
      return;
    }

    var data = {
      id: form.getFieldValue("id"),
      ...item,
    };

    // Declare method before using it
    let method = "post";
    if (form.getFieldValue("id")) {
      method = "put";
    }

    const res = await request("auth/register", method, data);
    if (res && !res.error) {
      message.success(res.message);
      getList();
      handleCloseModal();
    } else {
      message.warning(res.message);
    }
};


//  const clickBtnDelete =()=>{}
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>Customer</div>
         <Space>
         <Input.Search style={{ marginLeft: 10}} placeholder="Search" />
         

         <div>
          <Space>
          <Select
                          allowClear
                          style={{ width: 130 }}
                          placeholder="Select Province"
                          options={config.category}
                          onChange={(id) => {
                            setFilter((pre) => ({ ...pre, category_id: id }));
                          }}
                        />
                        <Select
                          allowClear
                          style={{ width: 130 }}
                          placeholder="Select Tel"
                          options={config.brand}
                          onChange={(id) => {
                            setFilter((pre) => ({ ...pre, brand: id }));
                          }}
                        />
          </Space>
         </div>
         </Space>
        </div>
        <Button type="primary" onClick={handleOpenModal}>
          New
        </Button>
      </div>
      <Modal
       
        open={state.visible}
        onCancel={handleCloseModal}
        footer={null}
        title={form.getFieldValue("id") ? "Update Customer" : "New Customer"}

      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name={"name"}
            label="Name"
            rules={[
              {
                required: true,
                message: "Please fill in name",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name={"username"}
            label="Email"
            rules={[
              {
                required: true,
                message: "Please fill in email",
              },
            ]}
          >
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item
            name={"password"}
            label="password"
            rules={[
              {
                required: true,
                message: "Please fill in password",
              },
            ]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>
          <Form.Item
            name={"confirm_password"}
            label="Confirm Password"
            rules={[
              {
                required: true,
                message: "Please fill in confirm password",
              },
            ]}
          >
            <Input.Password placeholder="confirm password" />
          </Form.Item>
          <Form.Item
            name={"role_id"}
            label="Role"
            rules={[
              {
                required: true,
                message: "Please select role",
              },
            ]}
          >
            <Select placeholder="Select Role" options={state.role} />
          </Form.Item>
          <Form.Item
            name={"is_active"}
            label="Status"
            rules={[
              {
                required: true,
                message: "Please select status",
              },
            ]}
          >
            <Select
              placeholder="Select Status"
              options={[
                {
                  label: "Active",
                  value: 1,
                },
                {
                  label: "InActive",
                  value: 0,
                },
              ]}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button type="primary" htmlType="submit">
               {form.getFieldValue("id") ? "Update": "Save"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        dataSource={state.list}
        columns={[
          {
            key: "no",
            title: "No",
            render: (value, data, index) => index + 1,
          },
          {
            key: "name",
            title: "Name",
            dataIndex: "name",
          },
          {
            key: "username",
            title: "Username",
            dataIndex: "username",
          },
          {
            key: "tel",
            title: "Tel",
            dataIndex: "tel",
          },
          {
            key: "role_name",
            title: "Province",
            dataIndex: "role_name",
          },
          {
            key: "address",
            title: "address",
            dataIndex: "address",
          },
          {
            key: "is_active",
            title: "Status",
            dataIndex: "is_active",
            render: (value) =>
              value ? (
                <Tag color="green">Active</Tag>
              ) : (
                <Tag color="red">In Active</Tag>
              ),
          },
          {
            key: "create_by",
            title: "Create By",
            dataIndex: "create_by",
          },
        
          {
            key: "create_at",
            title: "Create_at",
            dataIndex: "create_at",
          },
          {
            key: "action",
            title: "Action",
            align: "center",
            render: (value, data) => (
              <Space>
                <Button onClick={() => onClickEdit(data)} type="primary">
                  Edit
                </Button>
                <Button
                  onClick={() => clickBtnDelete(data)}
                  danger
                  type="primary"
                >
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
      />
    </div>
  );
}

export default UserPage;
