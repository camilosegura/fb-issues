import React from 'react';
import throttle from 'lodash.throttle';
import issueService from './services/issueService';
import InfiniteSelect from './components/InfiniteSelect';
import './App.css';

function App() {
  const [collection, setCollection] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);

  function loadMoreRows() {
    issueService.nextPage()
      .then(({ data }) => {
        setCollection((prevCollection) => [...prevCollection, ...data.items]);
        setOpen(true);
      })
      .catch(e => console.log('ERROR: ', e));
  }

  function onSearch(text) {
    issueService.search(text)
      .then(({ data }) => {
        setCollection(data.items);
        setOpen(true);
      })
      .catch(e => console.log('ERROR: ', e));
  }

  const throttleSearch = throttle(onSearch, 500);

  function search(event) {
    const text = event.target.value;

    setValue(text);

    if (text.length) {
      throttleSearch(text);
    } else {
      setCollection([]);
    }

  }

  function onSelect(collectionIndex) {
    console.log('selected', collection[collectionIndex]);
    setOpen(false);
  }

  return (
    <div className="App App-body">
      <InfiniteSelect collection={collection} loadMoreRows={loadMoreRows} value={value}  onChange={search} onSelect={onSelect} open={open} />
    </div>
  );
}

export default App;
