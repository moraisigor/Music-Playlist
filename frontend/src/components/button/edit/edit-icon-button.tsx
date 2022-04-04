import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './edit-icon-button.css';

interface ButtonProps {
    size: number,
    onClick: () => void
}

function EditIconButton(props: ButtonProps) {
    return (
        <div className='editIconButton' onClick={props.onClick} style={{width: `${props.size}px`, height: `${props.size}px`}}>
            <FontAwesomeIcon icon={faPencil} />
        </div>
    );
}

export default EditIconButton;