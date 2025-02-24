const { logError, db } = require("../util/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../util/config");
const { json } = require("express");

exports.getList = async (req, res) => {
  try {
    let sql =
      " SELECT  " +
      " u.id, " +
      " u.name, " +
      " u.username, " +
      " u.create_by, " +
      " u.create_at, " +
      " u.address, " +
      " u.tel, " +
      " u.is_active, " +
      " r.name AS role_name " +
      " FROM user u " +
      " INNER JOIN role r ON u.role_id = r.id ";
    const [list] = await db.query(sql);
    const [role] = await db.query(
      "SELECT id as value, name as label FROM role"
    );
    res.json({
      list,
      role,
    });
  } catch (error) {
    logError("auth.getList", error, res);
  }
};
exports.update = async (req, res) => {
  try {
    // Check if a password is provided for update
    let password = req.body.password;
    
    // Only hash the password if it's being updated (if password exists)
    if (password) {
      password = bcrypt.hashSync(password, 10); // Hash the password
    }

    // Create the SQL query based on the presence of the password
    let sql = "UPDATE user SET name = :name, username = :username, role_id = :role_id, ";
    sql += password ? "password = :password, " : "";  // Only add password field if password exists
    sql += "is_active = :is_active, address = :address, create_by = :create_by, create_at = :create_at ";
    sql += "WHERE id = :id";
    
    // Prepare the query parameters
    const queryParams = { 
      ...req.body, 
      password: password || req.body.password // If no new password, retain the original password
    };
    
    // Execute the query
    const [data] = await db.query(sql, queryParams);
    
    // Send response back
    res.json({
      data: data,
      message: "Update success!",
      create_by: req.auth?.name,
    });
  } catch (error) {
    logError("customer.update", error, res);
  }
};



exports.register = async (req, res) => {
  try {
    // hash password
    let password = req.body.password;
    password = bcrypt.hashSync(password, 10); // 123456, "314098spofaspdofjpo2rlsjlfasdf"
    let sql =
      "INSERT INTO " +
      " user ( role_id, name, username, password, is_active,address,tel,province_name,province_code,branch_name,barcode, create_by ,create_at) VALUES " +
      " (:role_id,:name,:username,:password,:is_active,:address,:tel,:province_name,:province_code,:branch_name,:barcode,:create_by,:create_at); ";
    let data = await db.query(sql, {
      role_id: req.body.role_id,
      name: req.body.name,
      username: req.body.username,
      password: password,
      address: address,
      tel: tel,
      province_name: province_name,
      province_code: province_code,
      branch_name: branch_name,
      barcode: barcode,
      is_active: req.body.is_active,
      create_by: req.auth?.name,
      create_at: req.auth.create_at // current user that action this module
    });
    res.json({
      message: "Create new account success!",
      data: data,
    });
  } catch (error) {
    logError("auth.register", error, res);
  }
};
exports.remove = async (req,res) =>{
  try {
    var [data] = await db.query("DELETE FROM user WHERE id = :id", {
      id: req.body.id,
    });
    res.json({
      data: data,
      message: "Data delete success!",
    });
  } catch (error) {
    logError("user.remove", error, res);
  }
}
// a,b (123456)
// a : p1 => true
// b : p1 => true
exports.login = async (req, res) => {
  try {
    let { password, username } = req.body;
    // let sql = "SELECT * FROM user WHERE username=:username ";
    let sql =
      "SELECT " +
      " u.*," +
      " r.name as role_name" +
      " FROM user u " +
      " INNER JOIN role r ON u.role_id = r.id " +
      " WHERE u.username=:username ";

    let [data] = await db.query(sql, {
      username: username,
    });
    if (data.length == 0) {
      res.json({
        error: {
          username: "Username doesn't exist!",
        },
      });
    } else {
      let dbPass = data[0].password;
      let isCorrectPass = bcrypt.compareSync(password, dbPass); // true | false
      if (!isCorrectPass) {
        res.json({
          error: {
            password: "Password incorrect!",
          },
        });
      } else {
        delete data[0].password;
        let obj = {
          profile: data[0],
          permission: await getPermissionByUser(data[0].id),
        };
        res.json({
          message: "Login success",
          ...obj,
          access_token: await getAccessToken(obj),
        });
      }
    }
  } catch (error) {
    logError("auth.login", error, res);
  }
};

exports.profile = async (req, res) => {
  try {
    res.json({
      profile: req.profile,
    });
  } catch (error) {
    logError("auth.register", error, res);
  }
};

exports.validate_token = () => {
  // call in midleware in route (role route, user route, teacher route)
  return (req, res, next) => {
    var authorization = req.headers.authorization; // token from client
    var token_from_client = null;
    if (authorization != null && authorization != "") {
      token_from_client = authorization.split(" "); // authorization : "Bearer lkjsljrl;kjsiejr;lqjl;ksjdfakljs;ljl;r"
      token_from_client = token_from_client[1]; // get only access_token
    }
    if (token_from_client == null) {
      res.status(401).send({
        message: "Unauthorized",
      });
    } else {
      jwt.verify(
        token_from_client,
        config.config.token.access_token_key,
        (error, result) => {
          if (error) {
            res.status(401).send({
              message: "Unauthorized",
              error: error,
            });
          } else {
            req.current_id = result.data.profile.id;
            req.auth = result.data.profile; // write user property
            req.permision = result.data.permision; // write user property
            next(); // continue controller
          }
        }
      );
    }
  };
};

const getPermissionByUser =async (user_id) => {
  let sql =
  "   SELECT  "+
  " DISTINCT "+
  " p.id, "+
  " p.name, "+
  " p.group, "+
  " p.is_menu_web, "+
  " p.web_route_key "+
  " FROM permissions  p "+
  " INNER JOIN permission_roles pr ON p.id = pr.permission_id "+
  " INNER JOIN `role` r ON pr.role_id = r.id "+
  " INNER JOIN user_roles ur ON r.id = ur.role_id "+
  " WHERE ur.user_id = :user_id; "
// "   SELECT DISTINCT "+
// "   p.id, "+
// "   p.name, "+
// "   p.group, "+
// "   p.is_menu_web, "+
// "   p.web_route_key "+
// " FROM permissions p "+
// " INNER JOIN permission_roles pr ON p.id = pr.permission_id "+
// " WHERE pr.role_id = :role_id; "
 
const [permission] = await db.query(sql,{user_id})
return permission;


}

const getAccessToken = async (paramData) => {
  const acess_token = await jwt.sign(
    { data: paramData },
    config.config.token.access_token_key
    // {
    //   expiresIn: "1d",
    // }
  );
  return acess_token;
};

// getpermission menu
// getpermission role
