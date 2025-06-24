export function register(req, res, next){
  res.json({
    msg : "Register Controller",
    body: req.body
  
  })
}

export const login = (req, res, next) => {
  res.json({
    msg: "Login Controller",
    body: req.body
  })
}

export const getMe = (req, res, next) => {
  res.json({
    msg:"Get me Controller"
  })
}

// export function getMe() {
//   return (req, res) => {
//     res.json({ message: "me" })
//   }
// }