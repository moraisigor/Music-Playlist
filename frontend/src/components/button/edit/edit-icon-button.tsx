import './edit-icon-button.css';

interface ButtonProps {
    size: number
}

function EditIconButton(props: ButtonProps) {
    return (
        <div className='editIconButton' style={{width: `${props.size}px`, height: `${props.size}px`}}>
            E
        </div>
    );
}

export default EditIconButton;