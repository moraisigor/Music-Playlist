import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteIconButton from "../../../../components/button/delete/delete-icon-button";
import EditIconButton from "../../../../components/button/edit/edit-icon-button";
import { AdminHeaderNav, AdminPageSelector } from "../../../../components/header/admin/admin-header";
import CircularLoader from "../../../../components/loader/circular_loader";
import TextualLogo from "../../../../components/logo/textual/logo-textual";
import PlanModel from "../../../../models/plan";
import { createPlan, listAllPlans, updatePlan } from "../../../../services/plan_service";
import './admin-plans-edit-page.css'

interface EditPlanProps {
    isNew: boolean;
}

function AdminPlansEditPage(props: EditPlanProps) {
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [musicLimit, setMusicLimit] = useState<number>(0);
    const [parentId, setParentId] = useState<string>("");
    const [plans, setPlans] = useState<PlanModel[]>([]);
    const [original, setOriginal] = useState<PlanModel>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate("/admin");
        }

        if (!props.isNew) {
            setOriginal(location.state as PlanModel);
            setName(original ? original.name : "");
            setMusicLimit(original ? original.musicLimit : 0);            
            setParentId(original ? original.parentId : "");
        }

        loadAllPlans();
    }, [original]);

    async function save() {
        setLoading(true);

        const response = await createPlan(name, musicLimit, parentId);

        if (response) {
            navigate('/admin/plans', {replace: true});
        }
        else {
            setLoading(false);
        }
    }
    
    async function update() {
        setLoading(true);

        let obj = {}

        if (name === original?.name) {
            obj = {'music_limit': musicLimit};
        } else {
            obj = {
                'name': name,
                'music_limit': musicLimit
            };
        }

        const response = await updatePlan(original!.id, obj, parentId);

        if (response) {
            navigate('/admin/plans', {replace: true});
        }
        else {
            setLoading(false);
        }
    }

    function validadeNewForm() {
        return name !== "" && musicLimit > 0 && !loading;
    }

    function validadeEditForm() {
        return !loading && ((name !== "" && name !== original?.name) ||
            (musicLimit > 0 && musicLimit !== original?.musicLimit) ||
            (parentId !== original?.parentId));
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

    return (
        <div className="adminPlans">
            <AdminHeaderNav page={AdminPageSelector.PLANS} />
            <div className="adminPlansBody">
                <div className="adminPlansCard">
                    <div id="adminPlansHeader">
                        <h1> {props.isNew ? 'New' : 'Edit'} Plan</h1>
                        <button
                            type="button"
                            disabled={props.isNew ? !validadeNewForm() : !validadeEditForm()}
                            onClick={props.isNew ? save : update}
                        >
                            { props.isNew ? 'SAVE' : 'UPDATE' }
                        </button>
                    </div>

                    <div className="adminPlansEditBody">
                        {
                            loading
                            ? <CircularLoader />
                            : (
                                <div className="textualPlanEdit">
                                    <div className="labelInput">
                                        <label htmlFor="planEditName">Name</label>
                                        <input
                                            type='text'
                                            id="planEditName"
                                            onChange={e => setName(e.target.value)}
                                            disabled={loading}
                                            value={name}
                                            />
                                    </div>

                                    <div className="labelInput" id="musicLimitDiv">
                                        <label htmlFor="planEditLimit">Musics limit</label>
                                        <input
                                            type='number'
                                            id="planEditLimit"
                                            onChange={e => setMusicLimit(+e.target.value)}
                                            disabled={loading}
                                            min={1}
                                            value={musicLimit}
                                        />
                                    </div>
                                    
                                    <div className="labelInput" id="parentDiv">
                                        <label htmlFor="planEditLimit">Parent plan</label>
                                        <select onChange={e => setParentId(e.target.value)} defaultValue={original?.parentId}>
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
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPlansEditPage;