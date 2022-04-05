import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActivateIconButton from "../../../../components/button/activate/activate-icon-button";
import DeleteIconButton from "../../../../components/button/delete/delete-icon-button";
import EditIconButton from "../../../../components/button/edit/edit-icon-button";
import { AdminHeaderNav, AdminPageSelector } from "../../../../components/header/admin/admin-header";
import CircularLoader from "../../../../components/loader/circular_loader";
import Pagination from "../../../../components/pagination/pagination";
import ClientModel from "../../../../models/client";
import { inactivateClient, listClients } from "../../../../services/client_service";
import './admin-clients-list-page.css'

function AdminClientsListPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageChanged, setPageChanged] = useState<boolean>(true);
    const [lastPage, setLastPage] = useState<number>(1);
    const [pageOptions, setPageOptions] = useState<number[]>([1]);
    const [nameFilter, setNameFilter] = useState<string>("");
    const [planFilter, setPlanFilter] = useState<string>("");
    const [clients, setClients] = useState<ClientModel[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!loading && pageChanged) {
            loadClients();
        }
    }, [loading, pageChanged]);


    function pageForward(): void {
        if (currentPage < lastPage) {
            if (pageOptions[pageOptions.length - 1] < lastPage) {
                const options = pageOptions;
                options.push(pageOptions[pageOptions.length - 1] + 1);
                options.shift();
                setPageOptions(options);
            }
            
            setPageChanged(true);
            setCurrentPage(currentPage + 1);
        }
    }
    
    function pageBackward(): void {
        if (currentPage > 1) {
            if (pageOptions[0] > 1) {
                const options = pageOptions;
                options.unshift(pageOptions[0] - 1);
                options.pop();
                setPageOptions(options);
            }

            setPageChanged(true);
            setCurrentPage(currentPage - 1);
        }
    }

    function selectPage(page: number): void {
        setCurrentPage(page);
        setPageChanged(true);
    }

    async function deleteClient(client: ClientModel): Promise<void> {
        await inactivateClient(client.id);
        setPageChanged(true);
    }

    async function activateClient(client: ClientModel): Promise<void> {
        //await updateActiveClient(plan.id, plan.parentId);
        setPageChanged(true);
    }

    function updatePage(client: ClientModel): void {
        navigate('edit', {replace: true, state: client});
    }

    function createPage(): void {
        navigate('new', {replace: true});
    }

    function filterClients(): ClientModel[] {
        if (clients.length === 0) {
            return [];
        }
        else {
            const filtered: ClientModel[] = [];
            
            clients.forEach((client: ClientModel, _index: number) => {
                if (
                    client.email.toLowerCase().includes(nameFilter.toLowerCase()) &&
                    client.plan.toLowerCase().includes(planFilter.toLowerCase())
                ) {
                    filtered.push(client);
                }
            })
    
            return filtered;
        }
        
    }
    
    async function loadClients(): Promise<void> {
        setLoading(true);
        const response = await listClients(currentPage);
        
        setLastPage(response.maxPages);
        setClients(response.data);
        
        const options = [];
        
        for (let index = 0; index < 5; index++) {
            if (index < lastPage) {
                options.push(index + 1);
            }
        }
        
        setPageOptions(options);
        setLoading(false);
        setPageChanged(false);
    }

    return (
        <div className="adminClients">
            <AdminHeaderNav page={AdminPageSelector.MUSICS} />
            <div className="adminClientsBody">
                <div className="adminClientsCard">
                    <div id="adminClientsHeader">
                        <h1>List Clients</h1>
                        <button type="button" onClick={createPage} disabled={loading}>NEW +</button>
                    </div>

                    {
                        loading
                            ? <CircularLoader />
                            : (
                                <div className="clientsTable">
                                    <table style={{width: '100%'}}>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th>Email</th>
                                                <th>Plan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="clientsActionColumn"></td>
                                                <td className="clientsActionColumn"></td>
                                                <td
                                                    style={{paddingLeft: '10px', paddingRight: '10px'}}
                                                >
                                                    <input
                                                        style={{width: '100%', boxSizing: 'border-box', lineHeight:'22px'}}
                                                        placeholder='Filter'
                                                        onChange={e => {
                                                            setNameFilter(e.target.value);
                                                            filterClients();
                                                        }}
                                                    />
                                                </td>
                                                <td style={{width: '240px'}}>
                                                    <input
                                                        style={{width: '100%', boxSizing: 'border-box', lineHeight:'22px'}}
                                                        placeholder='Filter'
                                                        onChange={e => {
                                                            setPlanFilter(e.target.value);
                                                            filterClients();
                                                        }}
                                                    />
                                                </td>
                                            </tr>

                                            {

                                                filterClients().length === 0
                                                    ? (
                                                        <tr>
                                                            <td colSpan={5} style={{textAlign: 'start', paddingLeft: '10px'}}>
                                                                No results found
                                                            </td>
                                                        </tr>
                                                    )
                                                    : filterClients().map((client: ClientModel) => {
                                                        return (
                                                            <tr>
                                                                <td className="clientsActionColumn">
                                                                    <EditIconButton size={40} onClick={() => updatePage(client)} />
                                                                </td>
                                                                <td className="clientsActionColumn">
                                                                    <DeleteIconButton size={40} onClick={() => deleteClient(client)}/>
                                                                </td>
                                                                <td>{ client.email }</td>
                                                                <td style={{width: '240px'}}>{ client.plan }</td>
                                                            </tr>
                                                        );
                                                    })
                                            }
                                            
                                        </tbody>
                                    </table>
                                    <Pagination
                                        current={currentPage}
                                        options={pageOptions}
                                        pageBackward={pageBackward}
                                        pageForward={pageForward}
                                        onSelect={selectPage}
                                    />
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminClientsListPage;