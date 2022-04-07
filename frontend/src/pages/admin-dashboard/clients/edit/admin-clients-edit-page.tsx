import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminHeaderNav, AdminPageSelector } from "../../../../components/header/admin/admin-header";
import CircularLoader from "../../../../components/loader/circular_loader";
import Pagination from "../../../../components/pagination/pagination";
import ClientModel from "../../../../models/client";
import PlanModel from "../../../../models/plan";
import { createClient, updateClient } from "../../../../services/client_service";
import { listAllPlans } from "../../../../services/plan_service";
import './admin-clients-edit-page.css'

interface EditClientProps {
    isNew: boolean;
}

function AdminClientsEditPage(props: EditClientProps) {
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingClientPlans, setLoadingClientPlans] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [plan, setPlan] = useState<string>("");
    const [original, setOriginal] = useState<ClientModel>();
    const [plans, setPlans] = useState<PlanModel[]>([]);
    const [clientPlans, setClientPlans] = useState<PlanModel[]>([]);
    const [changeClientPlan, setChangeClientPlan] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.isNew) {
            setOriginal(location.state as ClientModel);
            setEmail(original ? original.email : "");
        }

        if (!changeClientPlan) {
            loadAvailablePlans();
            loadAllPlans();
        }



    }, [original, changeClientPlan]);

    async function save() {
        setLoading(true);

        const response = await createClient(email, password, plan);

        if (response) {
            navigate('/admin/clients', {replace: true});
        }
        else {
            setLoading(false);
        }
    }
    
    async function update() {
        setLoading(true);

        let obj = {}

        if (email === original?.email) {
            obj = {};
        } else {
            obj = {
                'email': email
            };
        }

        const response = await updateClient(original!.id, obj, plan);

        if (response) {
            navigate('/admin/clients', {replace: true});
        }
        else {
            setLoading(false);
        }
    }

    function validadeNewForm() {
        return email !== "" &&  password !== "" && plan !== "" && !loading;
    }

    function validadeEditForm() {
        return !loading && ((email !== "" && email !== original?.email) || plan !== "");
    }
    
    async function loadAllPlans() {
        setLoading(true);
        const response = await listAllPlans();

        if (props.isNew) {
            setPlans(response);
        } else {
            setPlans(response);

            for (let index = 0; index < response.length; index++) {
                const p: PlanModel = response[index];
                
                if (response[index].name === original?.plan) {
                    setPlan(p.id);
                    break;
                }
            }
        }
        
        setLoading(false);
    }
    
    async function loadAvailablePlans() {
        /* setLoadingClientPlans(true);
        
        if (props.isNew) {
            setClientPlans([]);
        } else {
            const response = await listPlansByClient(original ? original.id : "null");

            if (response.length > 0) {
                setClientPlans(response);
            }
        }
        
        setLoadingClientPlans(false);
        setChangeClientPlan(true); */
    }

    return (
        <div className="adminClients">
            <AdminHeaderNav page={AdminPageSelector.CLIENTS} />
            <div className="adminClientsBody">
                <div className="adminClientsCard">
                    <div id="adminClientsHeader">
                        <h1> {props.isNew ? 'New' : 'Edit'} Client</h1>
                        <button
                            type="button"
                            disabled={props.isNew ? !validadeNewForm() : !validadeEditForm()}
                            onClick={props.isNew ? save : update}
                        >
                            { props.isNew ? 'SAVE' : 'UPDATE' }
                        </button>
                    </div>

                    <div className="adminClientsEditBody">
                        {
                            loading
                            ? <CircularLoader />
                            : (
                                <div>
                                    <div className="textualClientEdit">
                                        <div>
                                            <div className="labelInput">
                                                <label htmlFor="clientEditName">Email</label>
                                                <input
                                                    type='text'
                                                    id="clientEditName"
                                                    onChange={e => setEmail(e.target.value)}
                                                    disabled={loading}
                                                    value={email}
                                                />
                                            </div>
                                            <div className="labelInput" style={{marginTop: '10px'}}>
                                                <label htmlFor="clientEditName">Password</label>
                                                <input
                                                    type='password'
                                                    id="clientEditPassword"
                                                    onChange={e => setPassword(e.target.value)}
                                                    disabled={loading || !props.isNew}
                                                    value={
                                                        props.isNew
                                                            ? password
                                                            : '********'
                                                    }
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="labelInput" id="clientPlanDiv">
                                            <label htmlFor="clientPlanEditPlan">Plan</label>
                                            <select id="clientPlanEditPlan" value={plan} onChange={e => setPlan(e.target.value)}>
                                                <option value="">Select</option>
                                                {
                                                    plans.map((plan: PlanModel, index: number) => {
                                                        return (
                                                            <option value={plan.id}>{ plan.name }</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    {
                                        loadingClientPlans
                                            ? <CircularLoader />
                                            : <div className="clientsTable">
                                                <table style={{width: '100%'}}>
                                                    <thead>
                                                        <tr>
                                                            <th>Playlist</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                    {
                                                            clientPlans.length === 0
                                                                ? (
                                                                    <tr>
                                                                        <td colSpan={5} style={{textAlign: 'start', paddingLeft: '10px'}}>
                                                                            No results found
                                                                        </td>
                                                                    </tr>
                                                                )
                                                                : clientPlans.map((plan: PlanModel) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{ plan.name }</td>
                                                                        </tr>
                                                                    );
                                                                })
                                                        }
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminClientsEditPage;