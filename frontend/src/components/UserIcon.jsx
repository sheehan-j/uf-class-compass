const UserIcon = ({auth}) => {
    const firstInitial = auth?.user?.firstName ? auth.user.firstName[0].toUpperCase() : "";
    const lastInitial = auth?.user?.lastName ? auth.user.lastName[0].toUpperCase() : "";
    return(
        <div className={"rounded-full h-[40px] w-[40px] flex text-center justify-center items-center bg-customOrange p-3"}>
                {firstInitial}{lastInitial}
        </div>
    )
}
export default UserIcon;