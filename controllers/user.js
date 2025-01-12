const User = require("../models/user");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async (req,res,next)=>{
    try{
        let {username,email,password} = req.body;
        const newuser = new User({email,username});
        const registeredUser= await User.register(newuser,password);
        
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","welcome to wondarlust");
            res.redirect("/listings"); 
        });
        req.flash("success","user registerd succesfully");
        // res.redirect("/listings");
    }catch(e){
       req.flash("error",e.message);
       res.redirect("/signup");
    }
    
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs")
};

module.exports.Login = async (req,res)=>{
    req.flash("success","welcome to wondarlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
     res.redirect(redirectUrl);  
};

module.exports.Logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Logged you out!");
        res.redirect("/listings");
    });
};
