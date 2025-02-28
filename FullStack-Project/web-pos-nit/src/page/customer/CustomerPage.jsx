// import { useEffect, useState } from "react";
// import {
//   Button,
//   Col,
//   Form,
//   Input,
//   message,
//   Modal,
//   Row,
//   Select,
//   Space,
//   Table,
//   Tag,
// } from "antd";
// import { request } from "../../util/helper";
// import { MdDelete, MdEdit } from "react-icons/md";
// import MainPage from "../../component/layout/MainPage";
// import { getUserId } from "../../store/profile.store";

// function CustomerPage() {
//   const [formRef] = Form.useForm();
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [state, setState] = useState({
//     visibleModal: false,
//     id: null,
//     txtSearch: "",
//     user_id: null, // Initialize user_id as null
//   });

//   useEffect(() => {
//     const userId = getUserId();
//     console.log("Fetched User ID from store:", userId); // Debugging
//     if (userId) {
//       setState((prev) => ({ ...prev, user_id: userId }));
//     }
//   }, []);

//   // Call getList when user_id is set
//   useEffect(() => {
//     if (state.user_id) {
//       getList();
//     }
//   }, [state.user_id]);

//   const getList = async () => {
//     if (!state.user_id) {
//       message.error("User ID is required!");
//       return;
//     }

//     setLoading(true);
//     const param = {
//       txtSearch: state.txtSearch || "",
//     };

//     try {
//       const res = await request(`customer/${state.user_id}`, "get", param);
//       setLoading(false);

//       if (res?.success) {
//         setList(res.list || []);
//       } else {
//         message.error(res?.message || "Failed to fetch customer list");
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Error fetching customer list:", error);
//       message.error("Failed to fetch customer list");
//     }
//   };

//   const onClickEdit = (data) => {
//     setState({
//       ...state,
//       visibleModal: true,
//       id: data.id,
//     });

//     // Set all field values from the data object
//     formRef.setFieldsValue({
//       id: data.id,
//       name: data.name,
//       status: data.status,
//       tel: data.tel,
//       email: data.email,
//       address: data.address,
//       type: data.type,
//     });
//   };

//   const onClickDelete = async (data) => {
//     Modal.confirm({
//       title: "Delete",
//       content: "Are you sure you want to remove this customer?",
//       okText: "Yes",
//       cancelText: "No",
//       onOk: async () => {
//         const res = await request("customer", "delete", {
//           id: data.id,
//         });
//         if (res && !res.error) {
//           message.success(res.message);
//           // Remove from local state to avoid additional API call
//           const newList = list.filter((item) => item.id !== data.id);
//           setList(newList);
//         }
//       },
//     });
//   };

//   const onClickAddBtn = () => {
//     formRef.resetFields(); // Clear form when adding new
//     setState({
//       ...state,
//       visibleModal: true,
//       id: null,
//     });
//   };

//   const onCloseModal = () => {
//     formRef.resetFields();
//     setState({
//       ...state,
//       visibleModal: false,
//       id: null,
//     });
//   };

//   const onFinish = async (values) => {
//     const id = formRef.getFieldValue("id");

//     const data = {
//       id: id,
//       name: values.name,
//       status: values.status,
//       tel: values.tel,
//       email: values.email,
//       address: values.address,
//       type: values.type,
//       user_id: state.user_id, // Include user_id in the request
//     };

//     const method = id ? "put" : "post";

//     setLoading(true);
//     const res = await request("customer", method, data);
//     setLoading(false);

//     if (res && !res.error) {
//       message.success(res.message);
//       getList();
//       onCloseModal();
//     } else {
//       message.error(res?.message || "Operation failed");
//     }
//   };

//   return (
//     <MainPage loading={loading}>
//       <div className="pageHeader">
//         <Space>
//           <div>Customer Management</div>
//           <Input.Search
//             onChange={(e) =>
//               setState((prev) => ({ ...prev, txtSearch: e.target.value }))
//             }
//             allowClear
//             onSearch={getList}
//             placeholder="Search by name"
//           />
//           <Button type="primary" onClick={getList}>
//             Filter
//           </Button>
//         </Space>
//         <Button type="primary" onClick={onClickAddBtn}>
//           NEW
//         </Button>
//       </div>

//       <Modal
//         open={state.visibleModal}
//         title={formRef.getFieldValue("id") ? "Edit Customer" : "New Customer"}
//         footer={null}
//         onCancel={onCloseModal}
//         width={800}
//       >
//         <Form
//           layout="vertical"
//           onFinish={onFinish}
//           form={formRef}
//           initialValues={{ status: 1 }} // Default status to Active
//         >
//           <Form.Item name="id" hidden>
//             <Input />
//           </Form.Item>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="name"
//                 label="Customer Name"
//                 rules={[{ required: true, message: "Please input customer name" }]}
//               >
//                 <Input placeholder="Input customer name" />
//               </Form.Item>

//               <Form.Item
//                 name="status"
//                 label="Status"
//                 rules={[{ required: true, message: "Please select status" }]}
//               >
//                 <Select
//                   placeholder="Select status"
//                   options={[
//                     { label: "Active", value: 1 },
//                     { label: "Inactive", value: 0 },
//                   ]}
//                 />
//               </Form.Item>

//               <Form.Item name="address" label="Customer Address">
//                 <Input placeholder="Input customer address" />
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item name="tel" label="Customer Tel">
//                 <Input placeholder="Input customer tel" />
//               </Form.Item>

//               <Form.Item
//                 name="email"
//                 label="Customer Email"
//                 rules={[
//                   {
//                     type: "email",
//                     message: "Please enter a valid email",
//                   },
//                 ]}
//               >
//                 <Input placeholder="Input customer email" />
//               </Form.Item>

//               <Form.Item
//                 name="type"
//                 label="Customer Type"
//                 rules={[{ required: true, message: "Please select customer type" }]}
//               >
//                 <Select
//                   placeholder="Select customer type"
//                   options={[
//                     { label: "Regular", value: "regular" },
//                     { label: "VIP", value: "vip" },
//                   ]}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           <div style={{ textAlign: "right", marginTop: "12px" }}>
//             <Space>
//               <Button onClick={onCloseModal}>Cancel</Button>
//               <Button type="primary" htmlType="submit" loading={loading}>
//                 {formRef.getFieldValue("id") ? "Update" : "Save"}
//               </Button>
//             </Space>
//           </div>
//         </Form>
//       </Modal>

//       <Table
//         rowKey="id"
//         dataSource={list}
//         columns={[
//           {
//             key: "no",
//             title: "No",
//             render: (_, __, index) => index + 1,
//             width: 60,
//           },
//           {
//             key: "name",
//             title: "Name",
//             dataIndex: "name",
//             sorter: (a, b) => a.name.localeCompare(b.name),
//           },
//           {
//             key: "type",
//             title: "Customer Type",
//             dataIndex: "type",
//           },
//           {
//             key: "email",
//             title: "Email",
//             dataIndex: "email",
//           },
//           {
//             key: "tel",
//             title: "Tel",
//             dataIndex: "tel",
//           },
//           {
//             key: "address",
//             title: "Address",
//             dataIndex: "address",
//             ellipsis: true,
//           },
//           {
//             key: "status",
//             title: "Status",
//             dataIndex: "status",
//             render: (status) => (
//               <Tag color={status === 1 ? "green" : "red"}>
//                 {status === 1 ? "Active" : "Inactive"}
//               </Tag>
//             ),
//             filters: [
//               { text: "Active", value: 1 },
//               { text: "Inactive", value: 0 },
//             ],
//             onFilter: (value, record) => record.status === value,
//           },
//           {
//             key: "action",
//             title: "Action",
//             align: "center",
//             width: 120,
//             render: (_, record) => (
//               <Space>
//                 <Button
//                   type="primary"
//                   icon={<MdEdit />}
//                   onClick={() => onClickEdit(record)}
//                   size="small"
//                 />
//                 <Button
//                   type="primary"
//                   danger
//                   icon={<MdDelete />}
//                   onClick={() => onClickDelete(record)}
//                   size="small"
//                 />
//               </Space>
//             ),
//           },
//         ]}
//       />
//     </MainPage>
//   );
// }

// export default CustomerPage;

import { useEffect, useState } from "react";
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
import { getProfile,setProfile} from "../../store/profile.store";

function CustomerPage() {
  const [formRef] = Form.useForm();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    visibleModal: false,
    id: null,
    txtSearch: "",
    user_id: null, // Initialize user_id as null
  });

  // Fetch user_id from localStorage and set it in state
  useEffect(() => {
    const userId = getProfile();
    console.log("Fetched User ID from localStorage:", userId); // Debugging
    if (userId) {
      setState((prev) => ({ ...prev, user_id: userId }));
    } else {
      message.error("No user ID found. Please log in again.");
    }
  }, []);
  
// console.log(userId)
  // Fetch customer list when user_id is set
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
  
    console.log("Making request with user_id:", state.user_id); // Debugging
  
    const param = {
      txtSearch: state.txtSearch || "",
    };
  
    try {
      // setProfile(JSON.stringify(res.profile));
      const res = await request(`customer/17`, "get", param);
     
   console.log(state.id)
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
  

  const onClickAddBtn = () =>{

  }

  return (
    <MainPage loading={loading}>
      <div className="pageHeader">
        <Space>
          <div>Customer Management</div>
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
          // More columns here...
        ]}
      />
    </MainPage>
  );
}

export default CustomerPage;
