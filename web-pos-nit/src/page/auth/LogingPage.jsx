// import React, { useState } from "react";
// import { Form, Button, message, Input, Space } from "antd";
// import { request } from "../../util/helper";
// import { setAcccessToken, setPermission, setProfile } from "../../store/profile.store";
// import { useNavigate } from "react-router-dom";
// import login_p1 from "../../assets/login.png";  // Ensure the correct image path

// function LogingPage() {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [isRegistering, setIsRegistering] = useState(false);  // Manage toggle between Login and Register forms
//   const navigate = useNavigate();

//   const onLogin = async (item) => {
//     setLoading(true); // Show loading spinner
//     const param = {
//       username: item.username,
//       password: item.password,
//     };

//     try {
//       const res = await request("auth/login", "post", param);
//       if (res && !res.error) {
//         setAcccessToken(res.access_token);
//         setProfile(JSON.stringify(res.profile));
//         setPermission(JSON.stringify(res.permission));
//         navigate("/"); // Navigate to home page on successful login
//         message.success("Login successful!");
//       } else {
//         message.error("Login failed! Please check your username and password.");
//       }
//     } catch (error) {
//       message.error("An error occurred. Please try again later.");
//     } finally {
//       setLoading(false); // Hide loading spinner
//     }
//   };

//   const onRegister = async (item) => {
//     setLoading(true); // Show loading spinner
//     const param = {
//       username: item.username,
//       password: item.password,
//       email: item.email, // Add additional fields for registration as needed
//     };

//     try {
//       const res = await request("auth/register", "post", param); // Replace with your registration API endpoint
//       if (res && !res.error) {
//         message.success("Registration successful! You can now log in.");
//         setIsRegistering(false); // Switch back to login form
//       } else {
//         message.error("Registration failed! Please try again.");
//       }
//     } catch (error) {
//       message.error("An error occurred during registration. Please try again later.");
//     } finally {
//       setLoading(false); // Hide loading spinner
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh", // Take full height of the viewport
//         backgroundImage: `url(${login_p1})`, // Background image with the correct path
//         backgroundSize: "cover", // Ensures the image covers the entire screen
//         backgroundPosition: "center", // Centers the background image
//         backgroundRepeat: "no-repeat ", // Prevents the image from repeating
//       }}
//     >
//       <div
//         style={{
//           maxWidth: 400,
//           margin: "0 auto",
//           padding: 20,
//           backgroundColor: "rgba(255, 255, 255, 0.5)", // Adds a slight background color to form
//           borderRadius: "8px", // Adds rounded corners
//         }}
//       >
//         <h1 style={{ textAlign: "center", color: "#333" }}>
//           {isRegistering ? "Register" : "Login"}
//         </h1>

//         {/* Conditional form rendering */}
//         <Form layout="vertical" form={form} onFinish={isRegistering ? onRegister : onLogin}>
//           {isRegistering && (
//             <Form.Item
//               name="email"
//               label="Email"
//               rules={[{ required: true, message: "Please enter your email!" }]}
//               required={false} 
//             >
//               <Input placeholder="Email" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} />
//             </Form.Item>
//           )}

//           <Form.Item
//             name="username"
//             label="Username"
//             rules={[{ required: true, message: "Please enter your username!" }]}
//             required={false} 
//           >
//             <Input placeholder="Username" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} />
//           </Form.Item>
//           <Form.Item
//             name="password"
//             label="Password"
//             rules={[{ required: true, message: "Please enter your password!" }]}
//             required={false} 
//           >
//             <Input.Password placeholder="Password" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} />
//           </Form.Item>
          
//           <Form.Item>
//             <Space style={{ width: "100%" }}>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 block
//                 loading={loading} // Show loading state for the button
//               >
//                 {isRegistering ? "Register" : "Login"}
//               </Button>
//             </Space>
//           </Form.Item>
//         </Form>

