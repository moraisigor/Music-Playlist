import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import TextualLogo from "../../logo/textual/logo-textual";
import './admin-header.css';

export enum AdminPageSelector {
    CLIENTS,
    MUSICS,
    PLANS
}

interface HeaderNavProps {
    page: AdminPageSelector
}

export function AdminHeaderNav(props: HeaderNavProps) {
    const navigate = useNavigate();

    function signOut() {
        sessionStorage.removeItem('token');
        navigate('/', {replace: true});
    }

    return (
        <header className='adminNavbar'>
            <TextualLogo fontSize={28} />
            <div className="navbarMenu">
                {
                    props.page === AdminPageSelector.CLIENTS
                        ? <h4>Clients</h4>
                        : <a href="/admin/clients"><h4>Clients</h4></a>
                }
                
                {
                    props.page === AdminPageSelector.MUSICS
                        ? <h4>Musics</h4>
                        : <a href="/admin/musics"><h4>Musics</h4></a>
                }
                
                {
                    props.page === AdminPageSelector.PLANS
                        ? <h4>Plans</h4>
                        : <a href="/admin/plans"><h4>Plans</h4></a>
                }

                <FontAwesomeIcon icon={faSignOut} onClick={signOut} className="signOutButton"/>
            </div>
        </header>
    );
}