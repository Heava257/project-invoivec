
// import React from "react";
// import logo from "../../assets/petronas.png";
// import "./fonts.css"; // Import the CSS file
// import { getProfile } from "../../store/profile.store";

// const PrintInvoice = React.forwardRef((props, ref) => {
//     const profile = getProfile();
  
//   const { objSummary = {
//     sub_total: 0,
//     total_qty: 0,
//     save_discount: 0,
//     tax: 10,
//     total: 0,
//     total_paid: 0,
//     customer_name: null,
//     user_id: null,
//     payment_method: null,
//     remark: null,
//     order_no: null,
//     order_date: null,
//   }, cart_list = [] } = props;

//   const formatNumber = (value) => {
//     const number = parseFloat(value) || 0;
//     return number.toFixed(2);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const calculateTax = () => {
//     const subtotal = parseFloat(objSummary.sub_total) || 0;
//     const taxRate = parseFloat(objSummary.tax) || 0;
//     return (subtotal * taxRate / 100);
//   };

//   return (
//     <div ref={ref} className="p-8 max-w-4xl mx-auto">
//       {/* Header */}
//       <div className="flex justify-between mb-8 bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-lg shadow-lg">
//         <div className="flex items-center gap-1"> {/* Reduced space further */}
//           <img
//             src={logo}
//             alt="Company Logo"
//             className="w-50 h-12 object-contain filter brightness-0 invert"
//           />




//           <h1 className="text-2xl font-bold text-white font-sans -ml-1">PETRONAS CAMBODIA CO.,LTD</h1>
//         </div>

//         <div className="text-right">
//           <h2 className="text-2xl font-bold text-white mb-2 khmer-text">វិក្កយបត្រ</h2>
//           <h2 className="text-xl text-white khmer-text" >INVOICE</h2>
//         </div>
//       </div>

//       {/* Invoice Details */}
//       <div className="grid grid-cols-2 gap-4 mb-8">
//         <div>
//           <p className="khmer-text">លេខទូរស័ព្ទ: {profile?.tel || 'N/A'}</p>
//           <p className="khmer-text">ទីតាំង: {profile?.branch_name || 'N/A'}</p>
//           <p className="khmer-text">អាសយដ្ឋាន: {profile?.address  || 'N/A'}</p>
//           {/* <p className="khmer-text">គោលដៅ: {objSummary?.user_address  || 'N/A'}</p>
//            */}
//           <p className="khmer-text">គោលដៅ: {objSummary.user_name || 'N/A'}</p>

//         </div>

//         <div className="text-right">
//           <p className="khmer-text">លេខវិក្កយបត្រ: {objSummary.order_no}</p>
//           <p className="khmer-text">ថ្ងៃចេញវិក្កយបត្រ: {formatDate(objSummary.order_date)}</p>
//           <p className="khmer-text">Seller Name: {objSummary.customer_name || 'N/A'}</p>
//           <p className="khmer-text">Payment Method: {objSummary.payment_method || 'N/A'}</p>
//           {objSummary.remark && <p>Remark: {objSummary.remark}</p>}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="w-full mb-8 overflow-x-auto">
//   <table className="w-full border-collapse table-auto">
//   <thead>
//   <tr className="bg-gray-100">
//     <th className="border px-3 py-2 text-center w-1/12 min-w-[50px]">
//       <div className="khmer-text">លេខ</div>
//       <div className="english-text">No.</div>
//     </th>
//     <th className="border px-3 py-2 text-center w-auto min-w-[150px]">
//       <div className="khmer-text">ការពិពណ៌នា</div>
//       <div className="english-text">Description</div>
//     </th>
//     <th className="border px-3 py-2 text-center w-auto min-w-[120px]">
//       <div className="khmer-text">ប្រភេទ</div>
//       <div className="english-text">Category</div>
//     </th>
//     <th className="border px-3 py-2 text-center w-auto min-w-[100px]">
//       <div className="khmer-text">បរិមាណ</div>
//       <div className="english-text">Quantity</div>
//     </th>
//     <th className="border px-3 py-2 text-center w-auto min-w-[120px]">
//       <div className="khmer-text">តម្លៃ​រាយ</div>
//       <div className="english-text">Unit Price</div>
//     </th>
//     <th className="border px-3 py-2 text-center w-auto min-w-[120px]">
//       <div className="khmer-text">បញ្ចុះតម្លៃ</div>
//       <div className="english-text">Discount</div>
//     </th>
//     <th className="border px-3 py-2 text-center w-auto min-w-[120px]">
//       <div className="khmer-text">តម្លៃ​សរុប</div>
//       <div className="english-text">Amount</div>
//     </th>
//   </tr>
// </thead>





