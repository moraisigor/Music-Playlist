import { faCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './activate-icon-button.css';

interface ButtonProps {
    size: number,
    onClick: () => void
}

function ActivateIconButton(props: ButtonProps) {
    return (
        <div className='activateIconButton' onClick={props.onClick} style={{width: `${props.size}px`, height: `${props.size}px`}}>
            <FontAwesomeIcon icon={faCheck} />
        </div>
    );
}

export default ActivateIconButton;