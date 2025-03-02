// const { db, isArray, isEmpty, logError } = require("../util/helper");

// exports.report_Sale_Summary = async (req, res) => {
//   try { 

//     let {from_date,to_date,category_id,brand_id} = req.query
//     // console.log(brand_id)

//     const sql =
//     `
//   SELECT 
//     DATE_FORMAT(o.create_at, '%d/%m/%Y') AS order_date, 
//     SUM(od.total_qty) AS total_qty, 
//     SUM(od.total_amount) AS total_amount
//   FROM \`order\` o
//   INNER JOIN (
//       SELECT 
//           odl.order_id,
//           SUM(odl.qty) AS total_qty,
//           SUM(odl.total) AS total_amount
//       FROM order_detail odl
//       INNER JOIN product p ON odl.product_id = p.id
//      WHERE (:category_id IS NULL OR  p.category_id = :category_id)
//      AND (:brand_id IS NULL OR  p.brand = :brand_id)
//       GROUP BY odl.order_id
//   ) od ON o.id = od.order_id
//   WHERE 
//     o.create_at BETWEEN :from_date AND :to_date
//   GROUP BY DATE_FORMAT(o.create_at, '%d/%m/%Y');
// ` ;

//     const [list] = await db.query(sql,{
//       from_date,
//       to_date,
//       category_id,
//       brand_id

//     })


//     res.json({  
//       list,


//     });
//     // console.log(list)
//   } catch (error) {
//     logError("report.report_Sale_Summary", error, res);
//   }
// };


const { db, logError } = require("../util/helper");

exports.report_Sale_Summary = async (req, res) => {
  try {
    let { from_date, to_date, category_id, brand_id } = req.query;

    // Ensure that to_date includes the entire day
    to_date = new Date(to_date);
    to_date.setHours(23, 59, 59, 999);

    const sql =
      `
      SELECT 
        DATE_FORMAT(o.create_at, '%d/%m/%Y') AS order_date, 
        SUM(od.total_qty) AS total_qty, 
        SUM(od.total_amount) AS total_amount
      FROM \`order\` o
      INNER JOIN (
          SELECT 
              odl.order_id,
              SUM(odl.qty) AS total_qty,
              SUM(odl.total) AS total_amount
          FROM order_detail odl
          INNER JOIN product p ON odl.product_id = p.id
          WHERE (:category_id IS NULL OR p.category_id = :category_id)
          AND (:brand_id IS NULL OR p.brand = :brand_id)
          GROUP BY odl.order_id
      ) od ON o.id = od.order_id
      WHERE o.create_at BETWEEN :from_date AND :to_date
      GROUP BY DATE_FORMAT(o.create_at, '%d/%m/%Y');
    `;

    const [list] = await db.query(sql, {
      from_date,
      to_date,
      category_id,
      brand_id
    });

    res.json({ list });
  } catch (error) {
    logError("report.report_Sale_Summary", error, res);
  }
};
exports.report_Expense_Summary = async (req, res) => {
  try {
    let { from_date, to_date, expense_type_id } = req.query;

    // Ensure that to_date includes the entire day
    // console.log(from_date,to_date)
    to_date = new Date(to_date);
    to_date.setHours(23, 59, 59, 999);

    const sql = `
    SELECT 
        DATE_FORMAT(e.expense_date, '%d-%m-%Y') AS title,
        SUM(e.amount) AS total_amount
    FROM expense e
    WHERE DATE_FORMAT(e.expense_date, '%Y-%m-%d') BETWEEN :from_date AND :to_date
    AND (:expense_type_id IS NULL OR e.expense_type_id = :expense_type_id)
    GROUP BY e.expense_date;
`;


    const [list] = await db.query(sql, {
      from_date,
      to_date,
      expense_type_id

    });

    res.json({ list });
  } catch (error) {
    logError("report.report_expense_Summary", error, res);
  }
};


exports.report_Customer = async (req, res) => {
  try {
    let { from_date, to_date } = req.query;

    // Ensure that to_date includes the entire day
    // console.log(from_date,to_date)
    to_date = new Date(to_date);
    to_date.setHours(23, 59, 59, 999);

    const sql = `
   SELECT 
  DATE_FORMAT(cu.create_at, '%d-%m-%Y') AS title, -- Format date for readability
  COUNT(cu.id) AS total_amount
FROM customer cu
WHERE cu.create_at BETWEEN :from_date AND :to_date
GROUP BY DATE(cu.create_at) -- Group by date only
ORDER BY cu.create_at ASC; -- Sort in chronological order

`;


    const [list] = await db.query(sql, {
      from_date,
      to_date,


    });

    res.json({ list });
  } catch (error) {
    logError("report.Customer", error, res);
  }
};
exports.report_Purchase_Summary = async (req, res) => {
  try {
    let { from_date, to_date, supplier_id } = req.query;

    // Ensure that to_date includes the entire day
    // console.log(from_date,to_date,supplier_id)
    to_date = new Date(to_date);
    to_date.setHours(23, 59, 59, 999);
    const sql = `
    SELECT 
        DATE_FORMAT(pu.create_at, '%d-%m-%Y') AS title,
        SUM(pu.paid_amount) AS total_amount
    FROM purchase pu
    WHERE DATE_FORMAT(pu.create_at, '%Y-%m-%d') BETWEEN :from_date AND :to_date
    AND  (:supplier_id IS NULL OR pu.supplier_id = :supplier_id)
    GROUP BY pu.create_at;
`;


    const [list] = await db.query(sql, {
      from_date,
      to_date,
      supplier_id


    });

    res.json({ list });
  } catch (error) {
    logError("report.report_Purchase_Summary", error, res);
  }
};

exports.top_sale = async (req, res) => {
  try {




    const sql = `
    SELECT 
    p.id AS product_id,
    p.name AS product_name,
    c.name AS category_name, -- Added category name
    SUM(od.qty * od.price) AS total_sale_amount
FROM product p
JOIN order_detail od ON p.id = od.product_id
JOIN category c ON p.category_id = c.id -- Join category table
GROUP BY 
    p.id, p.name, c.name -- Include category_name in GROUP BY
ORDER BY 
    total_sale_amount DESC
LIMIT 10;

`;


    const [list] = await db.query(sql);

    res.json({ list });
  } catch (error) {
    logError("top_sale.getlist", error, res);
  }
};



