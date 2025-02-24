// import React, { useEffect, useState } from "react";
// import {
//   DesktopOutlined,
//   FileOutlined,
//   PieChartOutlined,
//   SmileOutlined,
//   TeamOutlined,
//   UserOutlined,
//   ShoppingCartOutlined,
//   DollarOutlined,
//   SettingOutlined,
//   ShopOutlined,
//   CreditCardOutlined,
//   SolutionOutlined,
//   UsergroupAddOutlined,
//   SafetyCertificateOutlined,
//   FileProtectOutlined,
//   TrophyOutlined,
//   GlobalOutlined,
// } from "@ant-design/icons";

// import { Breadcrumb, Button, Dropdown, Input, Layout, Menu, Tag, theme } from "antd";
// import { Outlet, useNavigate } from "react-router-dom";
// import "./MainLayout.css";
// import Logo from "../../assets/INT_LOGO1.png";
// import ImgUser from "../../assets/user-mage.jpg";
// import { IoIosNotifications } from "react-icons/io";
// import { MdOutlineMarkEmailUnread } from "react-icons/md";
// import {
//   getPermission,
//   getProfile,
//   setAcccessToken,
//   setProfile,
// } from "../../store/profile.store";
// import { request } from "../../util/helper";
// import { configStore } from "../../store/configStore";
// const { Header, Content, Footer, Sider } = Layout;
// <div>
// <Tag>V 1.0.1</Tag>
// </div>
// const items_menu = [
//   {
//     key: "version",
//     label: <Tag color="green">V 1.0.1</Tag>, // Version Display
//     disabled: true, // Prevent clicking
//   },
//   {
//     key: "",
//     label: "Dashboard",
//     icon: <PieChartOutlined />,
//   },
//   {
//     key: "pos",
//     label: "Invoices",
//     icon: <DesktopOutlined />,
//   },
 
//   {
//     key: "order",
//     label: "Invoices Detail",
//     icon: <FileOutlined />,
//   },
//   {
  
//     label: "Product",
//     icon: <ShopOutlined />,
//     children: [
//       {
//         key: "product",
//         label: "List Product",
//         icon: <FileProtectOutlined />,
//       },
//       {
//         key: "category",
//         label: "Category",
//         icon: <SolutionOutlined />,
//       },
//     ],
//   },
//   {
   
//     label: "Purchase",
//     icon: <ShoppingCartOutlined />,
//     children: [
//       {
//         key: "supplier",
//         label: "Supplier",
//         icon: <UsergroupAddOutlined />,
//       },
//       {
//         key: "purchase",
//         label: "List Purchase",
//         icon: <FileOutlined />,
//       },
//       {
//         key: "purchase_product",
//         label: "Purchase Product",
//         icon: <CreditCardOutlined />,
//       },
//     ],
//   },
//   {
   
//     label: "Expense",
//     icon: <DollarOutlined />,
//     children: [
//       {
//         key: "expanse_type",
//         label: "Expense Type",
//         icon: <FileOutlined />,
//       },
//       {
//         key: "expanse",
//         label: "Expense",
//         icon: <DollarOutlined />,
//       },
//     ],
//   },
//   {
   
//     label: "Stock",
//     icon: <DollarOutlined />,
//     children: [
//       {
//         key: "stock_in",
//         label: "Stock In",
//         icon: <DollarOutlined />,
//       },
//       {
//         key: "stock_out",
//         label: "Stock Out",
//         icon: <DollarOutlined />,
//       },
//       {
//         key: "List_stock",
//         label: "Stock Out List",
//         icon: <DollarOutlined />,
//       },
//       {
//         key: "in_stock",
//         label: "In Stock",
//         icon: <FileOutlined />,
//       },
     
//     ],
//   },
//   {
  
//     label: "Employee",
//     icon: <UserOutlined />,
//     children: [
//       {
//         key: "employee",
//         label: "Employee",
//         icon: <UserOutlined />,
//       },
//       {
//         key: "payroll",
//         label: "Payroll",
//         icon: <DollarOutlined />,
//       },
//     ],
//   },
//   {
   
//     label: "User",
//     icon: <SolutionOutlined />,
//     children: [
//       {
//         key: "user",
//         label: "User",
//         icon: <UserOutlined />,
//       },
//       {
//         key: "role",
//         label: "Role",
//         icon: <SafetyCertificateOutlined />,
//       },
//       {
//         key: "role_permission",
//         label: "Role Permission",
//         icon: <FileProtectOutlined />,
//       },
//     ],
//   },
//   {
  
