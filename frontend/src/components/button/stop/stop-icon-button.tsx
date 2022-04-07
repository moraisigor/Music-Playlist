import { faPause, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './stop-icon-button.css';

interface ButtonProps {
    size: number,
    onClick: () => void
}

function StopIconButton(props: ButtonProps) {
    return (
        <div className='stopIconButton' onClick={props.onClick} style={{width: `${props.size}px`, height: `${props.size}px`}}>
            <FontAwesomeIcon icon={faPause} style={{width: '50%', height: '50%'}}/>
        </div>
    );
}

export default StopIconButton;