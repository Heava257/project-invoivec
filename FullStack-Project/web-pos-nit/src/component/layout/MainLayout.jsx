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
import logo from "../../assets/petronas.png";
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
    className: "version-item", // Custom class for version item
  },
  {
    key: "",
    label: "Dashboard",
    icon: <PieChartOutlined />,
    className: "dashboard-item", // Custom class for dashboard item
  },
  {
    key: "invoices",
    label: "Invoices",
    icon: <DesktopOutlined />,
    className: "invoices-item", // Custom class for invoices item
  },
  {
    key: "order",
    label: "Invoices Detail",
    icon: <FileOutlined />,
    className: "invoices-detail-item", // Custom class for invoices detail item
  },
  {
    key: "total_due",
    label: "Total Due",
    icon: <FileOutlined />,
    className: "invoices-detail-item", // Custom class for invoices detail item
  },
  {
    label: "Product",
    icon: <ShopOutlined />,
    className: "product-menu", // Custom class for product menu
    children: [
      {
        key: "product",
        label: "Warehouse",
        icon: <FileProtectOutlined />,
        className: "list-product-item", // Custom class for list product item
      },
      
      {
        key: "stockUser",
        label: "User Stock",
        icon: <FileProtectOutlined />,
        className: "list-product-item", // Custom class for list product item
      },
      // {
      //   key: "adminStockTransfer",
      //   label: "AdminStockTransfer",
      //   icon: <FileProtectOutlined />,
      //   className: "list-product-item", // Custom class for list product item
      // },
     
      {
        key: "category",
        label: "Category",
        icon: <SolutionOutlined />,
        className: "category-item", // Custom class for category item
      },
    ],
  },
  {
    label: "Purchase",
    icon: <ShoppingCartOutlined />,
    className: "purchase-menu", // Custom class for purchase menu
    children: [
      {
        key: "supplier",
        label: "Supplier",
        icon: <UsergroupAddOutlined />,
        className: "supplier-item", // Custom class for supplier item
      },
      // {
      //   key: "purchase",
      //   label: "List Purchase",
      //   icon: <FileOutlined />,
      //   className: "list-purchase-item", // Custom class for list purchase item
      // },
      // {
      //   key: "purchase_product",
      //   label: "Purchase Product",
      //   icon: <CreditCardOutlined />,
      //   className: "purchase-product-item", // Custom class for purchase product item
      // },
    ],
  },
  {
    label: "Expense",
    icon: <DollarOutlined />,
    className: "expense-menu", // Custom class for expense menu
    children: [
      {
        key: "expanse_type",
        label: "Expense Type",
        icon: <FileOutlined />,
        className: "expense-type-item", // Custom class for expense type item
      },
      {
        key: "expanse",
        label: "Expense",
        icon: <DollarOutlined />,
        className: "expense-item", // Custom class for expense item
      },
    ],
  },
  // {
  //   label: "Stock",
  //   icon: <DollarOutlined />,
  //   className: "stock-menu", // Custom class for stock menu
  //   children: [
  //     {
  //       key: "stock_in",
  //       label: "Stock In",
  //       icon: <DollarOutlined />,
  //       className: "stock-in-item", // Custom class for stock in item
  //     },
  //     {
  //       key: "stock_out",
  //       label: "Stock Out",
  //       icon: <DollarOutlined />,
  //       className: "stock-out-item", // Custom class for stock out item
  //     },
  //     {
  //       key: "List_stock",
  //       label: "Stock Out List",
  //       icon: <DollarOutlined />,
  //       className: "stock-out-list-item", // Custom class for stock out list item
  //     },
  //     {
  //       key: "in_stock",
  //       label: "In Stock",
  //       icon: <FileOutlined />,
  //       className: "in-stock-item", // Custom class for in stock item
  //     },
  //   ],
  // },
  {
    label: "Employee",
    icon: <UserOutlined />,
    className: "employee-menu", // Custom class for employee menu
    children: [
      {
        key: "employee",
        label: "Employee",
        icon: <UserOutlined />,
        className: "employee-item", // Custom class for employee item
      },
      // {
      //   key: "payroll",
      //   label: "Payroll",
      //   icon: <DollarOutlined />,
      //   className: "payroll-item", // Custom class for payroll item
      // },
    ],
  },
  {
    label: "User",
    icon: <SolutionOutlined />,
    className: "user-menu", // Custom class for user menu
    children: [
      {
        key: "user",
        label: "User",
        icon: <UserOutlined />,
        className: "user-item", // Custom class for user item
      },
      {
        key: "role",
        label: "Role",
        icon: <SafetyCertificateOutlined />,
        className: "role-item", // Custom class for role item
      },
      // {
      //   key: "role_permission",
      //   label: "Role Permission",
      //   icon: <FileProtectOutlined />,
      //   className: "role-permission-item", // Custom class for role permission item
      // },
    ],
  },
  {
    label: "Report",
    icon: <FileOutlined />,
    className: "report-menu", // Custom class for report menu
    children: [
      {
        key: "report_Sale_Summary",
        label: "Sale Summary",
        icon: <UserOutlined />,
        className: "sale-summary-item", // Custom class for sale summary item
      },
      {
        key: "report_Expense_Summary",
        label: "Expense Summary",
        icon: <DollarOutlined />,
        className: "expense-summary-item", // Custom class for expense summary item
      },
      {
        key: "purchase_Summary",
        label: "Purchase Summary",
        icon: <ShoppingCartOutlined />,
        className: "purchase-summary-item", // Custom class for purchase summary item
      },
      {
        key: "report_Customer",
        label: "New Customer Summary",
        icon: <UserOutlined />,
        className: "new-customer-summary-item", // Custom class for new customer summary item
      },
      {
        key: "Top_Sale",
        label: "Top Sale",
        icon: <TrophyOutlined />,
        className: "top-sale-item", // Custom class for top sale item
      },
    ],
  },
  // {
  //   label: "Setting",
  //   icon: <SettingOutlined />,
  //   className: "setting-menu", // Custom class for setting menu
  //   children: [
  //     {
  //       key: "Currency",
  //       label: "Currency",
  //       icon: <DollarOutlined />,
  //       className: "currency-item", // Custom class for currency item
  //     },
  //     {
  //       key: "language",
  //       label: "Language",
  //       icon: <GlobalOutlined />,
  //       className: "language-item", // Custom class for language item
  //     },
  //   ],
  // },
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
  // style={{
  //   // background: "linear-gradient(135deg, #667eea, #764ba2)", // Gradient color
  //   // color: "#ffffff", // White text color
  //   fontWeight: "bold",
  //   fontSize: "16px",
    
  // }}
/>

      </Sider>
      <Layout>
        <div className="admin-header">
          <div className="admin-header-g1">
            
          <div className="flex flex-col items-start space-y-1">
  {/* Logo and Company Name */}
  <div className="flex items-center gap-2">
    <img
      src={logo}
      alt="Company Logo"
      className="w-50 h-12 object-contain filter brightness-0 invert"
    />
    <h1 className="text-2xl font-bold text-white font-sans">
      PETRONAS CAMBODIA CO., LTD
    </h1>
  </div>

  {/* Branch and Address */}
  <div className="text-white text-sm">
    <div className="khmer-text font-semibold text-white">
      សាខា: {profile?.branch_name}
    </div>
    <div className="khmer-text text-white">
      អាសយដ្ឋាន: {profile?.address}
    </div>
  </div>
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






