import React from 'react';
import Option from '../Option';
import './InfiniteSelect.css';

export default function InfiniteSelect({ value, onChange, collection, onSelect, open }) {
  return (
    <div className="infinite-select">
      <input className="input" value={value} onChange={onChange}  />
      {open && <div className="options">
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
              />
            ))
          }
        </div>
      }
    </div>
  );
}
