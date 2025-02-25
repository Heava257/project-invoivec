// import { Col, Flex, Row } from "antd";
// import React from "react";
// import logo from "../../assets/INT_LOGO.png";

// const PrintInvoice = React.forwardRef((props, ref) => {
//   const findTotalItem = (item) => {
//     let total = item.cart_qty * item.unit_price;
//     if (item.discount) {
//       let discount_price = (total * item.discount) / 100;
//       total = total - discount_price;
//     }
//     return total.toFixed(2);
//   };

//   return (
//     <div
//       ref={ref}
//       style={{
//         width: "80mm",
//         padding: "10px",
//         fontFamily: "'Poppins', sans-serif",
//         fontSize: "10px",
//         color: "#444",
//       }}
//     >
//       {/* Header */}
//       <Flex align="center" style={{ marginBottom: "10px" }}>
//         <img
//           src={logo}
//           alt="Beauty Center Logo"
//           style={{
//             width: 40,
//             height: 40,
//             marginRight: 10,
//             borderRadius: "50%",
//           }}
//         /> 
//         <div>
//           <div style={{ fontWeight: "bold", fontSize: "12px", color: "#d81b60" }}>
//             BEAUTY & WELLNESS CENTER
//           </div>
//           <div style={{ fontSize: "9px", color: "#888" }}>
//             "Relax. Refresh. Renew."
//           </div>
//           <div style={{ fontSize: "9px" }}>123 Wellness St, Phnom Penh</div>
//           <div style={{ fontSize: "9px" }}>Phone: +855 12 345 678</div>
//         </div>
//       </Flex>
//       <hr style={{ borderColor: "#d81b60" }} />

//       {/* Invoice Details */}
//       <div style={{ marginBottom: "15px", marginTop: "5px" }}>
//         <strong>Invoice:</strong> {props.objSummary?.order_no} <br />
//         <strong>Date:</strong>{" "}
//         {props.objSummary?.order_date?.toLocaleString("en-US", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//         })}
//       </div>

