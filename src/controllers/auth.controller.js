import prisma from "../config/prisma.config.js";
import checkIdentity from "../utills/check-identity.util.js";
import createErrorUtil from "../utills/create-error.util.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export async function register(req, res, next) {
  try {
    const { identity, firstName, lastName, password, confirmPassword } =
      req.body;
    //validation
    if (
      !(
        identity.trim() &&
        firstName.trim() &&
        lastName.trim() &&
        password.trim() &&
        confirmPassword.trim()
      )
    ) {
      createErrorUtil(400, "Please fill all data");
    }
    if (password !== confirmPassword) {
      createErrorUtil(400, "Please Check confirm password");
    }
    // identity เป็น email หรือ mobile phone number : checkIdentity(identity) => String : "email" | "mobile"
    const identityKey = checkIdentity(identity);

    // หา User
    const foundUser = await prisma.user.findUnique({
      where: { [identityKey]: identity },
    });
    if (foundUser) {
      createErrorUtil(409, `Already have this User: ${identity}`);
    }
    const newUser = {
      [identityKey]: identity,
      password: await bcrypt.hash(password, 10),
      firstName: firstName,
      lastName: lastName,
    };

    // const result = await prisma.user.create({ data: newUser });

    res.json({
      msg: "Register Controller",
      result: newUser,
    });
  } catch (err) {
    next(err);
  }
}

export async function registerYup(req, res, next) {
  try {
    const {email, mobile, firstName, lastName, password} = req.body
    console.log(req.body)
    if (email) {
      let foundUserEmail = await prisma.user.findUnique({ where: {email:email}})
      if (foundUserEmail) createErrorUtil(409, `Email : ${email} already register`)
    }
    if (mobile) {
      let foundUserMobile = await prisma.user.findUnique({ where: {mobile:mobile}})
      if (foundUserMobile) createErrorUtil(409, `Mobile : ${mobile} already register`)
    }
  const newUser ={
    email,
    mobile,
    password: await bcrypt.hash(password, 10),
    firstName,
    lastName
  }
  const result = await prisma.user.create({data: newUser})


    res.json({msg: "Register successful", result})
  } catch(err) {
    next(err)
  }
}

export const login = async(req, res, next) => {
  const {identity, password, email, mobile} = req.body
  const identityKey = email? 'email' : 'mobile'

  const foundUser = await prisma.user.findUnique({
    where: {[identityKey]: identity}
  })
  if(!foundUser) {
    createErrorUtil(401, "Email หรือ Mobile Phone ไม่ถูกต้อง")
  }
  let pwOk = await bcrypt.compare(password, foundUser.password)
  if(!pwOk) {
    createErrorUtil(401, "Password ไม่ถูกต้อง")
  }
  //create token
  const payload = {id: foundUser.id}
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "15d"
  })
  res.json({
    msg: "Login Successful",
    token: token ,
  });
};

export const getMe = async (req, res, next) => {
  let numUser = await prisma.user.count();
  console.log(numUser);
  createErrorUtil(403, "Block");
  res.json({
    msg: "Get me Controller",
    numUser,
  });
};

// export function getMe() {
//   return (req, res) => {
//     res.json({ message: "me" })
//   }
// }
