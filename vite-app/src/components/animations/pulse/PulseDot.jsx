import './PulseDot.css';

function PulseDot({ color = '#22c55e', size = 16 }) {
  return (
    <div className="pulse-wrapper">
      <div
        className="pulse-dot"
        style={{ '--pulse-color': color, '--pulse-size': `${size}px` }}
      />
    </div>
  );
}

export default PulseDot;