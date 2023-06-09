import { useRef } from "react";

const ResetPassword = () => {
   
    let uname = useRef();
    let newpwd = useRef();
    let verifyOtp = useRef();



    return ( 
        <div className="account">
            <h2 style={{textAlign : "center", color : `#05005aa1`}}>Reset Password</h2>
            <form >
                <input id="inp" type="email" placeholder="Enter email / Phone" required ref={uname}/>
                <input id="inp" type="password" placeholder="Enter Password" required ref={newpwd}/>
                <input id="inp" type="password" placeholder="Re-Enter Password" required/>

                <button id="submit">Send Otp</button>
                <br />
            </form>
            <form action="">
                <input type="text" id="inp" placeholder="Verify Otp" ref={verifyOtp}/>
                <input id="submit" type="submit" value="Reset" />
            </form>
        </div>
     );
}
 
export default ResetPassword;