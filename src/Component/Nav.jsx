import { Link } from "react-router-dom";

const Nav = () => {
    return ( 
        <nav>
            <div className="logo">
                <Link to="/home">Art of travel</Link> 
                <i className='bx bxs-bus'></i>
            </div>

            <div className="tickets">
                <Link to="/bus">Bus</Link>
                {/* <Link to="/flight">Flight</Link> */}
                <Link to="/active">Active</Link>
                <Link to="/profile">Profile</Link>
            </div>

            <div className="profile">
                <button>Logout</button>
            </div>
        </nav>
    );
}
export default Nav;






