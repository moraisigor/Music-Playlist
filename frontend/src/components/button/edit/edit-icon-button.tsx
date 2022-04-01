import './edit-icon-button.css';

interface ButtonProps {
    size: number,
    onClick: () => void
}

function EditIconButton(props: ButtonProps) {
    return (
        <div className='editIconButton' onClick={props.onClick} style={{width: `${props.size}px`, height: `${props.size}px`}}>
            E
        </div>
    );
}

export default EditIconButton;