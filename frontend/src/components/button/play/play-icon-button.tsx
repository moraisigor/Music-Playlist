import { faPencil, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './play-icon-button.css';

interface ButtonProps {
    size: number,
    onClick: () => void
}

function PlayIconButton(props: ButtonProps) {
    return (
        <div className='playIconButton' onClick={props.onClick} style={{width: `${props.size}px`, height: `${props.size}px`}}>
            <FontAwesomeIcon icon={faPlay} style={{width: '50%', height: '50%'}}/>
        </div>
    );
}

export default PlayIconButton;