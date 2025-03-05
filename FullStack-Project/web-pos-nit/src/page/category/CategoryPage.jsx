import React, { useEffect, useState } from "react";
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
import { request } from "../../util/helper";
import { MdAdd, MdDelete, MdEdit, MdOutlineCreateNewFolder } from "react-icons/md";
import MainPage from "../../component/layout/MainPage";
import { configStore } from "../../store/configStore";
function CategoryPage() {
  const { config } = configStore();
  const [formRef] = Form.useForm();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    visibleModal: false,
    id: null,
    name: "",
    descriptoin: "",
    status: "",
    parentId: null,
    txtSearch: "",
  });
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    setLoading(true);
    const res = await request("category", "get");
    setLoading(false);
    if (res) {
      setList(res.list);
    }
  };
  const onClickEdit = (data, index) => {
    setState({
      ...state,
      visibleModal: true,
    });
    formRef.setFieldsValue({
      id: data.id,
      name: data.name,
      description: data.description,
      status: data.status,
    });
  };
  const onClickDelete = async (data, index) => {
    Modal.confirm({
      title: "លុ​ប",
      descriptoin: "Are you sure to remove?",
      okText: "យល់ព្រម",
      onOk: async () => {
        const res = await request("category", "delete", {
          id: data.id,
        });
        if (res && !res.error) {
          message.success(res.message);
          const newList = list.filter((item) => item.id != data.id);
          setList(newList);
        }
      },
    });
  };
  const onClickAddBtn = () => {
    setState({
      ...state,
      visibleModal: true,
    });
  };
  const onCloseModal = () => {
    formRef.resetFields();
    setState({
      ...state,
      visibleModal: false,
      id: null,
    });
  };
  const onFinish = async (items) => {
    var data = {
      id: formRef.getFieldValue("id"),
      name: items.name,
      description: items.description,
      status: items.status,
      parent_id: 0,
    };
    var method = "post";
    if (formRef.getFieldValue("id")) {
      method = "put";
    }
    const res = await request("category", method, data);
    if (res && !res.error) {
      message.success(res.message);
      getList();
      onCloseModal();
    }
  };
  return (
    <MainPage loading={loading}>
      <div className="pageHeader">
        <Space>
          <div className="khmer-text">ប្រភេទផលិតផល</div>
          <Input.Search
            onChange={(value) =>
              setState((p) => ({ ...p, txtSearch: value.target.value }))
            }
            allowClear
            onSearch={getList}
            placeholder="Search"
          />
        </Space>
        <Button type="primary" onClick={onClickAddBtn} icon={<MdOutlineCreateNewFolder />}>
          NEW
        </Button>
      </div>
      <Modal
    open={state.visibleModal}
    title={
        <div>
            <span className="khmer-text">
                {formRef.getFieldValue("id") ? "កែសម្រួលប្រភេទ" : "ប្រភេទថ្មី"}
            </span>
          
        </div>
    }
    footer={null}
    onCancel={onCloseModal}
>
    <Form layout="vertical" onFinish={onFinish} form={formRef}>
        {/* Category Name */}
        <Form.Item
            name={"name"}
            label={
                <div>
                    <span className="khmer-text">ឈ្មោះប្រភេទ</span>
                </div>
            }
        >
            <Input placeholder="Input Category name" />
        </Form.Item>

        {/* Description */}
        <Form.Item
            name={"description"}
            label={
                <div>
                    <span className="khmer-text">ការពិពណ៌នា</span>
                </div>
            }
        >
            <Input.TextArea placeholder="description" />
        </Form.Item>

        {/* Status */}
        <Form.Item
            name={"status"}
            label={
                <div>
                    <span className="khmer-text">ស្ថានភាព</span>
                </div>
            }
        >
            <Select
                placeholder="Select status"
                options={[
                    {
                        label: (
                            <div>
                                <span className="khmer-text">សកម្ម</span>
                            </div>
                        ),
                        value: 1,
                    },
                    {
                        label: (
                            <div>
                                <span className="khmer-text">អសកម្ម</span>
                            </div>
                        ),
                        value: 0,
                    },
                ]}
            />
        </Form.Item>

        {/* Buttons */}
        <Space>
            <Button>
                <span className="khmer-text">បោះបង់</span>
            </Button>
            <Button type="primary" htmlType="submit">
                <span className="khmer-text">
                    {formRef.getFieldValue("id") ? "កែសម្រួល" : "រក្សាទុក"}
                </span>
               
            </Button>
        </Space>
    </Form>
</Modal>
  <Table
  dataSource={list}
  columns={[
    {
      key: "No",
      title: (
        <div>
          <div className="khmer-text">លេខ</div>
          <div className="english-text">No</div>
        </div>
      ),
      render: (item, data, index) => index + 1,
    },
    {
      key: "name",
      title: (
        <div>
          <div className="khmer-text">ឈ្មោះ</div>
          <div className="english-text">Name</div>
        </div>
      ),
      dataIndex: "name",
    },
    {
      key: "description",
      title: (
        <div>
          <div className="khmer-text">សេចក្ដីពិពណ៌នា</div>
          <div className="english-text">Description</div>
        </div>
      ),
      dataIndex: "description",
    },
    {
      key: "status",
      title: (
        <div>
          <div className="khmer-text">ស្ថានភាព</div>
          <div className="english-text">Status</div>
        </div>
      ),
      dataIndex: "status",
      render: (status) =>
        status == 1 ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      key: "Action",
      title: (
        <div>
          <div className="khmer-text">សកម្មភាព</div>
          <div className="english-text">Action</div>
        </div>
      ),
      align: "center",
      render: (item, data, index) => (
        <Space>
          <Button
            type="primary"
            icon={<MdEdit />}
            onClick={() => onClickEdit(data, index)}
          />
          <Button
            type="primary"
            danger
            icon={<MdDelete />}
            onClick={() => onClickDelete(data, index)}
          />
        </Space>
      ),
    },
  ]}
/>
    </MainPage>
  );
}
export default CategoryPage;