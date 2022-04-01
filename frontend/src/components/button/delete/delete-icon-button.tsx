import './delete-icon-button.css';

interface ButtonProps {
    size: number,
    onClick: () => any
}

function DeleteIconButton(props: ButtonProps) {
    return (
        <div className='deleteIconButton' onClick={props.onClick} style={{width: `${props.size}px`, height: `${props.size}px`}}>
            D
        </div>
    );
}

export default DeleteIconButton;