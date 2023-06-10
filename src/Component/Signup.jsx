import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
   
    let n = useNavigate();

    let uname = useRef();
    let mail = useRef();
    let pwd = useRef();
    let date = useRef();
    let phone = useRef();
    let confirmPwd = useRef();
    let img = useRef();

    let [verified, setverified] = useState(false);
    let [users, setUsers] = useState(null);
    let [wrongpass, setWrongpass] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem("userdetails") != null ){
            n("/home");
        }
       else{
        fetch("http://localhost:5000/users")
        .then((res)=>{return res.json()})
        .then((data)=>{  setUsers(data) })
       }
    },[])


    let verifyEmail = ()=>{
        // const url = `https://zerobounce1.p.rapidapi.com/v2/validate?api_key=%20996f1995b5994633aee4497659c7bed0&email=${mail.current.value}`;
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'X-RapidAPI-Key': '747e0c9d5amsh6745270a1292c5fp18dfdfjsn688e39148ab0',
        //         'X-RapidAPI-Host': 'zerobounce1.p.rapidapi.com'
        //     }
        // };

        // fetch(url, options)
        // .then((res)=>{ return res.json() })
        // .then((data)=>{ console.log(data.status);
        //     if(data.status=="valid"){
        //         setverified(true);
        //     }
        //     else{
        //         alert("Invalid email... Please enter valid email");
        //         setverified(false);
        //     }
        // })
        setTimeout(()=>{
            setverified(true);
            alert("Email verified...!");
        }, 2000)

    }

    let handleSignup = (e)=>{
            e.preventDefault();

            let user = {
                username : uname.current.value,
                email : mail.current.value,
                password : pwd.current.value,
                dob : date.current.value,
                phone : phone.current.value
            }

            if(pwd.current.value != confirmPwd.current.value)
            {
                // alert("password mismatch...");
                setWrongpass(true);
                confirmPwd.current.value = "";
                return;
            }
            if( new Date < new Date(date.current.value) )
            {
                alert("Invalid date of birth");
                return;
            }
            if(users.some((u)=>{ return u.email==user.email }))
            {
                alert(`${user.name} alredy exists...`);
                mail.current.value ="";
                setverified(false);
                setWrongpass(false);
                return;
            }
            else{
                fetch("http://localhost:4000/users" , {
                    method : "POST",
                    headers : {"Content-Type" : "application/json"},
                    body : JSON.stringify(user)
                })
                .then(()=>{
                    alert(`${user.username}'s account created. Please Login to Continue...`);
                    setverified(false);
                    n("/login");
                })
            }
    }

    return ( 
        <div className="account">
            <h1 style={{textAlign : "center", color : `#05005aa1` }}>ArtOfTravel</h1>
            <form onSubmit={handleSignup}>
                <input id="inp" type="text" placeholder="Enter Username" required ref={uname}/>
                <input id="inp" type="email" placeholder="Enter email id" required ref={mail}/>
                <input id="inp" type="password" placeholder="Enter Password" required ref={pwd}/>
                <input id="inp" type="password" placeholder="Re-Enter Password" required ref={confirmPwd}/>
                <input id="inp" type="url" placeholder="Enter image url" ref={img}/>
                {wrongpass && <span id="pwd-mis">*** Password Missmatch</span>}
                <input id="inp" type="date" placeholder="Enter Date of birth" required ref={date}/>
                <input id="inp" type="tel" minLength={10} maxLength={10} placeholder="Enter Contact number" required ref={phone}/>

                 
                 <input id="submit" type="submit" value="Signup" disabled={verified==false ? true : false}/>
                <br />
                <span style={{color : "red" ,fontWeight : 700 , fontSize : "large"}}>Already have an account? 
                    <Link to="/login"><span style={{color : "blue"}}>Sign in</span></Link>
                </span> 
            </form>
            <button onClick={verifyEmail} className="verify-btn">Verify email</button>
        </div>
     );
}
 
export default Signup;