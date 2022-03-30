import './logo-textual.css';

interface LogoStyle {
    fontSize: number;
}

function TextualLogo(props: LogoStyle): JSX.Element {
  return (
    <p id='textualLogo' style={{fontSize: `${props.fontSize}px`}}><span id='musicLogo'>Music</span>Playlist</p>
  );
}

export default TextualLogo;
