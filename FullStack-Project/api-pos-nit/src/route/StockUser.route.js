const { validate_token } = require("../controller/auth.controller");
const {
  getList,
  gettotal_due,
 
} = require("../controller/stockUser.controller");
module.exports = (app) => {
  app.get("/api/stockUser", validate_token(), getList);
  app.get("/api/gettotal_due", validate_token(), gettotal_due);

};
