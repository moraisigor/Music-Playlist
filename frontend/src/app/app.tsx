import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminClientsEditPage from "../pages/admin-dashboard/clients/edit/admin-clients-edit-page";
import AdminClientsListPage from "../pages/admin-dashboard/clients/list/admin-clients-list-page";
import AdminMusicsEditPage from "../pages/admin-dashboard/musics/edit/admin-musics-edit-page";
import AdminMusicsListPage from "../pages/admin-dashboard/musics/list/admin-musics-list-page";
import AdminPlansEditPage from "../pages/admin-dashboard/plans/edit/admin-plans-edit-page";
import AdminPlansListPage from "../pages/admin-dashboard/plans/list/admin-plans-list-page";
import ClientExploreMusicPage from "../pages/clients-area/explore/explore";
import ClientsHomePage from "../pages/clients-area/home/clients-home";
import AdminSignInPage from "../pages/sign-in/admin/admin-sign-in-page";
import ClientsSignInPage from "../pages/sign-in/clients/clients-sign-in-page";

const PlaylistMusic = () => {
    return(
        <Router>
            <Routes>
                <Route element={<AdminSignInPage />} path="/admin" caseSensitive />
                <Route element={<AdminClientsListPage />} path="/admin/clients" caseSensitive />
                <Route element={<AdminClientsEditPage isNew={true} />} path="/admin/clients/new" caseSensitive />
                <Route element={<AdminClientsEditPage isNew={false} />} path="/admin/clients/edit" caseSensitive />
                <Route element={<AdminMusicsListPage />} path="/admin/musics" caseSensitive />
                <Route element={<AdminMusicsEditPage isNew={true} />} path="/admin/musics/new" caseSensitive />
                <Route element={<AdminMusicsEditPage isNew={false} />} path="/admin/musics/edit" caseSensitive />
                <Route element={<AdminPlansListPage />} path="/admin/plans" caseSensitive />
                <Route element={<AdminPlansEditPage isNew={true} />} path="/admin/plans/new" caseSensitive />
                <Route element={<AdminPlansEditPage isNew={false} />} path="/admin/plans/edit" caseSensitive />
                <Route element={<ClientsSignInPage />} path="/" caseSensitive />
                <Route element={<ClientsHomePage />} path="/home" caseSensitive />
                <Route element={<ClientExploreMusicPage />} path="/explore" caseSensitive />
            </Routes>
        </Router>
    )
 }

export default PlaylistMusic;