//           {/* <tbody>
//             {cart_list.map((item, index) => (
//               <tr key={index}>
//                 <td className="border p-2">{index + 1}</td>
//                 <td className="border p-2">{item.name}</td>
//                 <td className="border p-2 text-center">{item.cart_qty}</td>
//                 <td className="border p-2 text-right">$ {formatNumber(item.unit_price)}</td>
//                 <td className="border p-2 text-right">$ {formatNumber(item.cart_qty * item.unit_price)}</td>
//               </tr>
//             ))}
//           </tbody> */}
//           <tbody>
//             {cart_list.map((item, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="border p-2 text-center khmer-text">{index + 1}</td>
//                 <td className="border p-2 khmer-text" >{item.name} <br /></td>
//                 <td className="border p-2 khmer-text" >{item.category_name} <br /></td>
//                 <td className="border p-2 text-center khmer-text">{item.cart_qty} <span className="text-gray-500 text-sm">{item.unit}</span></td>
//                 <td className="border p-2 text-right khmer-text">$ {formatNumber(item.unit_price)}</td>
//                 <td className="border p-2 text-right khmer-text">$ {formatNumber(item.save_discount)}</td>
//                 <td className="border p-2 text-right font-bold khmer-text">$ {formatNumber(item.cart_qty * item.unit_price)}</td>
//               </tr>
//             ))}

//             {/* Total Row */}
//             <tr className="bg-gray-200 font-bold">
//               <td className="border p-2 text-center khmer-text" colSpan={4}>Total / សរុប</td>
//               <td className="border p-2 text-right khmer-text">$ {formatNumber(cart_list.reduce((sum, item) => sum + item.cart_qty * item.unit_price, 0))}</td>
//             </tr>
//           </tbody>

//         </table>
//       </div>

//       {/* Summary */}
//      <div className="w-64 ml-auto space-y-2">
//   {/** Two-column layout using grid */}
//   <div className="grid grid-cols-2 gap-2 khmer-text">
//     <span>Subtotal:</span>
//     <span className="text-right">$ {formatNumber(objSummary.sub_total)}</span>

//     <span>Total Qty:</span>
//     <span className="text-right">{objSummary.total_qty || 0} L</span>

//     {parseFloat(objSummary.save_discount) > 0 && (
//       <>
//         <span>Save Discount:</span>
//         <span className="text-right">$ {formatNumber(objSummary.save_discount)}</span>
//       </>
//     )}

//     {parseFloat(objSummary.tax) > 0 && (
//       <>
//         <span>Tax ({formatNumber(objSummary.tax)}%):</span>
//         <span className="text-right">$ {formatNumber(calculateTax())}</span>
//       </>
//     )}
//   </div>

//   {/** Total Section (Bold & Border) */}
//   <div className="grid grid-cols-2 gap-2 font-bold pt-2 border-t khmer-text">
//     <span>Total:</span>
//     <span className="text-right">$ {formatNumber(objSummary.total)}</span>
//   </div>

//   {parseFloat(objSummary.total_paid) > 0 && (
//     <div className="grid grid-cols-2 gap-2 text-green-600 khmer-text">
//       <span>Paid Amount:</span>
//       <span className="text-right">$ {formatNumber(objSummary.total_paid)}</span>
//     </div>
//   )}
// </div>


//       {/* Footer */}
//       <div className="grid grid-cols-2 gap-4 mt-8">
//         <div className="mt-20 mb-10">  {/* Increase space above and below */}
//           <p className="font-bold mb-4 khmer-text">អតិថិជន</p>  {/* More space below this text */}
//           <p className="mb-8 khmer-text">Customer:</p>  {/* Add space below */}

//           {/* Space for signature */}
//           <p className="mt-24 mb-6 khmer-text">ហត្ថលេខា</p>  {/* Increased space for signature */}
//           <p className="mt-4 khmer-text">Date: ....../....../.....</p>
//         </div>

//         <div className="text-right mt-20 mb-10 khmer-text">  {/* Increase space above and below */}
//           <p className="font-bold mb-4 khmer-text">គណនេយ្យករ</p>  {/* More space under this text */}
//           <p className="mb-8 khmer-text">Accountant:</p>  {/* Add space below */}

//           {/* Space for signature */}
//           <p className="mt-24 mb-6 khmer-text">ហត្ថលេខា</p>  {/* Increased space for signature */}
//           <p>Date: {formatDate(objSummary.order_date)}</p>
//         </div>


//       </div>

//       {/* Contact */}
//       <div className="text-center mt-8 khmer-text">
//         <p>ទំនាក់ទំនងផ្នែកបច្ចេកទេស: +855 67 733 335 / +855 76 5555 713</p>
//       </div>
//     </div>
//   );
// });

// export default PrintInvoice;




