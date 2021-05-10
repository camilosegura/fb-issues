import './Selected.css';

export default function Selected({ title, labels, state, userAvatar}) {
  return (
    <div className="selected">
      <div>
        <div className="avatar" style={{ backgroundImage: `url(${userAvatar})` }}></div>
        <p className="status">{state}</p>
      </div>
      <div>
        <div className="container">
          <span>{title}</span>
          {labels.map(({ name, color }) => (
            <span
              key={name}
              className="label"
              style={{ color: `#${color}`, border: `1px solid #${color}`}}
            >
              {name}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}
