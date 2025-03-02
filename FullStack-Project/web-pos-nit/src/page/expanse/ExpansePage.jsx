import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Space,
  Table,
  DatePicker,
} from "antd";
import { request } from "../../util/helper";
import { MdDelete, MdEdit } from "react-icons/md";
import MainPage from "../../component/layout/MainPage";
import dayjs from "dayjs";
function ExpansePage() {
  const [formRef] = Form.useForm();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    visibleModal: false,
    id: null,
    txtSearch: "",
  });
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    setLoading(true);
    const param = {
      txtSearch: state.txtSearch,
    };
    const res = await request("expense", "get", param);
    setLoading(false);
    if (res && !res.error) {
      setList(res.list || []);
    }
  };
  const onClickEdit = (data) => {
    setState({
      ...state,
      visibleModal: true,
      id: data.id,
    });
    formRef.setFieldsValue({
      id: data.id,
      expense_type_id: data.expense_type_id,
      ref_no: data.ref_no,
      name: data.name,
      amount: data.amount,
      remark: data.remark,
      expense_date: dayjs(data.expense_date),
    });
  };
  const onClickDelete = async (data) => {
    Modal.confirm({
      title: "លុប",
      content: "Are you sure to remove?",
      okText: "យល់ព្រម",
      onOk: async () => {
        const res = await request(`expense/${data.id}`, "delete");
        if (res && !res.error) {
          message.success(res.message);
          const newList = list.filter((item) => item.id !== data.id);
          setList(newList);
        } else {
          message.error(res?.message || "Failed to delete expense.");
        }
      },
    });
  };
  const onClickAddBtn = () => {
    setState({
      ...state,
      visibleModal: true,
      id: null,
    });
    formRef.resetFields();
  };
  const onCloseModal = () => {
    formRef.resetFields();
    setState({
      ...state,
      visibleModal: false,
      id: null,
    });
  };
  const onFinish = async (values) => {
    const data = {
      id: formRef.getFieldValue("id"),
      expense_type_id: values.expense_type_id,
      ref_no: values.ref_no,
      name: values.name,
      amount: values.amount,
      remark: values.remark,
      expense_date: values.expense_date?.format("YYYY-MM-DD"),
    };
    const method = formRef.getFieldValue("id") ? "put" : "post";
    const url = formRef.getFieldValue("id") ? `expense/${data.id}` : "expense";
    console.log("Request URL:", url); 
    console.log("Request Method:", method);
    console.log("Request Payload:", data);
    const res = await request(url, method, data);
    if (res && !res.error) {
      message.success(res.message);
      getList();
      onCloseModal();
    } else {
      message.error(res?.message || "Failed to save expense.");
    }
  };
  return (
    <MainPage loading={loading}>
      <div className="pageHeader">
        <Space>
          <div>Expense Management</div>
          <Input.Search
            onChange={(e) =>
              setState((p) => ({ ...p, txtSearch: e.target.value }))
            }
            allowClear
            onSearch={getList}
            placeholder="Search"
          />
          <Button type="primary" onClick={getList}>
            Filter
          </Button>
        </Space>
        <Button type="primary" onClick={onClickAddBtn}>
          NEW
        </Button>
      </div>
      <Modal
        open={state.visibleModal}
        title={formRef.getFieldValue("id") ? "Edit Expense" : "New Expense"}
        footer={null}
        onCancel={onCloseModal}
      >
        <Form layout="vertical" onFinish={onFinish} form={formRef}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="expense_type_id"
            label="Expense Type"
            rules={[{ required: true, message: "Expense Type is required" }]}
          >
            <Input placeholder="Enter Expense Type ID" />
          </Form.Item>
          <Form.Item
            name="ref_no"
            label="Reference Number"
            rules={[{ required: true, message: "Reference Number is required" }]}
          >
            <Input placeholder="Enter Reference Number" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Amount is required" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Enter Amount"
              min={0}
            />
          </Form.Item>
          <Form.Item name="remark" label="Remark">
            <Input.TextArea placeholder="Enter Remark" />
          </Form.Item>
          <Form.Item
            name="expense_date"
            label="Expense Date"
            rules={[{ required: true, message: "Expense Date is required" }]}
          >
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>
          <Space>
            <Button onClick={onCloseModal}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {formRef.getFieldValue("id") ? "Update" : "Save"}
            </Button>
          </Space>
        </Form>
      </Modal>
      <Table
        dataSource={list}
        columns={[
          {
            key: "no",
            title: "No",
            render: (_, __, index) => index + 1,
          },
          {
            key: "expense_type_id",
            title: "Expense Type",
            dataIndex: "expense_type_name",
          },
          {
            key: "ref_no",
            title: "Reference Number",
            dataIndex: "ref_no",
          },
          {
            key: "name",
            title: "Name",
            dataIndex: "name",
          },
          {
            key: "amount",
            title: "Amount",
            dataIndex: "amount",
            render: (value) => {
              const numericValue = parseFloat(value);
              return !isNaN(numericValue) ? `$${numericValue.toFixed(2)}` : "N/A";
            },
          },
          {
            key: "remark",
            title: "Remark",
            dataIndex: "remark",
          },
          {
            key: "expense_date",
            title: "Expense Date",
            dataIndex: "expense_date",
            render: (value) => dayjs(value).format("YYYY-MM-DD h:mm A"), // Format date
          },
          {
            key: "action",
            title: "Action",
            align: "center",
            render: (_, record) => (
              <Space>
                <Button
                  type="primary"
                  icon={<MdEdit />}
                  onClick={() => onClickEdit(record)}
                />
                <Button
                  type="primary"
                  danger
                  icon={<MdDelete />}
                  onClick={() => onClickDelete(record)}
                />
              </Space>
            ),
          },
        ]}
      />
    </MainPage>
  );
}
export default ExpansePage;