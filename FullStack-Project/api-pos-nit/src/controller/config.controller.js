const { db, isArray, isEmpty, logError } = require("../util/helper");

exports.getList = async (req, res) => {
  try {
    const [category] = await db.query(
      "SELECT id AS value, name AS label, description FROM category"
    );
    
  
    
    
    const [expense] = await db.query(
      "select id as value, name as label from expense"
    );
    const [user] = await db.query(
      `SELECT 
          CONCAT(name, ' (U', id, ') ', address) AS label, 
          id AS value 
       FROM user`
    );
    
    const [role] = await db.query("select id,name,code from role");
    const [supplier] = await db.query("select id,name,code from supplier");
    // const [expense] = await db.query("select id, name from expense");
    const purchase_status = [
      {
        lebel: "Pending",
        value: "Pending",
      },
      {
        lebel: "Approved",
        value: "Approved",
      },
      {
        lebel: "Shiped",
        value: "Shiped",
      },
      {
        lebel: "Received",
        value: "Received",
      },
      {
        lebel: "Issues",
        value: "Issues",
      },
    ];
    const company_name = [
      { label: "Petronas Cambodia", value: "petronas-cambodia", country: "Cambodia" },
      { label: "KAMPUCHEA TELA LIMITED", value: "kampuchea-tela-ltd", country: "Cambodia" },
      { label: "SOK KONG IMP-EXP CO., LTD", value: "sok-kong-imp-exp", country: "Cambodia" },
      { label: "LHR ASEAN INVESTMENT CO., LTD", value: "lhr-asean-investment", country: "Cambodia" },
      { label: "SAVIMEX IMP-EXP CO., LTD", value: "savimex-imp-exp", country: "Cambodia" },
      { label: "LIM LONG CO., LTD", value: "lim-long", country: "Cambodia" },
      { label: "PAPA PETROLEUM CO., LTD", value: "papa-petroleum", country: "Cambodia" },
      { label: "THARY TRADE IMP-EXP CO., LTD", value: "thary-trade-imp-exp", country: "Cambodia" },
      { label: "BRIGHT VICTORY MEKONG PETROLEUM IMP-EXP CO., LTD", value: "bright-victory-mekong", country: "Cambodia" },
      { label: "MITTAPHEAP PERTA PETROLEUM LIMITED", value: "mittapheap-perta-petroleum", country: "Cambodia" },
      { label: "CHEVRON (CAMBODIA) LIMITED", value: "chevron-cambodia", country: "Cambodia" },
      { label: "PTT (CAMBODIA) LTD", value: "ptt-cambodia", country: "Cambodia" },
      { label: "TOTAL CAMBODGE", value: "total-cambodge", country: "Cambodia" },
      { label: "AMERICAN LUBES CO., LTD", value: "american-lubes", country: "Cambodia" },
      { label: "PETRONAS CAMBODIA CO., LTD", value: "petronas-cambodia-ltd", country: "Cambodia" }
    ];
    
    const [expense_type] = await db.query("SELECT * FROM expense_type");
    const brand = [
      
        { label: "Petronas Cambodia", value: "petronas-cambodia", country: "Cambodia" },
        { label: "Petronas Malaysia", value: "petronas-malaysia", country: "Malaysia" }
      ];
      const branch_name = [
        { label: "Phnom Penh - ភ្នំពេញ", value: "PP" },
        { label: "Siem Reap - សៀមរាប", value: "SR" },
        { label: "Battambang - បាត់ដំបង", value: "BB" },
        { label: "Sihanoukville - សីហនុ", value: "SHV" },
        { label: "Kampot - កំពត", value: "KP" },
        { label: "Koh Kong - កោះកុង", value: "KK" },
        { label: "Takeo - តាកែវ", value: "TK" },
        { label: "Preah Vihear - ព្រះវិហារ", value: "PV" },
        { label: "Kandal - កណ្ដាល", value: "KD" },
        { label: "Kampong Cham - កំពង់ចាម", value: "KC" },
        { label: "Kampong Thom - កំពង់ធំ", value: "KT" },
        { label: "Kratie - ក្រចេះ", value: "KR" },
        { label: "Mondulkiri - មណ្ឌលគីរី", value: "MK" },
        { label: "Ratanakiri - រតនគិរី", value: "RK" },
        { label: "Pursat - ពោធិ៍សាត់", value: "PS" },
        { label: "Svay Rieng - ស្វាយរៀង", value: "SR" },
        { label: "Prey Veng - ព្រៃវែង", value: "PV" },
        { label: "Stung Treng - ស្ទឹងត្រង់", value: "ST" },
        { label: "Tboung Khmum - ត្បូងខ្មុំ", value: "TKM" },
        { label: "Pailin - ប៉ៃលិន", value: "PL" },
        { label: "Banteay Meanchey - បន្ទាយមានជ័យ", value: "BM" },
        { label: "Koh Kong - កោះកុង", value: "KK" },
    
      ];
      
      
    //   { label: "Dell", value: "Dell", country: "USA" },
    //   { label: "HP", value: "HP", country: "USA" },
    //   { label: "Lenovo", value: "Lenovo", country: "China" },
    //   { label: "Asus", value: "Asus", country: "Taiwan" },
    //   { label: "Acer", value: "Acer", country: "Taiwan" },
    //   { label: "Microsoft", value: "Microsoft", country: "USA" },
    //   { label: "Panasonic", value: "Panasonic", country: "USA" },
    // ];
    const unit = [
      { label: "L", value: "lite" },
      { label: "T", value: "ton"},
     
     
    ];
    // const [customer_name] = await db.query(
    //   "SELECT name FROM customer WHERE id = ?",
      
    // );

    const [customer] = await db.query(
      "select id as value, concat(name,'-',tel) as label, name, tel, email from customer"
    );

    res.json({
      category,
      role,
      supplier,
      purchase_status,
      brand,
      expense_type,
      customer,
      expense,
      unit,
      company_name,
      user,
      branch_name
      // customer_name
    });
  } catch (error) {
    logError("config.getList", error, res);
  }
};
