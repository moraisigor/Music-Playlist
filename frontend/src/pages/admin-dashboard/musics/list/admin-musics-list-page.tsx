import { AdminHeaderNav, AdminPageSelector } from "../../../../components/header/admin/admin-header";
import TextualLogo from "../../../../components/logo/textual/logo-textual";
import './admin-musics-list-page.css'

function AdminMusicsListPage() {
    return (
        <div className="adminMusics">
            <AdminHeaderNav page={AdminPageSelector.MUSICS} />
            <div className="adminMusicsBody"></div>
        </div>
    )
}

export default AdminMusicsListPage;