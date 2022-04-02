import { AdminHeaderNav, AdminPageSelector } from "../../../../components/header/admin/admin-header";
import TextualLogo from "../../../../components/logo/textual/logo-textual";
import './admin-clients-list-page.css'

function AdminClientsListPage() {
    return (
        <div className="adminClients">
            <AdminHeaderNav page={AdminPageSelector.CLIENTS} />
            <div className="adminClientsBody"></div>
        </div>
    )
}

export default AdminClientsListPage;