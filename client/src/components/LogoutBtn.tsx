import logoutUser from "@/actions/logoutUser";
import { useAppDispatch } from "@/redux/reduxStore";
import { resetUser } from "@/redux/userSlice";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function LogoutBtn(){
    const dispatch = useAppDispatch();
    const mutation = useMutation({
        mutationFn: logoutUser,
        onSuccess:(data:string)=>{
            dispatch(resetUser());
            toast.success(data);
        },
        onError: (err:string)=>{
            toast.error(err);
        }
    })
    return (
        <Button
        variant="contained"
        color="error"
        onClick={()=>mutation.mutate()}
        >
            Logout
        </Button>
    );
}