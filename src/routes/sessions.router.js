import { Router } from "express";
import { usersManager } from "../DAL/dao/managers/usersManager.js";
import { hashData, compareData, generateToken } from "../utils.js";
import passport from "passport";
import UsersResponse from "../DAL/dtos/user-response.dto.js";

const router = Router();

/* router.post("/signup", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  if (!first_name || !last_name || !email || !age|| !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const createdUser = await usersManager.createOne(req.body);
    res.status(200).json({ message: "User created", user: createdUser });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await usersManager.findByEmail(email);
    if (!user) {
      return res.redirect("/signup");
    }
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password is not valid" });
    }
    const sessionInfo =
      email === "adminCoder@coder.com" && password === "adminCod3r123"
        ? { email, first_name: user.first_name, isAdmin: true }
        : { email, first_name: user.first_name, isAdmin: false };
    req.session.user = sessionInfo;
    res.redirect("/profile");
  } catch (error) {
    res.status(500).json({ error });
  }
}); */

//PASSPORT LOCAL

router.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "/profile",
    failureRedirect: "/error",
  })
);

router.post("/login",passport.authenticate("login",{failureMessage: true,failureRedirect: "/error",}),(req,res)=>{
    const token = generateToken(req.user);
    res
    .cookie("token",token, {maxAge: 300000, httpOnly: true})
    return res.redirect("/api/sessions/current")
  });


  
  router.get('/current', passport.authenticate('jwt', {session: false}), async(req, res) => {
    const userDTO = new UsersResponse(req.user);
    res.status(200).json({message: 'User logged', user: userDTO})  
  })


router.get("/signout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// SIGNUP - LOGIN - PASSPORT GITHUB

router.get(
  "/auth/github",
  passport.authenticate("github")
);

router.get("/callback", passport.authenticate("github"), (req, res) => {
  res.redirect("/profile");
});


export default router;