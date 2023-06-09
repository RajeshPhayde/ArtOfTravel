import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    
    let email = useRef();
    let pwd = useRef();

    let navigate = useNavigate();


    let login = (e)=>{
        e.preventDefault();

        fetch("http://localhost:4000/users")
        .then((res)=>{return res.json()})
        .then((data)=>{
            let user =  data.find((u)=>{ return u.email===email.current.value  })
            console.log(user);
            if(user==undefined)
            {
                alert("user not found");
            }
            else if(user.password !== pwd.current.value)
            {
                alert("invalid password");
            }
            else
            {
                alert("login successfull");
                localStorage.setItem("userdetails" , JSON.stringify(user));
                navigate("/home")
            }
        })
        
        // if(users == undefined){
        //     alert("User doesn't exist...!!!");
        //     user.current.value = "";
        //     pwd.current.value = "";
        // }
        // else if(users.password === pwd.current.value)
        // {
        //     alert(`Welcome ${user.current.value}`);
        // }
        // else{
        //     alert(`Incorrect password. Please try again...`);
        //     localStorage.setItem("userdatails" , JSON.stringify(users));
        //     pwd.current.value = "";
        // }

    }


    return ( 
        <div className="account">
            <h1 style={{textAlign : "center", color : `#05005aa1`}}>Login</h1>
            <form onSubmit={login}>
                <input id="inp" type="email" placeholder="Enter Email / Phone" required ref={email}/>
                <input id="inp" type="password" placeholder="Enter Password" required ref={pwd}/>
                <input id="submit" type="submit" value="Login" />
                <br />
                <span style={{color : "rgb(27, 163, 27)" ,fontWeight : 700 , fontSize : "large"}}>
                    <Link to="/">Create account</Link> 
                    <Link to="/forgot"><span style={{color : "blue"}}>Forgot password?</span></Link>
                </span>
            </form>
        </div>
     );
}
 
export default Login;