//       {/* Item List */}
//       <table style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr style={{ borderBottom: "1px solid #ccc" }}>
//             <th align="left" style={{ fontWeight: "bold", fontSize: "10px" }}>
//               Service
//             </th>
//             <th align="center" style={{ fontWeight: "bold", fontSize: "10px" }}>
//               Qty
//             </th>
//             <th align="center" style={{ fontWeight: "bold", fontSize: "10px" }}>
//               Price
//             </th>
//             <th align="center" style={{ fontWeight: "bold", fontSize: "10px" }}>
//               Disc(%)
//             </th>
//             <th align="center" style={{ fontWeight: "bold", fontSize: "10px" }}>
//               Total
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {props.cart_list?.map((item, index) => (
//             <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
//               <td style={{ padding: "5px 0" }}>{item.name}</td>
//               <td align="center">{item.cart_qty}</td>
//               <td align="center">{item.unit_price}$</td>
//               <td align="center">{item.discount}</td>
//               <td align="center">{findTotalItem(item)}$</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Summary */}
//       <div style={{ marginTop: "10px" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginBottom: "5px",
//           }}
//         >
//           <span>Total Qty:</span>
//           <span>{props?.objSummary.total_qty} PCS</span>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginBottom: "5px",
//           }}
//         >
//           <span>Subtotal:</span>
//           <span>{props?.objSummary.sub_total}$</span>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginBottom: "5px",
//           }}
//         >
//           <span>Discount Saved:</span>
//           <span>{props?.objSummary.save_discount}$</span>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             fontWeight: "bold",
//           }}
//         >
//           <span>Total:</span>
//           <span>{props?.objSummary.total}$</span>
//         </div>
//       </div>

//       {/* Footer */}
//       <p style={{ textAlign: "center", marginTop: "10px", fontSize: "9px" }}>
//         Thank you for choosing Beauty & Wellness Center! <br />
//         Visit us again for more relaxation and care. 💆‍♀️✨
//       </p>
//     </div>
//   );
// });

// export default PrintInvoice;





// import React from "react";
// import logo from "../../assets/petronas.jpg"

// const PrintInvoice = React.forwardRef((props, ref) => {
//   const { objSummary = {
//     sub_total: 0,
//     total_qty: 0,
//     save_discount: 0,
//     tax: 10,
//     total: 0,
//     total_paid: 0,
//     customer_id: null,
//     payment_method: null,
//     remark: null,
//     order_no: null,
//     order_date: null,
//   }, cart_list = [] } = props;

//   // Format date helper
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <div ref={ref} className="p-8 max-w-4xl mx-auto">
//       {/* Header */}
//       <div className="flex justify-between mb-8">
//         <div>
//           <img 
//             src="/api/placeholder/100/50"
//             alt="Company Logo"
//             className="w-24 h-12 object-contain"
//           />
//         </div>
//         <div className="text-right">
//           <h2 className="text-2xl font-bold mb-2">វិក្កយបត្រ</h2>
//           <h2 className="text-xl">INVOICE</h2>
//         </div>
//       </div>

//       {/* Invoice Details */}
//       <div className="grid grid-cols-2 gap-4 mb-8">
//         <div>
//           <p className="mb-1">លេខទូរស័ព្ទ: 093 82 22 82 / 099 82 22 82</p>
//           <p>អាសយដ្ឋាន: ក្រុងភ្នំពេញ</p>
//         </div>
//         <div className="text-right">
//           <p className="mb-1">លេខវិក្កយបត្រ: {objSummary.order_no}</p>
//           <p className="mb-1">ថ្ងៃចេញវិក្កយបត្រ: {formatDate(objSummary.order_date)}</p>
//           <p className="mb-1">Customer ID: {objSummary.customer_id || 'N/A'}</p>
//           <p className="mb-1">Payment Method: {objSummary.payment_method || 'N/A'}</p>
//           {objSummary.remark && <p>Remark: {objSummary.remark}</p>}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="w-full mb-8 overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2 w-1/12 text-left">No</th>
//               <th className="border p-2 w-5/12 text-left">Description</th>
//               <th className="border p-2 w-2/12 text-center">Quantity</th>
//               <th className="border p-2 w-2/12 text-right">Unit Price</th>
//               <th className="border p-2 w-2/12 text-right">Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cart_list.map((item, index) => (
//               <tr key={index}>
//                 <td className="border p-2">{index + 1}</td>
//                 <td className="border p-2">{item.name}</td>
//                 <td className="border p-2 text-center">{item.cart_qty}</td>
//                 <td className="border p-2 text-right">$ {item.unit_price}</td>
//                 <td className="border p-2 text-right">$ {(item.cart_qty * item.unit_price).toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Summary */}
//       <div className="w-64 ml-auto space-y-2">
//         <div className="flex justify-between">
//           <span>Subtotal:</span>
//           <span>$ {objSummary.sub_total.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Total Qty:</span>
//           <span>{objSummary.total_qty} PCS</span>
//         </div>
//         {objSummary.save_discount > 0 && (
//           <div className="flex justify-between">
//             <span>Discount:</span>
//             <span>$ {objSummary.save_discount.toFixed(2)}</span>
//           </div>
//         )}
//         {objSummary.tax > 0 && (
//           <div className="flex justify-between">
//             <span>Tax ({objSummary.tax}%):</span>
//             <span>$ {(objSummary.sub_total * objSummary.tax / 100).toFixed(2)}</span>
//           </div>
//         )}
//         <div className="flex justify-between font-bold pt-2 border-t">
//           <span>Total:</span>
//           <span>$ {objSummary.total.toFixed(2)}</span>
//         </div>
//         {objSummary.total_paid > 0 && (
//           <div className="flex justify-between text-green-600">
//             <span>Paid Amount:</span>
//             <span>$ {objSummary.total_paid.toFixed(2)}</span>
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <div className="grid grid-cols-2 gap-4 mt-8">
//         <div>
//           <p className="font-bold mb-2">អតិថិជន</p>
//           <p>Customer:</p>
//           <p className="mt-8">ហត្ថលេខា</p>
//           <p>Date: ....../....../.....</p>
//         </div>
//         <div className="text-right">
//           <p className="font-bold mb-2">គណនេយ្យករ</p>
//           <p>Accountant:</p>
//           <p className="mt-8">ហត្ថលេខា</p>
//           <p>Date: {formatDate(objSummary.order_date)}</p>
//         </div>
//       </div>

//       {/* Contact */}
//       <div className="text-center mt-8">
//         <p>ទំនាក់ទំនងផ្នែកបច្ចេកទេស: +855 67 733 335 / +855 76 5555 713</p>
//       </div>
//     </div>
//   );
// });

// export default PrintInvoice;



// import React from "react";
// import logo from "../../assets/petronas.jpg"
// const PrintInvoice = React.forwardRef((props, ref) => {
//   const { objSummary = {
//     sub_total: 0,
//     total_qty: 0,
//     save_discount: 0,
//     tax: 10,
//     total: 0,
//     total_paid: 0,
//     // customer,
//     customer_id: null,
//     payment_method: null,
//     remark: null,
//     order_no: null,
//     order_date: null,
//   }, cart_list = [] } = props;
//   console.log(objSummary)
//   // Helper function to safely format numbers
//   const formatNumber = (value) => {
//     const number = parseFloat(value) || 0;
//     return number.toFixed(2);
//   };

//   // Format date helper
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // Calculate tax amount
//   const calculateTax = () => {
//     const subtotal = parseFloat(objSummary.sub_total) || 0;
//     const taxRate = parseFloat(objSummary.tax) || 0;
//     return (subtotal * taxRate / 100);
//   };

//   return (
//     <div ref={ref} className="p-8 max-w-4xl mx-auto">
//       {/* Header */}
//       <div className="flex justify-between mb-8">
//         <div className="flex items-center space-x-4">
//           <img
//             src={logo}
//             alt="Company Logo"
//             className="w-28 h-14 object-contain"
//           />
//           <h1 className="text-2xl font-bold text-gray-800">Petronas Cambodia</h1>
//         </div>

//         <div className="text-right">
//           <h2 className="text-2xl font-bold mb-2">វិក្កយបត្រ</h2>
//           <h2 className="text-xl">INVOICE</h2>
//         </div>
//       </div>

//       {/* Invoice Details */}
//       <div className="grid grid-cols-2 gap-4 mb-8">
//         <div>
//           <p className="mb-1">លេខទូរស័ព្ទ: 093 82 22 82 / 099 82 22 82</p>
//           <p>អាសយដ្ឋាន: ក្រុងភ្នំពេញ</p>
//         </div>
//         <div className="text-right">
//           <p className="mb-1">លេខវិក្កយបត្រ: {objSummary.order_no}</p>
//           <p className="mb-1">ថ្ងៃចេញវិក្កយបត្រ: {formatDate(objSummary.order_date)}</p>
//           <p className="mb-1">Customer Name: {objSummary.customer_name || 'N/A'}</p>


//           <p className="mb-1">Payment Method: {objSummary.payment_method || 'N/A'}</p>
//           {objSummary.remark && <p>Remark: {objSummary.remark}</p>}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="w-full mb-8 overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2 w-1/12 text-left">No</th>
//               <th className="border p-2 w-5/12 text-left">Description</th>
//               <th className="border p-2 w-2/12 text-center">Quantity</th>
//               <th className="border p-2 w-2/12 text-right">Unit Price</th>
//               <th className="border p-2 w-2/12 text-right">Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cart_list.map((item, index) => (
//               <tr key={index}>
//                 <td className="border p-2">{index + 1}</td>
//                 <td className="border p-2">{item.name}</td>
//                 <td className="border p-2 text-center">{item.cart_qty}</td>
//                 <td className="border p-2 text-right">$ {formatNumber(item.unit_price)}</td>
//                 <td className="border p-2 text-right">$ {formatNumber(item.cart_qty * item.unit_price)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Summary */}
//       <div className="w-64 ml-auto space-y-2">
//         <div className="flex justify-between">
//           <span>Subtotal:</span>
//           <span>$ {formatNumber(objSummary.sub_total)}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Total Qty:</span>
//           <span>{objSummary.total_qty || 0} PCS</span>
//         </div>
//         {parseFloat(objSummary.save_discount) > 0 && (
//           <div className="flex justify-between">
//             <span>Discount:</span>
//             <span>$ {formatNumber(objSummary.save_discount)}</span>
//           </div>
//         )}
//         {parseFloat(objSummary.tax) > 0 && (
//           <div className="flex justify-between">
//             <span>Tax ({formatNumber(objSummary.tax)}%):</span>
//             <span>$ {formatNumber(calculateTax())}</span>
//           </div>
//         )}
//         <div className="flex justify-between font-bold pt-2 border-t">
//           <span>Total:</span>
//           <span>$ {formatNumber(objSummary.total)}</span>
//         </div>
//         {parseFloat(objSummary.total_paid) > 0 && (
//           <div className="flex justify-between text-green-600">
//             <span>Paid Amount:</span>
//             <span>$ {formatNumber(objSummary.total_paid)}</span>
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <div className="grid grid-cols-2 gap-4 mt-8">
//         <div>
//           <p className="font-bold mb-2">អតិថិជន</p>
//           <p>Customer:</p>
//           <p className="mt-8">ហត្ថលេខា</p>
//           <p>Date: ....../....../.....</p>
//         </div>
//         <div className="text-right">
//           <p className="font-bold mb-2">គណនេយ្យករ</p>
//           <p>Accountant:</p>
//           <p className="mt-8">ហត្ថលេខា</p>
//           <p>Date: {formatDate(objSummary.order_date)}</p>
//         </div>
//       </div>

//       {/* Contact */}
//       <div className="text-center mt-8">
//         <p>ទំនាក់ទំនងផ្នែកបច្ចេកទេស: +855 67 733 335 / +855 76 5555 713</p>
//       </div>
//     </div>
//   );
// });

// export default PrintInvoice;


import React from "react";
import logo from "../../assets/petronas.png";
import "./fonts.css"; // Import the CSS file

const PrintInvoice = React.forwardRef((props, ref) => {
  const { objSummary = {
    sub_total: 0,
    total_qty: 0,
    save_discount: 0,
    tax: 10,
    total: 0,
    total_paid: 0,
    customer_id: null,
    payment_method: null,
    remark: null,
    order_no: null,
    order_date: null,
  }, cart_list = [] } = props;

  const formatNumber = (value) => {
    const number = parseFloat(value) || 0;
    return number.toFixed(2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateTax = () => {
    const subtotal = parseFloat(objSummary.sub_total) || 0;
    const taxRate = parseFloat(objSummary.tax) || 0;
    return (subtotal * taxRate / 100);
  };

  return (
    <div ref={ref} className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between mb-8 bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-1"> {/* Reduced space further */}
          <img
            src={logo}
            alt="Company Logo"
            className="w-50 h-12 object-contain filter brightness-0 invert"
          />




          <h1 className="text-2xl font-bold text-white font-sans -ml-1">PETRONAS CAMBODIA CO.,LTD</h1>
        </div>

        <div className="text-right">
          <h2 className="text-2xl font-bold text-white mb-2">វិក្កយបត្រ</h2>
          <h2 className="text-xl text-white">INVOICE</h2>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <p className="mb-1">លេខទូរស័ព្ទ: 093 82 22 82 / 099 82 22 82</p>
          <p>អាសយដ្ឋាន: ក្រុងភ្នំពេញ</p>
        </div>
        <div className="text-right">
          <p className="mb-1">លេខវិក្កយបត្រ: {objSummary.order_no}</p>
          <p className="mb-1">ថ្ងៃចេញវិក្កយបត្រ: {formatDate(objSummary.order_date)}</p>
          <p className="mb-1">Customer Name: {objSummary.customer_name || 'N/A'}</p>
          <p className="mb-1">Payment Method: {objSummary.payment_method || 'N/A'}</p>
          {objSummary.remark && <p>Remark: {objSummary.remark}</p>}
        </div>
      </div>

      {/* Table */}
      <div className="w-full mb-8 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 w-1/12 text-left">No / លេខ</th>
              <th className="border p-2 w-5/12 text-left">Description / ការពិពណ៌នា</th>
              <th className="border p-2 w-2/12 text-center">Quantity / បរិមាណ</th>
              <th className="border p-2 w-2/12 text-right">Unit Price / តម្លៃ​រាយ</th>
              <th className="border p-2 w-2/12 text-right">Amount / តម្លៃ​សរុប</th>
            </tr>
          </thead>

          {/* <tbody>
            {cart_list.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2 text-center">{item.cart_qty}</td>
                <td className="border p-2 text-right">$ {formatNumber(item.unit_price)}</td>
                <td className="border p-2 text-right">$ {formatNumber(item.cart_qty * item.unit_price)}</td>
              </tr>
            ))}
          </tbody> */}
          <tbody>
            {cart_list.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{item.name} <br /></td>
                <td className="border p-2 text-center">{item.cart_qty} <span className="text-gray-500 text-sm">{item.unit }</span></td>
                <td className="border p-2 text-right">$ {formatNumber(item.unit_price)}</td>
                <td className="border p-2 text-right font-bold">$ {formatNumber(item.cart_qty * item.unit_price)}</td>
              </tr>
            ))}

            {/* Total Row */}
            <tr className="bg-gray-200 font-bold">
              <td className="border p-2 text-center" colSpan={4}>Total / សរុប</td>
              <td className="border p-2 text-right">$ {formatNumber(cart_list.reduce((sum, item) => sum + item.cart_qty * item.unit_price, 0))}</td>
            </tr>
          </tbody>

        </table>
      </div>

      {/* Summary */}
      <div className="w-64 ml-auto space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>$ {formatNumber(objSummary.sub_total)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Qty:</span>
          <span>{objSummary.total_qty || 0} PCS</span>
        </div>
        {parseFloat(objSummary.save_discount) > 0 && (
          <div className="flex justify-between">
            <span>Discount:</span>
            <span>$ {formatNumber(objSummary.save_discount)}</span>
          </div>
        )}
        {parseFloat(objSummary.tax) > 0 && (
          <div className="flex justify-between">
            <span>Tax ({formatNumber(objSummary.tax)}%):</span>
            <span>$ {formatNumber(calculateTax())}</span>
          </div>
        )}
        <div className="flex justify-between font-bold pt-2 border-t">
          <span>Total:</span>
          <span>$ {formatNumber(objSummary.total)}</span>
        </div>
        {parseFloat(objSummary.total_paid) > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Paid Amount:</span>
            <span>$ {formatNumber(objSummary.total_paid)}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div>
          <p className="font-bold mb-2">អតិថិជន</p>
          <p>Customer:</p>


          <p className="mt-12 mb-4">ហត្ថលេខា</p>
          <p>Date: ....../....../.....</p>
        </div>
        <div className="text-right mt-8 mb-8">  {/* Add space above and below */}
          <p className="font-bold mb-2">គណនេយ្យករ</p>
          <p>Accountant:</p>

          {/* Add space for signature */}
          <p className="mt-12 mb-4">ហត្ថលេខា</p>
          <p>Date: {formatDate(objSummary.order_date)}</p>
        </div>

      </div>

      {/* Contact */}
      <div className="text-center mt-8">
        <p>ទំនាក់ទំនងផ្នែកបច្ចេកទេស: +855 67 733 335 / +855 76 5555 713</p>
      </div>
    </div>
  );
});

export default PrintInvoice;