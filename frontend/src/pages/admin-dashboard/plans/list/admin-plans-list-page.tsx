import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIconButton from "../../../../components/button/delete/delete-icon-button";
import EditIconButton from "../../../../components/button/edit/edit-icon-button";
import { AdminHeaderNav, AdminPageSelector } from "../../../../components/header/admin/admin-header";
import CircularLoader from "../../../../components/loader/circular_loader";
import PlanModel from "../../../../models/plan";
import { inactivatePlan, listPlans } from "../../../../services/plan_service";
import './admin-plans-list-page.css'

function AdminPlansListPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageChanged, setPageChanged] = useState<boolean>(true);
    const [lastPage, setLastPage] = useState<number>(1);
    const [pageOptions, setPageOptions] = useState<number[]>([1]);
    const [nameFilter, setNameFilter] = useState<string>("");
    const [limitFilter, setLimitFilter] = useState<string>("");
    const [plans, setPlans] = useState<PlanModel[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!loading && pageChanged) {
            loadPlans();
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

    async function deletePlan(plan: PlanModel): Promise<void> {
        await inactivatePlan(plan.id);
    }

    function updatePage(plan: PlanModel): void {
        navigate('edit', {replace: true});
    }

    function createPage(): void {
        navigate('new', {replace: true});
    }

    function filterPlans(): PlanModel[] {
        if (plans.length === 0) {
            return [];
        }
        else {
            const filtered: PlanModel[] = [];
            
            plans.forEach((plan: PlanModel, _index: number) => {
                if (
                    plan.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
                    plan.musicLimit.toString().includes(limitFilter)
                ) {
                    filtered.push(plan);
                }
            })
    
            return filtered;
        }
        
    }
    
    async function loadPlans(): Promise<void> {
        setLoading(true);
        const response = await listPlans(currentPage);
        
        setLastPage(response.maxPages);
        setPlans(response.data);
        
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
        <div className="adminPlans">
            <AdminHeaderNav page={AdminPageSelector.PLANS} />
            <div className="adminPlansBody">
                <div className="adminPlansCard">
                    <div id="adminPlansHeader">
                        <h1>List Plans</h1>
                        <button type="button" onClick={createPage} disabled={loading}>NEW +</button>
                    </div>

                    {
                        loading
                            ? <CircularLoader />
                            : (
                                <div className="plansTable">
                                    <table style={{width: '100%'}}>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th>Name</th>
                                                <th>Music Limit</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="plansActionColumn"></td>
                                                <td className="plansActionColumn"></td>
                                                <td
                                                    style={{paddingLeft: '10px', paddingRight: '10px'}}
                                                >
                                                    <input
                                                        style={{width: '100%', boxSizing: 'border-box', lineHeight:'22px'}}
                                                        placeholder='Filter'
                                                        onChange={e => {
                                                            setNameFilter(e.target.value);
                                                            filterPlans();
                                                        }}
                                                    />
                                                </td>
                                                <td
                                                    style={{width: '240px', paddingLeft: '10px', paddingRight: '10px'}}
                                                >
                                                    <input
                                                        style={{width: '100%', boxSizing: 'border-box', lineHeight:'22px'}}
                                                        placeholder='Filter'
                                                        onChange={e => {
                                                            setLimitFilter(e.target.value);
                                                            filterPlans();
                                                        }}
                                                    />
                                                </td>
                                                <td style={{width: '240px'}}></td>
                                            </tr>

                                            {

                                                filterPlans().length === 0
                                                    ? (
                                                        <tr>
                                                            <td colSpan={5} style={{textAlign: 'start', paddingLeft: '10px'}}>
                                                                No results found
                                                            </td>
                                                        </tr>
                                                    )
                                                    : filterPlans().map((plan: PlanModel) => {
                                                        return (
                                                            <tr>
                                                                <td className="plansActionColumn">
                                                                    <EditIconButton size={40} onClick={() => updatePage(plan)} />
                                                                </td>
                                                                <td className="plansActionColumn">
                                                                    <DeleteIconButton size={40} onClick={() => deletePlan(plan)}/>
                                                                </td>
                                                                <td>{ plan.name }</td>
                                                                <td style={{width: '240px'}}>{ plan.musicLimit }</td>
                                                                <td style={{width: '240px'}}>{ plan.active ? 'Active' : 'Inactive' }</td>
                                                            </tr>
                                                        );
                                                    })
                                            }
                                            
                                        </tbody>
                                    </table>
                                    <div className="pagination">
                                        <div className='paginationContainer' >
                                            <ul className="paginationMenu">
                                                <li onClick={pageBackward}>
                                                    <span>{'<'}</span>
                                                </li>

                                                {
                                                    pageOptions.map((page: number) => {
                                                        if (page === currentPage) {
                                                            return (
                                                                <li className="currentPage">
                                                                    <span>{currentPage}</span>
                                                                </li>
                                                            );
                                                        }
                                                        
                                                        return (
                                                            <li onClick={() => selectPage(page)}>
                                                                <span>{page}</span>
                                                            </li>
                                                        );
                                                    })
                                                }

                                                <li onClick={pageForward}>
                                                    <span>{'>'}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminPlansListPage;