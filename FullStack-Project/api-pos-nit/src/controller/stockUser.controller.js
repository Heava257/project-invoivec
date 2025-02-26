const { db, isArray, isEmpty, logError } = require("../util/helper");



// exports.getList = async (req, res) => {
//   try {
//     const [list] = await db.query(`
//      SELECT 
//     us.id, 
//     us.user_id, 
//     us.create_by,  -- Assuming this field exists in your user_stock table
//     us.product_id, 
//     p.name AS product_name, 
//     us.qty, 
//     us.last_updated, 
//     us.last_updated, 
//     us.category_id, 
//     us.brand, 
//     p.unit_price,
//     p.discount,
//     p.unit,
//     p.barcode,  -- Added barcode
//     c.name AS category_name,
//     (us.qty * p.unit_price) AS total_price
// FROM user_stock us
// JOIN product p ON us.product_id = p.id
// JOIN category c ON us.category_id = c.id
// ORDER BY us.id DESC;

//     `);

//     res.json({
//       i_know_you_are_id: req.current_id || null, // Ensure it doesn't break if undefined
//       list: list,
//     });
//   } catch (error) {
//     logError("user_stock.getList", error, res);
//   }
// };

// exports.getList = async (req, res) => {
//   try {
//     const user_id = req.current_id; // Assuming `req.current_id` contains the logged-in user's ID

//     if (!user_id) {
//       return res.status(400).json({ error: "User ID is required" });
//     }

//     const [list] = await db.query(`
//       SELECT 
//         us.id, 
//         us.user_id, 
//         us.create_by,  
//         us.product_id, 
//         p.name AS product_name, 
//         us.qty, 
//         us.last_updated, 
//         us.category_id, 
//         us.brand, 
//         p.unit_price,
//         p.discount,
//         p.unit,
//         p.barcode,  
//         c.name AS category_name,
//         (us.qty * p.unit_price) AS total_price
//       FROM user_stock us
//       JOIN product p ON us.product_id = p.id
//       JOIN category c ON us.category_id = c.id
//       WHERE us.user_id = :user_id  -- Filter by the logged-in user's ID
//       ORDER BY us.id DESC;
//     `, { user_id });

//     res.json({
//       i_know_you_are_id: user_id, // Return the user ID for reference
//       list: list,
//     });
//   } catch (error) {
//     logError("user_stock.getList", error, res);
//   }
// };

exports.getList = async (req, res) => {
  try {
    const user_id = req.current_id; // Assuming this is securely set from authentication middleware

    if (!user_id) {
      return res.status(401).json({ error: "Unauthorized: User ID is required" });
    }

    const [list] = await db.query(
      `SELECT 
        us.id, 
        us.user_id, 
        us.create_by,  
        us.product_id, 
        p.name AS product_name, 
        us.qty, 
        us.last_updated, 
        us.category_id, 
        us.brand, 
        p.unit_price,
        p.discount,
        p.unit,
        p.barcode,  
        c.name AS category_name,
        (us.qty * p.unit_price) AS total_price
      FROM user_stock us
      JOIN product p ON us.product_id = p.id
      JOIN category c ON us.category_id = c.id
      WHERE us.user_id = ?  -- Use positional placeholder
      ORDER BY us.id DESC;`,
      [user_id] // Pass parameters as an array
    );

    res.json({
      message: "User stock retrieved successfully",
      user_id: user_id, // Useful for debugging
      list: list,
    });
  } catch (error) {
    logError("user_stock.getList", error, res);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.gettotal_due = async (req, res) => {
  try {
    const [list] = await db.query(`
      SELECT 
        o.id, 
        o.customer_id, 
        c.name AS customer_name,  -- Customer's name
        o.user_id, 
        u.name AS create_by,      -- User's name
        u.branch_name AS branch_name,  -- Branch name
        u.tel AS tel,  -- Branch phone number
        r.name AS province_name,      -- Role name from the 'role' table
        o.create_at AS order_date,    -- Order date (when the order was created)
        (o.total_amount - o.paid_amount) AS total_due
      FROM \`order\` o
      JOIN customer c ON o.customer_id = c.id  -- Join with the 'customer' table
      JOIN user u ON o.user_id = u.id          -- Join with the 'user' table
      JOIN role r ON u.role_id = r.id          -- Join with the 'role' table to get the province name
      WHERE (o.total_amount - o.paid_amount) > 0
      ORDER BY o.create_at DESC;  -- Fixed ORDER BY (using "o.id" instead of undefined "us.id")
    `);
    

    res.json({
      i_know_you_are_id: req.current_id || null, // Ensure it doesn't break if undefined
      list: list,
    });
  } catch (error) {
    logError("user_stock.getList", error, res);
  }
};




