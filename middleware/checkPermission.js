const jwt = require("jsonwebtoken");
// const auth = (req, res, next) => {
//     console.log("Server Accessed");
//     const token = req.header("token");
//     if (!token) {
//         return res.status(401).json({ message: 'Access Denied' });
//     } else {
//         console.log("Server Accessed");
//         next();
//     }
// };

const auth = (req, res, next) => {
    next();
};

module.exports = auth;



/**

protected routes starts from here. if you want to 
access the endpoints of following route, you need 
to pass header "token".
for example in front end, for axios

axios.get('https://example.com/api/data', {
  headers: {
    'token': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  }); 

*/