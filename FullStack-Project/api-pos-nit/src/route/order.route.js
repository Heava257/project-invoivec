const { validate_token } = require("../controller/auth.controller");
const {
  getList,
  create,
  update,
  remove,
  getone,
} = require("../controller/order.controller");
module.exports = (app) => {
  app.get('/api/order', validate_token(),getList);
  app.get("/api/order_detail/:id", validate_token("order.getone"),getone ); 
  app.post("/api/order", validate_token("order.create","order"), create);
  app.put("/api/order", validate_token("order.update","order"), update);
  app.delete("/api/order", validate_token("order.remove","order"), remove);
};
