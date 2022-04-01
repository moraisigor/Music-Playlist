import TextualLogo from "../../../../components/logo/textual/logo-textual";
import './admin-musics-list-page.css'

function AdminMusicsListPage() {
    return (
        <div className="adminMusics">
            <header className='adminNavbar'>
                <TextualLogo fontSize={28} />
                <div className="navbarMenu">
                    <a href="clients"><h4>Clients</h4></a>
                    <h4>Musics</h4>
                    <a href="plans"><h4>Plans</h4></a>
                </div>
            </header>
            <div className="adminMusicsBody"></div>
        </div>
    )
}

export default AdminMusicsListPage;