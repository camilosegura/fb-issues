import './Option.css';

export default function Option({ onClick, title, labels, number, state, createdAt, userAvatar }) {
  return (
    <button
      className="option"
      onClick={onClick}
    >
      <div>
        <div className="avatar" style={{ backgroundImage: `url(${userAvatar})` }}></div>
        <p className="status">{state}</p>
      </div>
      <div>
        <div>
          <span>{title}</span>
          {labels.map(({ name, color }) => (
            <span
              className="label"
              style={{ color: `#${color}`, border: `1px solid #${color}`}}
            >
              {name}
            </span>
          ))}
        </div>

      </div>
    </button>
  );
}