//         {/* Switch between Login and Register forms */}
//         {/* <div style={{ textAlign: "center" }}>
//           {isRegistering ? (
//             <span>
//               Already have an account?{" "}
//               <a
//                 onClick={() => setIsRegistering(false)} // Switch to login form
//                 style={{ color: "#1890ff" }}
//               >
//                 Login here
//               </a>
//             </span>
//           ) : (
//             <span>
//               Don't have an account?{" "}
//               <a
//                 onClick={() => setIsRegistering(true)} // Switch to register form
//                 style={{ color: "#1890ff" }}
//               >
//                 Register here
//               </a>
//             </span>
//           )}
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default LogingPage;






import React, { useState } from "react";
import { Form, Button, message, Input, Space } from "antd";
import { request } from "../../util/helper";
import { setAcccessToken, setPermission, setProfile } from "../../store/profile.store";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onLogin = async (item) => {
    setLoading(true);
    const param = { username: item.username, password: item.password };

    try {
      const res = await request("auth/login", "post", param);
      if (res && !res.error) {
        setAcccessToken(res.access_token);
        setProfile(JSON.stringify(res.profile));
        setPermission(JSON.stringify(res.permission));
        if (res.profile?.user_id) {
          localStorage.setItem("user_id", res.profile.user_id);
        }
        navigate("/");
        message.success("Login successful!");
      } else {
        message.error("Login failed! Please check your username and password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex justify-center mb-4">
          <img src="https://i.pinimg.com/736x/82/30/de/8230deba7a5660a77d80a830eb20377a.jpg" alt="Logo" className=" img_logo h-20" />
        </div>
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
        <Form layout="vertical" form={form} onFinish={onLogin}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input className="rounded-lg" placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password className="rounded-lg" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading} className="rounded-lg">
              Continue
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;


// import React, { useState } from "react";
// import { Form, Button, message, Input, Space } from "antd";
// import { request } from "../../util/helper";
// import { setAcccessToken, setPermission, setProfile } from "../../store/profile.store";
// import { useNavigate } from "react-router-dom";
// import login_p1 from "../../assets/login.png"; // Ensure the correct image path

// function LoginPage() {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [isRegistering, setIsRegistering] = useState(false); // Manage toggle between Login and Register forms
//   const navigate = useNavigate();

//   const onLogin = async (item) => {
//     setLoading(true); // Show loading spinner
//     const param = {
//       username: item.username,
//       password: item.password,
//     };

//     try {
//       const res = await request("auth/login", "post", param);
//       if (res && !res.error) {
//         // Store access token, profile, and permissions
//         setAcccessToken(res.access_token);
//         setProfile(JSON.stringify(res.profile));
//         setPermission(JSON.stringify(res.permission));

//         // Store user_id in localStorage
//         if (res.profile?.user_id) {
//           localStorage.setItem("user_id", res.profile.user_id);
//           console.log("User ID stored:", res.profile.user_id); // Debugging
//         }

//         navigate("/"); // Navigate to home page on successful login
//         message.success("Login successful!");
//       } else {
//         message.error("Login failed! Please check your username and password.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       message.error("An error occurred. Please try again later.");
//     } finally {
//       setLoading(false); // Hide loading spinner
//     }
//   };

//   return (
//     <div className="login-container">
//       <img src={login_p1} alt="Login" className="login-image" />
//       <Form
//         form={form}
//         onFinish={onLogin}
//         layout="vertical"
//         initialValues={{ remember: true }}
//       >
//         <Form.Item
//           name="username"
//           label="Username"
//           rules={[{ required: true, message: "Please input your username!" }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="password"
//           label="Password"
//           rules={[{ required: true, message: "Please input your password!" }]}
//         >
//           <Input.Password />
//         </Form.Item>

//         <Form.Item>
//           <Space direction="vertical" style={{ width: "100%" }}>
//             <Button type="primary" htmlType="submit" loading={loading}>
//               Log In
//             </Button>
//           </Space>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }

// export default LoginPage;

