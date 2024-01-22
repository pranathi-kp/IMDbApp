import { useSelector, useDispatch } from "react-redux";

const UserProfile = () => {
    const isLogin = useSelector((store)=>store.modal.islogin);
    const profDetails = useSelector((store) => store.user.profile);
    return ( 
        <div className="user-profile">
            <div className="profile-container">
          
          {isLogin && (
            <div className="profile-details">
              <p><strong>Username: </strong>{profDetails.username}</p>
              <p><strong>Email-id: </strong>{profDetails.email}</p>
              <p><strong>Fav-genre: </strong>{profDetails.favgenre}</p>
            </div>
          )}
        </div>
        </div>
     );
}
 
export default UserProfile;