//     label: "Report",
//     icon: <FileOutlined />,
//     children: [
//       {
//         key: "report_Sale_Summary",
//         label: "Sale Summary",
//         icon: <UserOutlined />, // Example: User icon for Sale Summary
//       },
//       {
//         key: "report_Expense_Summary",
//         label: "Expense Summary",
//         icon: <DollarOutlined />, // Dollar icon for Expense Summary
//       },
//       {
//         key: "purchase_Summary",
//         label: "Purchase Summary",
//         icon: <ShoppingCartOutlined />, // Shopping cart for Purchase Summary
//       },
//       {
//         key: "report_Customer",
//         label: "New Customer Summary",
//         icon: <UserOutlined />, // User icon for New Customer Summary
//       },
//       {
//         key: "Top_Sale",
//         label: "Top Sale",
//         icon: <TrophyOutlined />, // Trophy icon for Top Sale
//       },
//     ],
//   },
//   {
  
//     label: "Setting",
//     icon: <SettingOutlined />,
//     children: [
//       {
//         key: "Currency",
//         label: "Currency",
//         icon: <DollarOutlined />,
//       },
//       {
//         key: "language",
//         label: "Language",
//         icon: <GlobalOutlined />,
//       },
//     ],
//   },
// ];
// const MainLayout = () => {
//   const permision = getPermission();
//   const { setConfig } = configStore();
//   const [items,setItems] = useState(items_menu);
//   const profile = getProfile();
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   const navigate = useNavigate();

//   useEffect(() => {
//     checkISnotPermissionViewPage();
//     // getMenuByUser();
//     getConfig();
//     if (!profile) {
//       navigate("/login");
//     }
//   }, []);
//   const checkISnotPermissionViewPage =()=>{
//     let findIndex = permision?.findIndex(
//       (item) =>item.web_route_key == location.pathname
//     );
//     if (findIndex == -1) {
//       for (let i = 0; i < permision.length; i++) {
//        navigate(permision[i].web_route_key);
//        break;
        
//       }
//     }
//   }

//   const getMenuByUser =() =>{
//     // items_menu
//     let new_items_menu = [];
//     items_menu?.map((item1)=>{
//       const p1 = permision?.findIndex(
//         (data1) => data1.web_route_key == "/"+item1.key
//       );
//       if (p1 != -1){
//         new_items_menu.push(item1);
//       }
//       // new_items_menu.push(item1);
//       if (item1?.children && item1?.children.length > 0) {
//         let childTmp = [];
//         item1?.children.map((data1)=>{
//           permision?.map((data2) =>{
//             if (data2.web_route_key == "/" + data1.key) {
//               childTmp.push(data1);
//             }
//           });
//         });
//         if(childTmp.length > 0){
//           item1.children = childTmp;
//           new_items_menu.push(item1);
//         }
//       }
//     })
//     setItems(new_items_menu)
//   }

//   const getConfig = async () => {
//     const res = await request("config", "get");
//     if (res) {
//       setConfig(res);
//     }
//   };

//   const onClickMenu = (item) => {
//     navigate(item.key);
//   };
//   const onLoginOut = () => {
//     setProfile("");
//     setAcccessToken("");
//     navigate("/login");
//   };

//   if (!profile) {
//     return null;
//   }

//   const itemsDropdown = [
//     {
//       key: "1",
//       label: (
//         <a target="_blank" rel="noopener noreferrer" href="/">
//           profile
//         </a>
//       ),
//     },
//     {
//       key: "2",
//       label: (
//         <a target="_blank" rel="noopener noreferrer" href="/">
//           changs your password
//         </a>
//       ),
//       icon: <SmileOutlined />,
//       disabled: true,
//     },
//     {
//       key: "logout",
//       danger: true,
//       label: "Logout",
//     },
//   ];

//   return (
//     <Layout
//       style={{
//         minHeight: "100vh",
//       }}
//     >
      
//       <Sider


//         collapsible
//         collapsed={collapsed}
//         onCollapse={(value) => setCollapsed(value)}
//       >
//         {/* {permision?.map((item, index) => (
//   <div key={index}>
//     <div>{item.name}|{item.web_route_key}</div>
//   </div>
// ))} */}
//         <div className="demo-logo-vertical" />
//         <Menu
//   theme="dark"
//   defaultSelectedKeys={["1"]}
//   mode="inline"
//   items={items}
//   onClick={onClickMenu}
//   style={{
//     background: "linear-gradient(135deg, #667eea, #764ba2)", // Gradient color
//     color: "#ffffff", // White text color
//     fontWeight: "bold",
//     fontSize: "16px",
//   }}
// />

//       </Sider>
//       <Layout>
//         <div className="admin-header">
//           <div className="admin-header-g1">
//             <div>
//               <img className="admin-logo" src={Logo} alt="Logo" />
//             </div>
//             <div>
//               {/* <div className="txt-brand-name">POS-NU</div> */}
//               {/* <div className="txt-brand-name">Count : {count}</div> */}

