
import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Col,
  Empty,
  Input,
  InputNumber,
  message,
  notification,
  Row,
  Select,
  Space,
  Table,
  Modal,
  Form,
  Tag,
} from "antd";
import { request } from "../../util/helper";
import MainPage from "../../component/layout/MainPage";
import { configStore } from "../../store/configStore";
import BillItem from "../../component/pos/BillItem";
import styles from "./PosPage.module.css";
import { useReactToPrint } from "react-to-print";
import PrintInvoice from "../../component/pos/PrintInvoice";
import { getProfile } from "../../store/profile.store";
import { MdAddToPhotos } from "react-icons/md";
import { BsPrinter } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FcDeleteRow } from "react-icons/fc";
function PosPage() {
  const [isDisabled, setIsDisabled] = useState(false);
  const { config } = configStore();
  const refInvoice = React.useRef(null);
  const [state, setState] = useState({
    list: [],
    customers: [],
    total: 0,
    loading: false,
    visibleModal: false,
    cart_list: [],
  });
  const fetchCustomers = async () => {
    try {
      const { id } = getProfile();
      if (!id) {
        console.error("User ID is missing.");
        return;
      }
      const param = {
        ...filter,
        page: refPage.current,
        is_list_all: 1,
      };
      setState((prev) => ({ ...prev, loading: true }));
      const res = await request(`customer/${id}`, "get", param);
      if (res && !res.error) {
        const customers = (res.list || []).map((customer) => ({
          label: `${customer.name} - ${customer.tel}`,
          value: customer.id,
        }));
        setState((prev) => ({ ...prev, customers, loading: false }));
      } else {
        console.error("Failed to fetch customers:", res?.error);
        setState((prev) => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      setState((prev) => ({ ...prev, loading: false }));
    }
  };
  const [objSummary, setObjSummary] = useState({
    sub_total: 0,
    total_qty: 0,
    save_discount: 0,
    tax: 10,
    total: 0,
    total_paid: 0,
    customers: null,
    customer_id: null,
    user_id: null,
    payment_method: null,
    remark: null,
    order_no: null,
    order_date: null,
  });
  const refPage = React.useRef(1);

  const [filter, setFilter] = useState({
    txt_search: "",
    category_id: "",
    brand: "",
  });
  const [form] = Form.useForm();
  useEffect(() => {
    fetchCustomers();
    getList();
  }, []);
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setIsDisabled(hours === 0 && minutes === 0);
    };
    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);
  const getList = async () => {
    var param = {
      ...filter,
      page: refPage.current,
      is_list_all: 1,
    };
    setState((pre) => ({ ...pre, loading: true }));
    const { id } = getProfile();
    if (!id) {
      return
    }
    const res = await request(`product/${id}`, "get", param);
    if (res && !res.error) {
      if (res.list?.length == 1) {
        handleAdd(res.list[0]);
        setState((pre) => ({ ...pre, loading: false }));
        return;
      }
      setState((pre) => ({
        ...pre,
        list: res.list,
        total: refPage.current == 1 ? res.total : pre.total,
        loading: false,
      }));
    }
  };
  const onFilter = () => {
    getList();
  }; const handleAdd = (item) => {
    var cart_tmp = [...state.cart_list]; // Ensure a copy of the state list
    var findIndex = cart_tmp.findIndex((row) => row.barcode === item.barcode);
    var isNoStock = false;

    if (findIndex === -1) {
      if (item.qty > 0) {
        cart_tmp.push({ ...item, cart_qty: 0 }); // ✅ Default cart_qty = 0
      } else {
        isNoStock = true;
      }
    } else {
      cart_tmp[findIndex].cart_qty += 1;
      if (item.qty < cart_tmp[findIndex].cart_qty) {
        isNoStock = true;
      }
    }

    if (isNoStock) {
      notification.error({
        message: "Warning",
        description: `No stock! Currently, quantity in stock available: ${item.qty}`,
        placement: "bottomRight",
        style: {
          backgroundColor: "hsl(359,100%,98%)",
          outline: "1px solid #ff4d4f",
        },
      });
      return;
    }

    setState((pre) => ({
      ...pre,
      cart_list: cart_tmp,
    }));
    handleCalSummary();
  };





  const handleClearCart = () => {
    setState((p) => ({ ...p, cart_list: [] }));
    setObjSummary((p) => ({
      ...p,
      sub_total: 0,
      total_qty: 0,
      save_discount: 0,
      tax: 10,
      total: 0,
      total_paid: 0,
    }));
  };





  const handleCalSummary = useCallback(() => {
    let total_qty = 0;
    let sub_total = 0;
    let save_discount = 0;
    let total = 0;

    state.cart_list.forEach((item) => {
      const qty = item.cart_qty || 0;
      const unit_price = item.unit_price || 0;
      const actual_price = item.actual_price || unit_price; // Use actual price if provided, otherwise fallback to unit price

      // Calculate the subtotal per item based on actual price
      const calculated_total = (qty * unit_price) / actual_price; // Adjust for actual price
      sub_total += calculated_total; // Update subtotal

      // Handle the discount logic
    

      // Final total after applying discount (if any)
    

      total_qty += qty; // Update total quantity
    });

    setObjSummary({
      total_qty: total_qty.toFixed(2),
      sub_total: sub_total.toFixed(2), // Subtotal before discount
      save_discount: save_discount.toFixed(2), // Total discount applied
      total: total.toFixed(2), // Final total after discount
    });
  });







  const handleClickOut = async () => {
    var order_details = [];
    state.cart_list.forEach((item) => {
      var total = Number(item.cart_qty) * Number(item.unit_price);
      if (item.discount != null && item.discount != 0) {
        total = total - (total * Number(item.discount)) / 100;
      }
      var objItem = {
        product_id: item.id,
        qty: Number(item.cart_qty),
        price: Number(item.unit_price),
        discount: Number(item.discount),
        total: total,
      };
      order_details.push(objItem);
    });
    var param = {

      order: {
        customer_id: objSummary.customer_id,
        user_id: objSummary.user_id,
        total_amount: objSummary.total,
        paid_amount: objSummary.total_paid,
        payment_method: objSummary.payment_method,
        remark: objSummary.remark,
      },
      order_details: order_details,
    };



    const res = await request("order", "post", param);
    if (res && !res.error) {
      if (res.order) {
        message.success("Order created success!");
        setObjSummary((p) => ({
          ...p,
          order_no: res.order?.order_no,
          order_date: res.order?.create_at,
        }));
        setTimeout(() => {
          handlePrintInvoice();
        }, 1000);
      }
    } else {
      message.error("Order not complete!");
    }
  };

  const onBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);

  const onAfterPrint = React.useCallback((event) => {
    handleClearCart();
    console.log("`onAfterPrint` called", event);
  }, []);

  const onPrintError = React.useCallback(() => {
    console.log("`onPrintError` called");
  }, []);

  const handlePrintInvoice = useReactToPrint({
    contentRef: refInvoice,
    onBeforePrint: onBeforePrint,
    onAfterPrint: onAfterPrint,
    onPrintError: onPrintError,
  });
  const handleModalOk = () => {
    form.validateFields().then((values) => {

      setState((p) => ({ ...p, visibleModal: false }));
    });
  };

  const handleModalCancel = () => {
    setState((p) => ({ ...p, visibleModal: false }));
  };

  // Replace the current uniqueProducts function with this:
  const uniqueProducts = state.list || []; // Simply use the original list

  // If you want to actually summarize by category (which might not be what you want), use this instead:
  /*
  const uniqueProducts = state.list.reduce((acc, product) => {
    const existingCategoryIndex = acc.findIndex((p) => p.category_name === product.category_name);
  
    if (existingCategoryIndex >= 0) {
      // Update existing category's quantity
      acc[existingCategoryIndex].qty += product.qty;
    } else {
      // Add new product to accumulator
      acc.push({ ...product });
    }
    return acc;
  }, []);
  */
  const columns = [
    {
      title: (
        <div className="table-header">
          <div className="khmer-text">លេខបាកូដ</div>
          <div className="english-text">Barcode</div>
        </div>
      ),
      dataIndex: "barcode",
      key: "barcode",
      render: (value) => <Tag className="barcode-tag" color="cyan">{value}</Tag>,
    },
    {
      title: (
        <div className="table-header">
          <div className="khmer-text">ឈ្មោះផលិតផល</div>
          <div className="english-text">Product Name</div>
        </div>
      ),
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="pos-row">{text}</span>,
    },
    {
      title: (
        <div className="table-header">
          <div className="khmer-text">ប្រភេទ</div>
          <div className="english-text">Category Name</div>
        </div>
      ),
      dataIndex: "category_name",
      key: "category_name",
      render: (text) => <span className="pos-row">{text}</span>,
    },
    {
      title: (
        <div className="table-header">
          <div className="khmer-text">ឯកតា</div>
          <div className="english-text">Unit</div>
        </div>
      ),
      dataIndex: "unit",
      key: "unit",
      render: (text) => <span className="pos-row">{text}</span>,
    },

    {
      title: (
        <div className="table-header">
          <div className="khmer-text">បរិមាណ</div>
          <div className="english-text">QTY</div>
        </div>
      ),
      dataIndex: "qty",
      key: "qty",
      render: (text) => <span className="pos-row">{text}</span>,
    },

    {
      title: (
        <div className="table-header">
          <div className="khmer-text">សកម្មភាព</div>
          <div className="english-text">Action</div>
        </div>
      ),
      key: "action",
      render: (text, record) => (
        <Button className="add-to-cart-btn" onClick={() => handleAdd(record)} type="primary" icon={<MdAddToPhotos />}>
          Add to Cart
        </Button>
      ),
    },
  ];
  const handleQuantityChange = (value, index) => {
    if (!value || isNaN(value) || value <= 0) return; // Prevent invalid values

    const newCartList = [...state.cart_list];
    newCartList[index].cart_qty = Number(value); // Convert to number

    setState((prev) => ({ ...prev, cart_list: newCartList }));
    handleCalSummary();
  };



  const handlePriceChange = (value, index) => {
    if (value < 0) return; // Prevent negative prices

    const newCartList = [...state.cart_list];
    newCartList[index] = { ...newCartList[index], unit_price: value };

    setState((prev) => ({ ...prev, cart_list: newCartList }));
    handleCalSummary();
  };
  const handleActualPriceChange = (value, index) => {
    if (value < 0) return; // Prevent negative prices

    const newCartList = [...state.cart_list];
    newCartList[index] = { ...newCartList[index], actual_price: value };

    setState((prev) => ({ ...prev, cart_list: newCartList }));
    handleCalSummary();
  };



  // In the BillItem component or similar

  return (
    <MainPage loading={state.loading}>
      <div style={{ display: "none" }}>
        <PrintInvoice
          ref={refInvoice}
          cart_list={state.cart_list}
          objSummary={objSummary}
        />
      </div>
      <Row gutter={24}>
        <Col span={14} className={styles.grid1}>
          <div className="pageHeader">
            <Space>
              <div className="khmer-text">ផលិតផល/ {state.total}</div>
              <Input.Search
                onChange={(event) =>
                  setFilter((p) => ({ ...p, txt_search: event.target.value }))
                }
                allowClear
                placeholder="Search"
                onSearch={() => getList()}
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
                style={{ width: 130 }}
                placeholder="Brand"
                options={config.brand}
                onChange={(id) => {
                  setFilter((pre) => ({ ...pre, brand: id }));
                }}
              />
              <Button onClick={onFilter} type="primary" icon={<FiSearch />}>
                Search
              </Button>
              <Button type="primary" onClick={handlePrintInvoice} icon={<BsPrinter />}>
                Print Invoice{" "}
              </Button>
            </Space>
            {/* <Space>
              <Button onClick={handleExportExcel}>Export to Excel</Button>
              <Button onClick={handleSavePdf}>Save as PDF</Button>
              <Button onClick={handlePrint}>Print</Button>
              <Button type="primary" onClick={() => setState((p) => ({ ...p, visibleModal: true }))}>
                New
              </Button>
            </Space> */}
          </div>
          <Table
            dataSource={uniqueProducts}
            columns={columns}
            loading={state.loading}
            pagination={false}
            rowKey="id"
          />
        </Col>



        <Col span={10}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Items {state.cart_list.length}</div>
            <Button onClick={handleClearCart} icon={<FcDeleteRow />}>Clear</Button>
          </div>
          {state.cart_list?.map((item, index) => (
            <BillItem
              key={index}
              {...item}
              handleQuantityChange={(value) => handleQuantityChange(value, index)}
              handlePriceChange={(value) => handlePriceChange(value, index)}
              handleActualPriceChange={(value) => handleActualPriceChange(value, index)}
            />
          ))}







          {!state.cart_list.length && <Empty />}
          <div>
            <div className={styles.rowSummary}>
              <div className="khmer-title">បរិមាណសរុប</div> {/* Total Qty */}
              <div>{Number(objSummary.total_qty).toLocaleString()} Liter</div>
            </div>

            <div className={styles.rowSummary}>
              <div className="khmer-title">តម្លៃសរុប</div> {/* Sub Total */}
              <div>{Math.round(Number(objSummary.sub_total)).toLocaleString()}$</div>
            </div>

            {/* <div className={styles.rowSummary}>
              <div className="khmer-title">ចំនួនប្រាក់បញ្ចុះតម្លៃ (%)</div> {/* Save ($) */}
            {/* <div>{Math.round(Number(objSummary.save_discount)).toLocaleString()}$</div>
            </div> */}

            {/* <div className={styles.rowSummary}>
              <div className="khmer-title">តម្លៃចុងក្រោយ:</div>
              <div style={{ fontWeight: "bold" }}>
                {Math.round(Number(objSummary.total)).toLocaleString()}$
              </div>
            </div> */}
          </div>


          <div>
            <Row gutter={[6, 6]} style={{ marginTop: 15 }}>
              <Col span={12}>

                <Select
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Select Customer"
                  options={state.customers} // Use state.customers instead
                  loading={state.loading}
                  onSelect={(value, option) => {
                    setObjSummary((prev) => ({
                      ...prev,
                      customer_id: value,
                      customer_name: option.label,
                    }));
                  }}
                />

              </Col>

              <Col span={12}>
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Select Payment"
                  options={[
                    {
                      label: "Cash",
                      value: "Cash",
                    },
                    {
                      label: "Wing",
                      value: "Wing",
                    },
                    {
                      label: "ABA",
                      value: "ABA",
                    },
                    {
                      label: "AC",
                      value: "AC",
                    },
                  ]}
                  onSelect={(value) => {
                    setObjSummary((p) => ({
                      ...p,
                      payment_method: value,
                    }));
                  }}
                />
              </Col>
              <Col span={24}>
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Select location"
                  options={config?.branch_name} // Make sure `config?.user` contains `branch_name`
                  onSelect={(value, option) => {
                    console.log(option); // 🔥 Debugging: ពិនិត្យ `option`
                    setObjSummary((prev) => ({
                      ...prev,
                      user_id: value,
                      user_name: option.label,
                      user_address: option.address || "",
                      branch_name: option.branch_name || "", // ✅ Fix: avoid undefined error
                      tel: option.tel || "",
                    }));
                  }}
                />


              </Col>

              <Col span={24}>
                <Input.TextArea
                  placeholder="Remark"
                  onChange={(e) => {
                    setObjSummary((p) => ({ ...p, remark: e.target.value }));
                  }}
                />
              </Col>

            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 15 }}>
              <Col span={12}>
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Amount to paid"
                  value={objSummary.total_paid}
                  onChange={(value) => {
                    setObjSummary((p) => ({ ...p, total_paid: value }));
                  }}
                />
              </Col>
              <Col span={12}>

                <Button
                  disabled={isDisabled || state.cart_list.length == 0}
                  block
                  type="primary"
                  onClick={handleClickOut}
                >
                  Checkout{" "}
                </Button>
              </Col>
              {/* <Col span={24}>
                <Button type="primary" onClick={handlePrintInvoice}>
                  Print Invoice{" "}
                </Button>
              </Col> */}
            </Row>
          </div>
        </Col>
      </Row>
      <Modal
        title="New Order"
        visible={state.visibleModal}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Customer" name="customer_id" rules={[{ required: true }]}>
            <Select
              allowClear
              placeholder="Select Customer"
              options={config?.customer}
            />
          </Form.Item>
          <Form.Item label="Payment Method" name="payment_method" rules={[{ required: true }]}>
            <Select
              allowClear
              placeholder="Select Payment"
              options={[
                { label: 'Cash', value: 'Cash' },
                { label: 'Wing', value: 'Wing' },
                { label: 'ABA', value: 'ABA' },
                { label: 'AC', value: 'AC' },
              ]}
            />
          </Form.Item>
          <Form.Item label="Total" name="total" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </MainPage>
  );
}

export default PosPage;