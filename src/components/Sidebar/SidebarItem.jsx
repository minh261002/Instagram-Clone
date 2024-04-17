import CreatePost from "./CreatePost"
import Home from "./Home"
import Notifications from "./Notification"
import ProfileLink from "./ProfileLink"
import Search from "./Search"

const SidebarItem = () => {
    return (
        <>
            <Home />
            <Search />
            <Notifications />
            <CreatePost />
            <ProfileLink />
        </>
    )
}

export default SidebarItem