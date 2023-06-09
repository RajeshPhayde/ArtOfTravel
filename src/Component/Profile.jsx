import { useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { useRef } from "react";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      background: 'rgb(255, 220, 220)',
      boxShadow: '0px 0px 10px black'
    },
  };

const Profile = () => {

    let navigate = useNavigate();

    let [userdetails,setUserdetails] = useState(null);
    
    useEffect(()=>{
        let userdetails = JSON.parse(localStorage.getItem("userdetails"));
        setUserdetails(userdetails);
    }, [])

    let logout = ()=>{
        //clear the current user details
        localStorage.removeItem("userdetails");
        alert("Logout Sucessfull......")
        navigate("/login")
    }

    let deleteAcc= ()=>{
       let response = prompt("Confirm password to continue...");
        if(response == userdetails.password){
            let config = { method : "DELETE"};
            fetch("http://localhost:4000/users/"+ userdetails.id , config)
            .then(()=>{
                alert("Account deleted succesfully...");
                localStorage.removeItem("userdetails");
                navigate("/");
            })
        }
        // else{
            // alert("Invalid password....!!")
        // }
    }
    
                    //MODAL FOR ACTIVE BOOKING  
            let subtitle;
            const [modalIsOpen, setIsOpen] = useState(false);

            function openModal() {
                setIsOpen(true);
            }

            function afterOpenModal() {
                // references are now sync'd and can be accessed.
                subtitle.style.color = '#f00';
            }

            function closeModal() {
                setIsOpen(false);
            }

                    //MODAL FOR ACTIVE BOOKING   
            let subtitle1;
            const [modalIsOpen1, setIsOpen1] = useState(false);
            
            function openModal1() {
                setIsOpen1(true);
            }
            
            function afterOpenModal1() {
                // references are now sync'd and can be accessed.
                subtitle1.style.color = '#f00';
            }
            
            function closeModal1() {
                setIsOpen1(false);
            }

             //MODAL FOR EDIT PROFILE   
             let subtitle2;
             const [modalIsOpen2, setIsOpen2] = useState(false);
             
             function openModal2() {
                 setIsOpen2(true);
             }
             
             function afterOpenModal2() {
                 // references are now sync'd and can be accessed.
                 subtitle2.style.color = 'rgba(29, 206, 67, 0.726)';
             }
             
             function closeModal2() {
                 setIsOpen2(false);
             }

             let username = useRef();
             let email = useRef();
             let phno = useRef();
             let submit = ()=>{

             }
    
    return ( 
        <div className="profilepage">
            <Nav/>
           
           <div className="background">

           </div>
        {userdetails && 
            <div className="user-details">
                
                <div className="profile-image">
                   {userdetails.pic=="" ? <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                    : <img src={userdetails.pic} alt="" />}
                </div>
                    <h2 id="username">{userdetails.username}</h2>

                <div className="profile-data">
                    <p>Phone : {userdetails.phone}</p>
                    <p>email : {userdetails.email}</p>
                    <p>Total Booking : {userdetails.active_bookings.length + userdetails.previous_bookings.length} </p>
                    <p>Active Booking :  <button onClick={openModal}>View</button> </p>
                    <p>Previous Booking :  <button onClick={openModal1}>View</button> </p>
                </div>
                   
                   <div className="log-del">
                        <button className="btn" onClick={openModal2}>Edit profile</button>
                        <button className="btn" onClick={logout}>Logout</button>
                        <button className="btn" onClick={deleteAcc}>Delete</button>
                   </div>
                
            </div>
        }
        {userdetails  && <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Active Booking : {userdetails.active_bookings.length}</h2>
            <div className="active-ticket-card">
                {userdetails.active_bookings.map((ticket, i)=>{return(
                    <div className="ticket">
                        <p>{i+1}</p>
                        <p>Bus : {ticket.busname} - {ticket.busnumber} </p>
                        <p>{ticket.date}</p>
                        <p>From : {ticket.from} : {ticket.start} <br /> To : {ticket.to} : {ticket.end}</p>
                        <p>seats : {ticket.seats}</p>
                    </div>
                        )
                    })
                }
            </div>


            <button onClick={closeModal}>close</button>
            {/* <div>I am a modal</div>
            <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
            </form> */}
      </Modal>}

{/* Previous Tickets */}
      {userdetails && <Modal
        isOpen={modalIsOpen1}
        onAfterOpen={afterOpenModal1}
        onRequestClose={closeModal1}
        style={customStyles}
        contentLabel="Example Modal">
            <h2 ref={(_subtitle) => (subtitle1 = _subtitle)}>Previous Booking : {userdetails.previous_bookings.length}</h2>
            <div className="active-ticket-card">
                {
                    userdetails.previous_bookings.map((ticket ,i)=>{
                        return(
                            <div className="ticket">
                                <p>{i+1}</p>
                                <p>Bus : {ticket.busname} - {ticket.busnumber} </p>
                                <p>{ticket.date}</p>
                                <p>{ticket.from}:{ticket.start} - {ticket.to}:{ticket.end}</p>
                                <p>{ticket.seats}</p>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={closeModal1}>close</button>
        </Modal>}

{/* Edit Profile */}
        {userdetails &&  <Modal
        isOpen={modalIsOpen2}
        onAfterOpen={afterOpenModal2}
        onRequestClose={closeModal2}
        style={customStyles}
        contentLabel="Example Modal">
            <h2 ref={(_subtitle) => (subtitle2 = _subtitle)} style={{textAlign : "center"}}>Edit Profile</h2>
            <form className="edit-profile" onSubmit={submit}>
                <input type="text" placeholder="Username" ref={username}/>
                <input type="text" placeholder="Email id" ref={email}/>
                <input type="" placeholder="Contact number" ref={phno}/>
                <input id="submit-btn" type="submit" value="update"/>

            </form>
            <button onClick={closeModal2}>close</button>
        </Modal>}
        {/* {userdetails && 
                <div className="profile-help">
                    <button className="btn">Active tickets</button>
                    <button className="btn">Bookings</button>
                    <button className="btn">Help desk</button>
                </div>
        } */}

       
        </div>
     );
}
 
export default Profile;