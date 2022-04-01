import TextualLogo from "../../../../components/logo/textual/logo-textual";
import './admin-clients-list-page.css'

function AdminClientsListPage() {
    return (
        <div className="adminClients">
            <header className='adminNavbar'>
                <TextualLogo fontSize={28} />
                <div className="navbarMenu">
                    <h4>Clients</h4>
                    <a href="musics"><h4>Musics</h4></a>
                    <a href="plans"><h4>Plans</h4></a>
                </div>
            </header>
            <div className="adminClientsBody"></div>
        </div>
    )
}

export default AdminClientsListPage;