//               {/* <div>Computer & Phone Shop</div> */}
//             </div>
//             {/* <div>
//               <Input.Search
//                 style={{ width: 180, marginLeft: 15, marginTop: 10 }}
//                 size="large"
//                 placeholder="Search"
//               />
//             </div> */}
//           </div>
//           <div className="admin-header-g2">
//             {/* <IoIosNotifications className="icon-notify" /> */}
//             <MdOutlineMarkEmailUnread className="icon-email" />
//             <div>
//               <div className="txt-username">{profile?.name}</div>
//               <div>{profile?.role_name}</div>
//             </div>
//             <Dropdown
//               menu={{
//                 items: itemsDropdown,
//                 onClick: (event) => {
//                   if (event.key == "logout") {
//                     onLoginOut();
//                   }
//                 },
//               }}
//             >
//               <img className="img-user" src={ImgUser} alt="Logo" />
//             </Dropdown>
//           </div>
//         </div>
//         <Content
//           style={{
//             margin: "10px",
//           }}
//         >
//           <div
//             className="admin-body"
//             style={{
//               background: colorBgContainer,
//               // backgroundColor:"green",
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             <Outlet />
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };
// export default MainLayout;






import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  SmileOutlined,
  TeamOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  SettingOutlined,
  ShopOutlined,
  CreditCardOutlined,
  SolutionOutlined,
  UsergroupAddOutlined,
  SafetyCertificateOutlined,
  FileProtectOutlined,
  TrophyOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

