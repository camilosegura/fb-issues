import React from 'react';
import Option from '../Option';
import './InfiniteSelect.css';

export default function InfiniteSelect({ value, onChange, collection, onSelect, loadMoreRows }) {
  const rootElement = React.useRef(null);

  const callback = (entries, observer) => {
    entries.forEach(
      entry => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);

          const index = entry.target.dataset.index;
          const threshold = (collection.length - index) < 6;

          if (threshold) {
            loadMoreRows();
          }
        }
      }
    );
  };

  const observer = new IntersectionObserver(callback, {
    root: rootElement.current,
    threshold: 0.1,
  });

  React.useEffect(() => {
    for (const element of rootElement.current.children) {
      observer.observe(element);
    };
  }, [collection]);

  return (
    <div className="infinite-select">
      <input className="input" value={value} onChange={onChange}  />
      <div className="options" ref={rootElement}>
        {
          collection.map(({
            id,
            title,
            labels,
            number,
            state,
            created_at: createdAt,
            user,
          }, index) => (
            <Option
              key={id}
              onClick={onSelect.bind(null, index)}
              title={title}
              labels={labels}
              number={number}
              state={state}
              createdAt={createdAt}
              userAvatar={user.avatar_url}
              id={id}
              index={index}
            />
          ))
        }
      </div>
    </div>
  );
}