import React from "react";
import logo from "../../assets/CAMPTN.png";
import "./fonts.css";
import { getProfile } from "../../store/profile.store";
const PrintInvoice = React.forwardRef((props, ref) => {
  const profile = getProfile();
  const { 
    objSummary = {
      sub_total: 0,
      total_qty: 0,
      save_discount: 0,
      tax: 10,
      total: 0,
      total_paid: 0,
      customer_id: null,
      user_id: null,
      payment_method: null,
      remark: null,
      order_no: null,
      order_date: null,
    }, 
    cart_list = [] 
  } = props;
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
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-2">
       {/* <div>
       <span className="text-xl font-bold font-sans">PETRONAS</span>  <br />
       <span className="text-sm px-11"> CAMBODIA</span>
       </div> */}
       <img src={logo} alt="Company Logo" className="w-40 h-40 object-contain" />

      </div>
      <div className="text-center flex-1">
        <h2 className="text-2xl font-bold khmer-text">វិក្កយបត្រ</h2>
        <h2 className="text-xl khmer-text">INVOICE</h2>
      </div>
      <div className="w-16 h-16"></div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div>
        <p className="khmer-text">ឈ្មោះអតិថិជន: {objSummary?.customer_name || 'N/A'}</p>
        <p className="khmer-text">អាសយដ្ឋាន: {profile?.address || 'N/A'}</p>
        <p className="khmer-text">លេខទូរស័ព្ទ: {profile?.tel || 'N/A'}</p>
        <p className="khmer-text">គោលដៅ: {objSummary.user_name || 'N/A'}</p>
      </div>
      <div className="text-right">
        <p className="khmer-text">លេខវិក្កយបត្រ: {objSummary.order_no}</p>
        <p className="khmer-text">ថ្ងៃបញ្ជាទិញ: {formatDate(objSummary.order_date)}</p>
        <p className="khmer-text">ថ្ងៃប្រគល់ទំនិញ:....../....../.....</p>
        <p className="khmer-text">លេខបញ្ជាទិញ:...................</p>
        <p className="khmer-text">លេខបណ្ណបញ្ចេញទំនិញ:...................</p>
      </div>
    </div>
    <div className="w-full mb-8 overflow-x-auto">
      <table  className="w-full border-collapse  border-2 border-black">
        <thead className="border-2 border-black text-black">
          <tr >
            <th className="border-2  border-black p-2 w-1/12 text-left khmer-text">No / លេខ</th>
            <th className="border-2  border-black p-2 w-5/12 text-left khmer-text">Description / ការពិពណ៌នា</th>
            <th className="border-2  border-black p-2 w-2/12 text-center khmer-text">Quantity / បរិមាណ</th>
            <th className="border-2  border-black p-2 w-2/12 text-right khmer-text">Unit Price / តម្លៃរាយ</th>
            <th className="border-2  border-black p-2 w-2/12 text-right khmer-text">Amount / តម្លៃសរុប</th>
          </tr>
        </thead>
        <tbody className="border-2 border-black" >
          {cart_list.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border-2  border-black p-2 text-center khmer-text">{index + 1}</td>
              <td className="border-2  border-black p-2 khmer-text">{item.name}</td>
              <td className="border-2  border-black p-2 text-center khmer-text">
                {item.cart_qty} <span className=" text-sm">{item.unit}</span>
              </td>
              <td className="border-2  border-black p-2 text-right khmer-text">$ {formatNumber(item.unit_price)}</td>
              <td className="border-2  border-black p-2 text-right font-bold khmer-text">
                
              $ {formatNumber(item.cart_qty * item.unit_price)}
              </td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className="border-2  border-black  p-2 text-right khmer-text" colSpan={4}>Total / សរុប</td>
            <td className="border-2  border-black  p-2 text-right khmer-text">
              $ {formatNumber(cart_list.reduce((sum, item) => sum + item.cart_qty * item.unit_price, 0))}
            </td>
          </tr>
          <tr>
            <td className="border-0 border-black p-2 text-center khmer-text" colSpan={5}>
              ទំនិញត្រូវបានទទួលនៅក្នុងលក្ខខណ្ឌល្អ /{' '}
              <span className="italic">Product Received in Good Order</span>
            </td>
          </tr>
          <tr>
            <td className=" text-center khmer-text" colSpan={5}>
            <div className="grid grid-cols-2   text-center khmer-text  gap-4  ">
      <div className="mt-20 mb-10">
        <p className="font-bold mb-4 khmer-text">អតិថិជន</p>
        <p className="mb-8 khmer-text">Customer:</p>
        <p className="mt-32 mb-6 khmer-text">ហត្ថលេខា</p>
        <p className="mt-4 khmer-text">Date: ....../....../.....</p>
      </div>
      <div className="text-right mt-20 mb-10 khmer-text px-32">
        <p className="font-bold mb-4 khmer-text">គណនេយ្យករ</p>
        <p className="mb-8 khmer-text">Accountant:</p>
        <p className="mt-32 mb-6 khmer-text">ហត្ថលេខា</p>
        <p className="khmer-text">Date: {formatDate(objSummary.order_date)}</p>
      </div>
           </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="text-center  khmer-text">
      <p>ទំនាក់ទំនងផ្នែកបច្ចេកទេស: +855 67 733 335 / +855 76 5555 713</p>
    </div>
  </div>
  );
});
export default PrintInvoice;