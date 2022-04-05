import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminHeaderNav, AdminPageSelector } from "../../../../components/header/admin/admin-header";
import CircularLoader from "../../../../components/loader/circular_loader";
import Pagination from "../../../../components/pagination/pagination";
import MusicModel from "../../../../models/music";
import PlanModel from "../../../../models/plan";
import { createMusic, updateMusic } from "../../../../services/music_service";
import { listAllPlans, listPlansByMusic } from "../../../../services/plan_service";
import './admin-clients-edit-page.css'

interface EditMusicProps {
    isNew: boolean;
}

function AdminClientsEditPage(props: EditMusicProps) {
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMusicPlans, setLoadingMusicPlans] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [plan, setPlan] = useState<string>("");
    const [original, setOriginal] = useState<MusicModel>();
    const [plans, setPlans] = useState<PlanModel[]>([]);
    const [musicPlans, setMusicPlans] = useState<PlanModel[]>([]);
    const [changeMusicPlan, setChangeMusicPlan] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.isNew) {
            setOriginal(location.state as MusicModel);
            setName(original ? original.name : "");
        }

        if (!changeMusicPlan) {
            loadAllPlans();
            loadAvailablePlans();
        }



    }, [original, changeMusicPlan]);

    async function save() {
        setLoading(true);

        const response = await createMusic(name, plan);

        if (response) {
            navigate('/admin/musics', {replace: true});
        }
        else {
            setLoading(false);
        }
    }
    
    async function update() {
        setLoading(true);

        let obj = {}

        if (name === original?.name) {
            obj = {};
        } else {
            obj = {
                'name': name
            };
        }

        const response = await updateMusic(original!.id, obj, plan);

        if (response) {
            navigate('/admin/musics', {replace: true});
        }
        else {
            setLoading(false);
        }
    }

    function validadeNewForm() {
        return name !== "" && plan !== "" && !loading;
    }

    function validadeEditForm() {
        return !loading && ((name !== "" && name !== original?.name) || plan !== "");
    }
    
    async function loadAllPlans() {
        setLoading(true);
        const response = await listAllPlans();

        if (props.isNew) {
            setPlans(response);
        } else {
            let receivedPlans = response.filter(p => p.id !== original?.id);
            setPlans(receivedPlans);
        }
        
        setLoading(false);
    }
    
    async function loadAvailablePlans() {
        setLoadingMusicPlans(true);
        
        if (props.isNew) {
            setMusicPlans([]);
        } else {
            const response = await listPlansByMusic(original ? original.id : "null");

            if (response.length > 0) {
                setMusicPlans(response);
            }
        }
        
        setLoadingMusicPlans(false);
        setChangeMusicPlan(true);
    }

    return (
        <div className="adminClients">
            <AdminHeaderNav page={AdminPageSelector.MUSICS} />
            <div className="adminClientsBody">
                <div className="adminClientsCard">
                    <div id="adminClientsHeader">
                        <h1> {props.isNew ? 'New' : 'Edit'} Music</h1>
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
                                    <div className="textualMusicEdit">
                                        <div className="labelInput">
                                            <label htmlFor="musicEditName">Name</label>
                                            <input
                                                type='text'
                                                id="musicEditName"
                                                onChange={e => setName(e.target.value)}
                                                disabled={loading}
                                                value={name}
                                                />
                                        </div>
                                        
                                        <div className="labelInput" id="planDiv">
                                            <label htmlFor="musicEditPlan">Plan</label>
                                            <select id="musicEditPlan" onChange={e => setPlan(e.target.value)}>
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
                                        loadingMusicPlans
                                            ? <CircularLoader />
                                            : <div className="plansTable">
                                                <table style={{width: '100%'}}>
                                                    <thead>
                                                        <tr>
                                                            <th>Available at</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                    {
                                                            musicPlans.length === 0
                                                                ? (
                                                                    <tr>
                                                                        <td colSpan={5} style={{textAlign: 'start', paddingLeft: '10px'}}>
                                                                            No results found
                                                                        </td>
                                                                    </tr>
                                                                )
                                                                : musicPlans.map((plan: PlanModel) => {
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