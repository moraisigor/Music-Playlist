import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminClientsEditPage from "../pages/admin-dashboard/clients/edit/admin-clients-edit-page";
import AdminClientsListPage from "../pages/admin-dashboard/clients/list/admin-clients-list-page";
import AdminMusicsEditPage from "../pages/admin-dashboard/musics/edit/admin-musics-edit-page";
import AdminMusicsListPage from "../pages/admin-dashboard/musics/list/admin-musics-list-page";
import AdminPlansEditPage from "../pages/admin-dashboard/plans/edit/admin-plans-edit-page";
import AdminPlansListPage from "../pages/admin-dashboard/plans/list/admin-plans-list-page";

const PlaylistMusic = () => {
    return(
        <Router>
            <Routes>
                <Route element={<AdminClientsListPage />} path="/admin/clients" caseSensitive />
                <Route element={<AdminClientsEditPage isNew={true} />} path="/admin/clients/new" caseSensitive />
                <Route element={<AdminClientsEditPage isNew={false} />} path="/admin/clients/edit" caseSensitive />
                <Route element={<AdminMusicsListPage />} path="/admin/musics" caseSensitive />
                <Route element={<AdminMusicsEditPage isNew={true} />} path="/admin/musics/new" caseSensitive />
                <Route element={<AdminMusicsEditPage isNew={false} />} path="/admin/musics/edit" caseSensitive />
                <Route element={<AdminPlansListPage />} path="/admin/plans" caseSensitive />
                <Route element={<AdminPlansEditPage isNew={true} />} path="/admin/plans/new" caseSensitive />
                <Route element={<AdminPlansEditPage isNew={false} />} path="/admin/plans/edit" caseSensitive />
            </Routes>
        </Router>
    )
 }

export default PlaylistMusic;