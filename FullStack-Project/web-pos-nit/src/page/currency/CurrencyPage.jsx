import React, { useEffect, useState } from "react";
import { Table, Tag, Spin, Alert } from "antd";
import { request } from "../../util/helper";
import MainPage from "../../component/layout/MainPage";

function CurrencyList() {
  const [currencies, setCurrencies] = useState([]);
//   const [loading, setLoading] = useState([]);
  const [error, setError] = useState(null);

  // Fetch currency data from the backend
  useEffect(() => {
   getList();
  }, []);
  

  // Define columns for the Ant Design table
//   const columns = [
//     {
//       title: "Code",
//       dataIndex: "code",
//       key: "code",
//       render: (text) => <Tag color="blue">{text}</Tag>,
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Symbol",
//       dataIndex: "symbol",
//       key: "symbol",
//       render: (symbol) => <span style={{ fontSize: "18px" }}>{symbol}</span>,
//     },
//     {
//       title: "Exchange Rate",
//       dataIndex: "exchange_rate",
//       key: "exchange_rate",
//       render: (rate) => `${rate.toFixed(4)} USD`,
//     },
//     {
//       title: "Active",
//       dataIndex: "is_active",
//       key: "is_active",
//       render: (isActive) =>
//         isActive ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
//     },
//   ];

  // Show a loading spinner or error message
//   if (loading) {
//     return <Spin tip="Loading currencies..." />;
//   }

//   if (error) {
//     return <Alert message="Error" description={error} type="error" />;
//   }
  const getList = async()=>{
    const res = await request ("currency","get")
    if(res){
        setCurrencies();
    }
 }

  return (

    <MainPage>
        <Table 
        dataSource={currencies}
        columns={[
            {
                key:"NO",
                title:"No",
                dataIndex:"id"
            },
            {
                key:"code",
                title:"Code",
                dataIndex:"code"
            }
        ]}
        
        >

        </Table>
    </MainPage>
    // <div style={{ padding: "20px" }}>
    //   <h1 style={{ fontWeight: "bold", textAlign: "center" }}>Currency List</h1>
    //   <Table
    //     dataSource={currencies.map((currency) => ({
    //       ...currency,
    //       key: currency.id, // Set unique key for each row
    //     }))}
    //     columns={columns}
    //     bordered
    //     pagination={{ pageSize: 10 }}
    //   />
    // </div>
  );
}

export default CurrencyList;
