import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Upload,
} from "antd";
import { formatDateClient, isPermission, request } from "../../util/helper";
import { MdAdd, MdDelete, MdEdit, MdOutlineCreateNewFolder } from "react-icons/md";
import MainPage from "../../component/layout/MainPage";
import { configStore } from "../../store/configStore";
import * as XLSX from 'xlsx/xlsx.mjs';
import { getProfile } from "../../store/profile.store";
import { BsSearch } from "react-icons/bs";
function ProductPage() {
  const { config } = configStore();
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [state, setState] = useState({
    list: [],
    total: 0,
    loading: false,
    visibleModal: false,
    is_list_all: false
  });
  const ExportToExcel = () => {
    if (list.length === 0) {
      message.warning("No data available to export.");
      return;
    }
    const data = list.map((item) => ({
      ...item,
      create_at: formatDateClient(item.create_at),
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Product");
    setTimeout(() => {
      XLSX.writeFile(wb, "Product_Data.xlsx");
    }, 2000);
  };
  const refPage = React.useRef(1);
  const [filter, setFilter] = useState({
    txt_search: "",
    category_id: "",
    brand: "",
  });
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    var param = {
      ...filter,
      page: refPage.current,
    };
    setState((pre) => ({ ...pre, loading: true }));
     const {id} = getProfile();
         if(!id) {
           return 
           }
         const res = await request(`product/${id}`, "get", param);
    if (res && !res.error) {
      setState((pre) => ({
        ...pre,
        list: res.list,
        total: refPage.current == 1 ? res.total : pre.total,
        loading: false,
      }));
    }
  };
  const onCloseModal = () => {
    setState((p) => ({
      ...p,
      visibleModal: false,
    }));
    form.resetFields();
  };
  const onFinish = async (items) => {
    const { id } = getProfile();
    if (!id) {
      message.error("User ID is missing!");
      return;
    }
    var data = {
      id: form.getFieldValue("id"),
      user_id: id,
      name: items.name,
      category_id: items.category_id,
      barcode: items.barcode,
      brand: items.brand,
      company_name: items.company_name,
      qty: items.qty,
      unit: items.unit,
      unit_price: items.unit_price,
      discount: items.discount,
      description: items.description,
      status: items.status,
    };
    var method = form.getFieldValue("id") ? "put" : "post";
    const res = await request("product", method, data);
    if (res && !res.error) {
      message.success(res.message);
      getList();
      onCloseModal();
    }
  };
  const onValuesChange = (changedValues, allValues) => {
    if (changedValues.qty || changedValues.unit_price || changedValues.discount) {
      const originalPrice = allValues.qty * allValues.unit_price;
      const totalPrice = originalPrice * (1 - (allValues.discount || 0) / 100);
      form.setFieldsValue({ price: totalPrice });
    }
  };
  const onBtnNew = async () => {
    const res = await request("new_barcode", "post");
    if (res && !res.error) {
      form.setFieldValue("barcode", res.barcode);
      setState((p) => ({
        ...p,
        visibleModal: true,
      }));
    }
  };
  const onFilter = () => {
    getList();
  };
  const onClickEdit = (data, index) => {
    setState({
      ...state,
      visibleModal: true,
    });
    form.setFieldsValue({
      id: data.id,
      name: data.name,
      user_id: data.user_id,
      category_id: data.category_id,
      brand: data.brand,
      company_name: data.company_name,
      qty: data.qty,
      unit: data.unit,
      unit_price: data.unit_price,
      discount: data.discount,
      description: data.description,
      status: data.status,
    });
  };
  const onClickDelete = (item, index) => {
    if (!item.id) {
      message.error("Product ID is missing!");
      return;
    }
    Modal.confirm({
      title: "Remove Product",
      content: "Are you sure you want to remove this product?",
      onOk: async () => {
        try {
          const res = await request(`product/${item.id}`, "delete");
          if (res && !res.error) {
            message.success(res.message);
            getList();
          } else {
            message.error(res.message || "Failed to delete product!");
          }
        } catch (error) {
          console.error("Delete Error:", error);
          message.error("An error occurred while deleting the product.");
        }
      },
    });
  };
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };
  return (
    <MainPage loading={state.loading}>
      <div className="pageHeader">
        <Space>
          <div className="khmer-text">ផលិតផល/{state.total}</div>
          <Input.Search
            onChange={(event) =>
              setFilter((p) => ({ ...p, txt_search: event.target.value }))
            }
            allowClear
            placeholder="Search"
          />
          <Select
            allowClear
            style={{ width: 130 }}
            placeholder="Category"
            options={config.category}
            onChange={(id) => {
              setFilter((pre) => ({ ...pre, category_id: id }));
            }}
          />
          <Select
            allowClear
            style={{ width: 160 }}
            placeholder="Brand"
            options={config.brand}
            onChange={(id) => {
              setFilter((pre) => ({ ...pre, brand: id }));
            }}
          />
          
          <Button onClick={onFilter} type="primary" icon={<BsSearch/>}>
            Filter
          </Button>
        </Space>
        <Button type="primary" onClick={onBtnNew} icon={<MdOutlineCreateNewFolder />}>
          NEW
        </Button>
      </div>
      <Modal
        open={state.visibleModal}
        title={form.getFieldValue("id") ? "Edit Product" : "New Product"}
        footer={null}
        onCancel={onCloseModal}
        width={700}
      >
        <Form layout="vertical" onFinish={onFinish} form={form} onValuesChange={onValuesChange}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item name={"name"} label={
                <div>
                  <div className="khmer-text">ឈ្មោះផលិតផល</div>
                  <div className="english-text">Product Name</div>
                </div>
              }>
                <Input placeholder="Product Name" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name={"category_id"}
                label={
                  <div>
                    <div className="khmer-text">ប្រភេទផលិតផល</div>
                    <div className="english-text">Category</div>
                  </div>
                }
                rules={[
                  {
                    required: true,
                    message: "Please fill in product category",
                  },
                ]}
              >
                <Select placeholder="Select category" options={config.category} />
              </Form.Item>
              

              {/* <Form.Item
                name={"brand"}
                label={
                  <div>
                    <div className="khmer-text">ម៉ាក</div>
                    <div className="english-text">Brand</div>
                  </div>
                }
                rules={[
                  {
                    required: true,
                    message: "Please fill in product brand",
                  },
                ]}
              > */}
                {/* <Select
                  placeholder="Select brand"
                  options={config.brand?.map((item) => ({
                    label: item.label + " (" + item.country + ")",
                    value: item.value,
                  }))}
                />
              </Form.Item> */}
              <Form.Item name={"barcode"} label={
                <div>
                  <div className="khmer-text">លេខបាកូដ</div>
                  <div className="english-text">Barcode</div>
                </div>
              }>
                <Input disabled placeholder="Barcode" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name={"qty"} label={
                <div>
                  <div className="khmer-text">បរិមាណ</div>
                  <div className="english-text">Quantity</div>
                </div>
              }>
                <InputNumber placeholder="Quantity" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name={"discount"} label={
                <div>
                  <div className="khmer-text">បញ្ចុះតម្លៃ (%)</div>
                  <div className="english-text">Discount (%)</div>
                </div>
              }>
                <InputNumber placeholder="Discount" style={{ width: "100%" }} />
              </Form.Item>
             
            </Col>
            <Col span={12}>
            <Form.Item
                name={"company_name"}
                label={
                  <div>
                    <div className="khmer-text">ក្រុមហ៊ុន</div>
                    <div className="english-text">Company</div>
                  </div>
                }
                rules={[
                  {
                    required: true,
                    message: "Please Select Company Name",
                  },
                ]}
              >
                <Select placeholder="Select Company" options={config?.company_name} />
              </Form.Item>
             

              <Form.Item name={"unit"} label={
                <div>
                  <div className="khmer-text">ឯកតា</div>
                  <div className="english-text">Unit</div>
                </div>
              }>
                <Select placeholder="Select Unit" options={config?.unit} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item name={"unit_price"} label={
                <div>
                  <div className="khmer-text">តម្លៃឯកតា</div>
                  <div className="english-text">Unit Price</div>
                </div>
              }>
                <InputNumber
                  placeholder="Unit Price"
                  style={{ width: "100%" }}
                  formatter={(value) => `$ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
              <Form.Item name={"status"} label={
                <div>
                  <div className="khmer-text">ស្ថានភាព</div>
                  <div className="english-text">Status</div>
                </div>
              }>
                <Select
                  placeholder="Select status"
                  options={[
                    {
                      label: "Active",
                      value: 1,
                    },
                    {
                      label: "Inactive",
                      value: 0,
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name={"price"} label={
                <div>
                  <div className="khmer-text">តម្លៃសរុប</div>
                  <div className="english-text">Total Price</div>
                </div>
              }>
                <InputNumber
                  disabled
                  style={{ width: "100%" }}
                  formatter={(value) => `$ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
              <Form.Item name={"description"} label={
                <div>
                  <div className="khmer-text">ការពិពណ៌នា</div>
                  <div className="english-text">Description</div>
                </div>
              }>
                <Input.TextArea placeholder="Description" />
              </Form.Item>
            </Col>
          </Row>
          <div style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={onCloseModal}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {form.getFieldValue("id") ? "Update" : "Save"}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
      <Table
        className="custom-table"
        dataSource={state.list}
        pagination={{
          pageSize: 2,
          total: state.total,
          onChange: (page) => {
            refPage.current = page;
            getList();
          },
        }}
        columns={[
          {
            key: "name",
            title: (
              <div className="table-header">
                <div className="khmer-text">ឈ្មោះ</div>
                <div className="english-text">Name</div>
              </div>
            ),
            dataIndex: "name",
            render: (text) => (
              <div className="truncate-text" title={text || ""}>
                {text || "N/A"}
              </div>
            ),
          },
          {
            key: "barcode",
            title: (
              <div className="table-header">
                <div className="khmer-text">លេខបាកូដ</div>
                <div className="english-text">Barcode</div>
              </div>
            ),
            dataIndex: "barcode",
            render: (value) => <Tag color="blue">{value}</Tag>,
          },
          {
            key: "description",
            title: (
              <div className="table-header">
                <div className="khmer-text">សេចក្ដីពិពណ៌នា</div>
                <div className="english-text">Description</div>
              </div>
            ),
            dataIndex: "description",
            render: (text) => (
              <div className="truncate-text" title={text || ""}>
                {text || "N/A"}
              </div>
            ),
          },
          {
            key: "category_name",
            title: (
              <div className="table-header">
                <div className="khmer-text">ប្រភេទ</div>
                <div className="english-text">Category</div>
              </div>
            ),
            dataIndex: "category_name",
          },
          // {
          //   key: "brand",
          //   title: (
          //     <div className="table-header">
          //       <div className="khmer-text">ម៉ាក</div>
          //       <div className="english-text">Brand</div>
          //     </div>
          //   ),
          //   dataIndex: "brand",
          // },
          {
            key: "company_name",
            title: (
              <div className="table-header">
                <div className="khmer-text">ឈ្មោះក្រុមហ៊ុន</div>
                <div className="english-text">Company Name</div>
              </div>
            ),
            dataIndex: "company_name",
          },
          {
            key: "qty",
            title: (
              <div className="table-header">
                <div className="khmer-text">បរិមាណ</div>
                <div className="english-text">Quantity</div>
              </div>
            ),
            dataIndex: "qty",
            render: (value) => (
              <Tag color={value > 5000 ? "green" : "red"}>{value}</Tag>
            ),
          },
          {
            key: "unit",
            title: (
              <div className="table-header">
                <div className="khmer-text">ឯកតា</div>
                <div className="english-text">Unit</div>
              </div>
            ),
            dataIndex: "unit",
            render: (value) => <Tag color="green">{value}</Tag>,
          },
          {
            key: "unit_price",
            title: (
              <div className="table-header">
                <div className="khmer-text">តម្លៃរាយ</div>
                <div className="english-text">Unit Price</div>
              </div>
            ),
            dataIndex: "unit_price",
            render: (value) => (
              <Tag color={value > 20 ? "green" : "volcano"}>
                {formatCurrency(value)}
              </Tag>
            ),
          },
          {
            key: "price",
            title: (
              <div className="table-header">
                <div className="khmer-text">តម្លៃសរុប</div>
                <div className="english-text">Total Price</div>
              </div>
            ),
            dataIndex: "total_price",
            render: (text) => formatCurrency(text),
          },
          {
            key: "discount",
            title: (
              <div className="table-header">
                <div className="khmer-text">បញ្ចុះតម្លៃ</div>
                <div className="english-text">Discount</div>
              </div>
            ),
            dataIndex: "discount",
          },
          {
            key: "status",
            title: (
              <div className="table-header">
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
            key: "create_at",
            title: (
              <div className="table-header">
                <div className="khmer-text">កាលបរិច្ឆេទបង្កើត</div>
                <div className="english-text">Created At</div>
              </div>
            ),
            dataIndex: "create_at",
            render: (value) => formatDateClient(value, "DD/MM/YYYY H:m A"),
          },
          {
            key: "create_by",
            title: (
              <div className="table-header">
                <div className="khmer-text">បង្កើតដោយ</div>
                <div className="english-text">Created By</div>
              </div>
            ),
            dataIndex: "create_by",
          },
          {
            key: "Action",
            title: (
              <div className="table-header">
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
export default ProductPage;