import { Breadcrumb, Button, Dropdown, Input, Layout, Menu, Tag, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import "./MainLayout.css";
import Logo from "../../assets/INT_LOGO1.png";
import ImgUser from "../../assets/user-mage.jpg";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import {
  getPermission,
  getProfile,
  setAcccessToken,
  setProfile,
} from "../../store/profile.store";
import { request } from "../../util/helper";
import { configStore } from "../../store/configStore";
const { Header, Content, Footer, Sider } = Layout;
<div>
<Tag>V 1.0.1</Tag>
</div>
const items_menu = [
  {
    key: "version",
    label: <Tag color="green">V 1.0.1</Tag>, // Version Display
    disabled: true, // Prevent clicking
  },
  {
    key: "",
    label: "Dashboard",
    icon: <PieChartOutlined />,
  },
  {
    key: "pos",
    label: "Invoices",
    icon: <DesktopOutlined />,
  },
 
  {
    key: "order",
    label: "Invoices Detail",
    icon: <FileOutlined />,
  },
  {
  
    label: "Product",
    icon: <ShopOutlined />,
    children: [
      {
        key: "product",
        label: "List Product",
        icon: <FileProtectOutlined />,
      },
      {
        key: "category",
        label: "Category",
        icon: <SolutionOutlined />,
      },
    ],
  },
  {
   
    label: "Purchase",
    icon: <ShoppingCartOutlined />,
    children: [
      {
        key: "supplier",
        label: "Supplier",
        icon: <UsergroupAddOutlined />,
      },
      {
        key: "purchase",
        label: "List Purchase",
        icon: <FileOutlined />,
      },
      {
        key: "purchase_product",
        label: "Purchase Product",
        icon: <CreditCardOutlined />,
      },
    ],
  },
  {
   
    label: "Expense",
    icon: <DollarOutlined />,
    children: [
      {
        key: "expanse_type",
        label: "Expense Type",
        icon: <FileOutlined />,
      },
      {
        key: "expanse",
        label: "Expense",
        icon: <DollarOutlined />,
      },
    ],
  },
  {
   
    label: "Stock",
    icon: <DollarOutlined />,
    children: [
      {
        key: "stock_in",
        label: "Stock In",
        icon: <DollarOutlined />,
      },
      {
        key: "stock_out",
        label: "Stock Out",
        icon: <DollarOutlined />,
      },
      {
        key: "List_stock",
        label: "Stock Out List",
        icon: <DollarOutlined />,
      },
      {
        key: "in_stock",
        label: "In Stock",
        icon: <FileOutlined />,
      },
     
    ],
  },
  {
  
    label: "Employee",
    icon: <UserOutlined />,
    children: [
      {
        key: "employee",
        label: "Employee",
        icon: <UserOutlined />,
      },
      {
        key: "payroll",
        label: "Payroll",
        icon: <DollarOutlined />,
      },
    ],
  },
  {
   
    label: "User",
    icon: <SolutionOutlined />,
    children: [
      {
        key: "user",
        label: "User",
        icon: <UserOutlined />,
      },
      {
        key: "role",
        label: "Role",
        icon: <SafetyCertificateOutlined />,
      },
      {
        key: "role_permission",
        label: "Role Permission",
        icon: <FileProtectOutlined />,
      },
    ],
  },
  {
  
    label: "Report",
    icon: <FileOutlined />,
    children: [
      {
        key: "report_Sale_Summary",
        label: "Sale Summary",
        icon: <UserOutlined />, // Example: User icon for Sale Summary
      },
      {
        key: "report_Expense_Summary",
        label: "Expense Summary",

        icon: <DollarOutlined />, // Dollar icon for Expense Summary
      },
      {
        key: "purchase_Summary",
        label: "Purchase Summary",
        icon: <ShoppingCartOutlined />, // Shopping cart for Purchase Summary
      },
      {
        key: "report_Customer",
        label: "New Customer Summary",
        icon: <UserOutlined />, // User icon for New Customer Summary
      },
      {
        key: "Top_Sale",
        label: "Top Sale",
        icon: <TrophyOutlined />, // Trophy icon for Top Sale
      },
    ],
  },
  {
  
    label: "Setting",
    icon: <SettingOutlined />,
    children: [
      {
        key: "Currency",
        label: "Currency",
        icon: <DollarOutlined />,
      },
      {
        key: "language",
        label: "Language",
        icon: <GlobalOutlined />,
      },
    ],
  },
];
const MainLayout = () => {
  const permision = getPermission();
  const { setConfig } = configStore();
  const [items,setItems] = useState(items_menu);
  const profile = getProfile();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  useEffect(() => {
    checkISnotPermissionViewPage();
    // getMenuByUser();
    getConfig();
    if (!profile) {
      navigate("/login");
    }
  }, []);
  const checkISnotPermissionViewPage =()=>{
    let findIndex = permision?.findIndex(
      (item) =>item.web_route_key == location.pathname
    );
    if (findIndex == -1) {
      for (let i = 0; i < permision.length; i++) {
       navigate(permision[i].web_route_key);
       break;
        
      }
    }
  }

  const getMenuByUser =() =>{
    // items_menu
    let new_items_menu = [];
    items_menu?.map((item1)=>{
      const p1 = permision?.findIndex(
        (data1) => data1.web_route_key == "/"+item1.key
      );
      if (p1 != -1){
        new_items_menu.push(item1);
      }
      // new_items_menu.push(item1);
      if (item1?.children && item1?.children.length > 0) {
        let childTmp = [];
        item1?.children.map((data1)=>{
          permision?.map((data2) =>{
            if (data2.web_route_key == "/" + data1.key) {
              childTmp.push(data1);
            }
          });
        });
        if(childTmp.length > 0){
          item1.children = childTmp;
          new_items_menu.push(item1);
        }
      }
    })
    setItems(new_items_menu)
  }

  const getConfig = async () => {
    const res = await request("config", "get");
    if (res) {
      setConfig(res);
    }
  };

  const onClickMenu = (item) => {
    navigate(item.key);
  };
  const onLoginOut = () => {
    setProfile("");
    setAcccessToken("");
    navigate("/login");
  };

  if (!profile) {
    return null;
  }

  const itemsDropdown = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
          profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
          changs your password
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: "logout",
      danger: true,
      label: "Logout",
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      
      <Sider


        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {/* {permision?.map((item, index) => (
  <div key={index}>
    <div>{item.name}|{item.web_route_key}</div>
  </div>
))} */}
        <div className="demo-logo-vertical" />
        <Menu
  theme="dark"
  defaultSelectedKeys={["1"]}
  mode="inline"
  items={items}
  onClick={onClickMenu}
  style={{
    background: "linear-gradient(135deg, #667eea, #764ba2)", // Gradient color
    color: "#ffffff", // White text color
    fontWeight: "bold",
    fontSize: "16px",
  }}
/>


</Sider>
      <Layout>
        <div className="admin-header">
          <div className="admin-header-g1">
            <div>
              <img className="admin-logo" src={Logo} alt="Logo" />
            </div>
            <div>
              {/* <div className="txt-brand-name">POS-NU</div> */}
              {/* <div className="txt-brand-name">Count : {count}</div> */}

              {/* <div>Computer & Phone Shop</div> */}
            </div>
            {/* <div>
              <Input.Search
                style={{ width: 180, marginLeft: 15, marginTop: 10 }}
                size="large"
                placeholder="Search"
              />
            </div> */}
          </div>
          <div className="admin-header-g2">
            {/* <IoIosNotifications className="icon-notify" /> */}
            <MdOutlineMarkEmailUnread className="icon-email" />
            <div>
              <div className="txt-username">{profile?.name}</div>
              <div>{profile?.role_name}</div>
            </div>
            <Dropdown
              menu={{
                items: itemsDropdown,
                onClick: (event) => {
                  if (event.key == "logout") {
                    onLoginOut();
                  }
                },
              }}
            >
              <img className="img-user" src={ImgUser} alt="Logo" />
            </Dropdown>
          </div>
        </div>
        <Content
          style={{
            margin: "10px",
          }}
        >
          <div
            className="admin-body"
            style={{
              background: colorBgContainer,
              // backgroundColor:"green",
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;

