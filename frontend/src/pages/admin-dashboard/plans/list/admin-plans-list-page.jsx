import TextualLogo from "../../../../components/logo/textual/logo-textual";
import './admin-plans-list-page.css'

function AdminPlansListPage() {
    return (
        <div className="adminPlans">
            <header className='adminNavbar'>
                <TextualLogo fontSize={28} />
                <div className="navbarMenu">
                    <a href="clients"><h4>Clients</h4></a>
                    <a href="musics"><h4>Musics</h4></a>
                    <h4>Plans</h4>
                </div>
            </header>
            <div className="adminPlansBody"></div>
        </div>
    )
}

export default AdminPlansListPage;