import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIconButton from "../../../../components/button/delete/delete-icon-button";
import EditIconButton from "../../../../components/button/edit/edit-icon-button";
import { AdminHeaderNav, AdminPageSelector } from "../../../../components/header/admin/admin-header";
import TextualLogo from "../../../../components/logo/textual/logo-textual";
import PlanModel from "../../../../models/plan";
import './admin-plans-edit-page.css'

interface EditPlanProps {
    isNew: boolean;
}

function AdminPlansEditPage(props: EditPlanProps) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [musicLimit, setMusicLimit] = useState(0);
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    function save() {
        console.log(name);
        console.log(musicLimit);
        console.log(image);
        navigate('/admin/plans', {replace: true});
    }

    function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }
    

    return (
        <div className="adminPlans">
            <AdminHeaderNav page={AdminPageSelector.PLANS} />
            <div className="adminPlansBody">
                <div className="adminPlansCard">
                    <div id="adminPlansHeader">
                        <h1> {props.isNew ? 'New' : 'Edit'} Plan</h1>
                        <button type="button" onClick={save}>
                            { props.isNew ? 'SAVE' : 'UPDATE' }
                        </button>
                    </div>

                    <div className="adminPlansEditBody">
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
                        </div>

                        <div className="labelInput" id="imageDiv">
                            <label htmlFor="planEditName">Plan image</label>
                            { image !== "" ? <img src={image} id="adminPlanImage"/> : null }
                            <input
                                type='file'
                                id="planEditImage"
                                onChange={uploadImage}
                                disabled={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPlansEditPage;