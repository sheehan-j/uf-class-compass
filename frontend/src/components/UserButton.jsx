const UserButton = ({firstName, lastName}) => {
    const firstInitial = firstName ? firstName[0] : "";
    const lastInitial = lastName ? lastName[0] : "";
    return(
        <div className="rounded-full">
            {firstInitial} {lastInitial}
        </div>
    )
}
export default UserButton;