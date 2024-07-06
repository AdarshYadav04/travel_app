import "./ProfileDropDown.css";

import { useAuth } from "../../Context/auth-context";
import { useDate } from "../../Context/date-context";
import { useWishlist } from "../../Context/wishlist-context";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useUser } from "../../Context/user-context";

export const ProfileDropDown = () => {
    const toast=useToast()

    const { authDispatch } = useAuth();

    const { dateDispatch } = useDate();

    const { wishlistDispatch } = useWishlist();

    const navigate = useNavigate();
    const {user,setUser}=useUser()

    const handleWishlistClick = () => {
        authDispatch({
            type: "SHOW_DROP_DOWN_OPTIONS"
        })
        navigate("/wishlist");
    }

    const handleLogoutClick = () => {
        authDispatch({
            type: "CLEAR_USER_DATA"
        })
        authDispatch({
            type: "CLEAR_CREDENTIALS"
        })
        authDispatch({
            type: "SHOW_DROP_DOWN_OPTIONS"
        })
        authDispatch({
            type:"SET_ACCESS_TOKEN",
            payload:""
          })
        dateDispatch({
            type: "CLEAR_INPUTS"
        })
        
        wishlistDispatch({
            type: "CLEAR_WISHLIST"
        })
        toast({
            title: "Logout Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        localStorage.removeItem("userInfo")
        setUser("")

          
    }

    return (
        <div className="drop-down-container shadow d-flex direction-column absolute">
            <span className="option-span wishlist-span cursor-pointer d-flex align-center gap-small" onClick={handleWishlistClick}><span class="material-icons-outlined">
                favorite_border
            </span>
                Wishlist
            </span>
            <span className="option-span logout cursor-pointer d-flex align-center gap-small" onClick={handleLogoutClick}>
                <span class="material-icons-outlined">
                    logout
                </span>
                Logout</span>
        </div>
    )
}