module.exports = () => (req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Replace with your Angular app's origin
    res.setHeader('Access-Control-Allow-Origin', '*'); // Replace with your Angular app's origin
    res.setHeader('Access-Control-Allow-Methods', 'HEAD, OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies)
  
    next();
  };
  