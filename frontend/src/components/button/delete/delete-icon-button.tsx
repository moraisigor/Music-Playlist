import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './delete-icon-button.css';

interface ButtonProps {
    size: number,
    onClick: () => void
}

function DeleteIconButton(props: ButtonProps) {
    return (
        <div className='deleteIconButton' onClick={props.onClick} style={{width: `${props.size}px`, height: `${props.size}px`}}>
            <FontAwesomeIcon icon={faTrashCan} />
        </div>
    );
}

export default DeleteIconButton;