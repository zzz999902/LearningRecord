require('./models/relation');
// require('./spider/fetchBooks');
const adminServ = require('./services/adminService');
adminServ.getAdmincount().then((res) => {
  console.log(res);
});
