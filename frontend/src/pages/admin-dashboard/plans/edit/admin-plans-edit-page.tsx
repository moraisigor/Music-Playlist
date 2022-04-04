import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIconButton from "../../../../components/button/delete/delete-icon-button";
import EditIconButton from "../../../../components/button/edit/edit-icon-button";
import { AdminHeaderNav, AdminPageSelector } from "../../../../components/header/admin/admin-header";
import CircularLoader from "../../../../components/loader/circular_loader";
import TextualLogo from "../../../../components/logo/textual/logo-textual";
import PlanModel from "../../../../models/plan";
import { listAllPlans } from "../../../../services/plan_service";
import './admin-plans-edit-page.css'

interface EditPlanProps {
    isNew: boolean;
}

function AdminPlansEditPage(props: EditPlanProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [musicLimit, setMusicLimit] = useState<number>(0);
    const [plans, setPlans] = useState<PlanModel[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadAllPlans();
    }, []);

    function save() {
        console.log(name);
        console.log(musicLimit);
        navigate('/admin/plans', {replace: true});
    }

    function validadeForm() {
        return name !== "" && musicLimit > 0 && !loading;
    }
    
    async function loadAllPlans() {
        setLoading(true);
        const response = await listAllPlans();
        
        setPlans(response);
        
        setLoading(false);
    }

    return (
        <div className="adminPlans">
            <AdminHeaderNav page={AdminPageSelector.PLANS} />
            <div className="adminPlansBody">
                <div className="adminPlansCard">
                    <div id="adminPlansHeader">
                        <h1> {props.isNew ? 'New' : 'Edit'} Plan</h1>
                        <button disabled={!validadeForm()} type="button" onClick={save}>
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
                                            />
                                    </div>

                                    <div className="labelInput" id="musicLimitDiv">
                                        <label htmlFor="planEditLimit">Musics limit</label>
                                        <input
                                            type='number'
                                            id="planEditLimit"
                                            onChange={e => setMusicLimit(+e.target.value)}
                                            disabled={loading}
                                        />
                                    </div>
                                    
                                    <div className="labelInput" id="parentDiv">
                                        <label htmlFor="planEditLimit">Parent plan</label>
                                        <select>
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