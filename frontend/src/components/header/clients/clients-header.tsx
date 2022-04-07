import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import TextualLogo from "../../logo/textual/logo-textual";
import './clients-header.css';

export function ClientsHeaderNav() {
    const navigate = useNavigate();

    function signOut() {
        sessionStorage.removeItem('token');
        navigate('/', {replace: true});
    }

    return (
        <header className='adminNavbar'>
            <TextualLogo fontSize={28} />
            <FontAwesomeIcon icon={faSignOut} onClick={signOut} className="signOutButton"/>
        </header>
    );
}