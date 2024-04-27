import { useState } from "react";
import StyleColors from "../constants/StyleColors";
import { useAuth } from "../hooks/AuthProvider";

const UserIcon = () => {
    const auth = useAuth();
    const firstInitial = auth?.user?.firstName ? auth.user.firstName[0].toUpperCase() : "";
    const lastInitial = auth?.user?.lastName ? auth.user.lastName[0].toUpperCase() : "";
    const [iconColor] = useState(() => {
		if(!auth?.user?.iconColor || !StyleColors[auth.user.iconColor])
            return 0;
        return auth.user.iconColor;
	});

    return(
        <div className={`rounded-full h-[40px] w-[40px] flex text-center justify-center items-center p-3 text-white`} style={{backgroundColor : StyleColors[iconColor]}}>
                {firstInitial}{lastInitial}
        </div>
    )
}
export default UserIcon;