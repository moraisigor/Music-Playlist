import TextualLogo from "../../logo/textual/logo-textual";

export enum AdminPageSelector {
    CLIENTS,
    MUSICS,
    PLANS
}

interface HeaderNavProps {
    page: AdminPageSelector
}

export function AdminHeaderNav(props: HeaderNavProps) {
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
            </div>
        </header>
    );
}