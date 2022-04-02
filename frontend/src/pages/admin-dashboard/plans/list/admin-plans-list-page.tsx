import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIconButton from "../../../../components/button/delete/delete-icon-button";
import EditIconButton from "../../../../components/button/edit/edit-icon-button";
import { AdminHeaderNav, AdminPageSelector } from "../../../../components/header/admin/admin-header";
import TextualLogo from "../../../../components/logo/textual/logo-textual";
import PlanModel from "../../../../models/plan";
import './admin-plans-list-page.css'

function AdminPlansListPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(10);
    const [pageOptions, setPageOptions] = useState([1, 2, 3, 4, 5]);
    const [nameFilter, setNameFilter] = useState("");
    const [limitFilter, setLimitFilter] = useState("");
    const navigate = useNavigate();

    const plans: PlanModel[] = [
        new PlanModel('Gold', true, 5),
        new PlanModel('Basic', false, 3)
    ];

    function pageForward(): void {
        if (currentPage < lastPage) {
            if (pageOptions[pageOptions.length - 1] < lastPage) {
                const options = pageOptions;
                options.push(pageOptions[pageOptions.length - 1] + 1);
                options.shift();
                setPageOptions(options);
            }
            
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

            setCurrentPage(currentPage - 1);
        }
    }

    function selectPage(page: number): void {
        setCurrentPage(page);
    }

    function deletePlan(plan: PlanModel): void {
        console.log(plan.getName());
    }

    function updatePage(plan: PlanModel): void {
        navigate('edit', {replace: true});
    }

    function createPage(): void {
        navigate('new', {replace: true});
    }

    function filterPlans(): PlanModel[] {
        const filtered: PlanModel[] = [];

        plans.forEach((plan: PlanModel, _index: number) => {
            if (plan.nameIncludes(nameFilter) && plan.musicLimitIncludes(limitFilter)) {
                filtered.push(plan);
            }
        })        

        return filtered;
    }

    return (
        <div className="adminPlans">
            <AdminHeaderNav page={AdminPageSelector.PLANS} />
            <div className="adminPlansBody">
                <div className="adminPlansCard">
                    <div id="adminPlansHeader">
                        <h1>List Plans</h1>
                        <button type="button" onClick={createPage}>NEW +</button>
                    </div>

                    <table className="plansTable">
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
                                        onChange={e => setNameFilter(e.target.value)}
                                    />
                                </td>
                                <td
                                    style={{width: '240px', paddingLeft: '10px', paddingRight: '10px'}}
                                >
                                    <input
                                        style={{width: '100%', boxSizing: 'border-box', lineHeight:'22px'}}
                                        placeholder='Filter'
                                        onChange={e => setLimitFilter(e.target.value)}
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
                                                <td>{ plan.getName() }</td>
                                                <td style={{width: '240px'}}>{ plan.getMusicLimit() }</td>
                                                <td style={{width: '240px'}}>{ plan.getStatus() ? 'Active' : 'Inactive' }</td>
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
            </div>
        </div>
    )
}

export default AdminPlansListPage;