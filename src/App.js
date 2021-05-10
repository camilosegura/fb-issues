import React, { useEffect } from 'react';
import debounce from 'lodash.debounce';
import issueService from './services/issueService';
import InfiniteSelect from './components/InfiniteSelect';
import Selected from './components/Selected';
import './App.css';

function App() {
  const [collection, setCollection] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [totalRows, setTotalRows] = React.useState(0);
  const [selectedIssue, setSelectedIssue] = React.useState(null);

  function loadMoreRows() {
    issueService.nextPage()
      .then(({ data }) => {
        setCollection((prevCollection) => [...prevCollection, ...data.items]);
      })
      .catch(e => console.log('ERROR: ', e));
  }

  function onSearch(text) {
    issueService.search(text)
      .then(({ data }) => {
        setTotalRows(data.total_count);
        setCollection(data.items);
      })
      .catch(e => console.log('ERROR: ', e));
  }
  const debounceLoadMoreRows = React.useCallback(debounce(loadMoreRows, 1000, {
    'trailing': true,
  }), []);
  const debounceSearch = React.useCallback(debounce(onSearch, 1000, {
    'trailing': true,
  }), []);

  function search(event) {
    const text = event.target.value;

    setValue(text);
  }

  useEffect(() => {
    if (value.length) {
      debounceSearch(value);
    } else {
      setCollection([]);
    }

    return debounceSearch.cancel;
  }, [value])

  function onSelect(collectionIndex) {
    setSelectedIssue(collection[collectionIndex]);
  }

  return (
    <div className="App App-body">
      <div className="App-container">
        <InfiniteSelect
          collection={collection}
          loadMoreRows={debounceLoadMoreRows}
          value={value}
          onChange={search}
          onSelect={onSelect}
          totalRows={totalRows}
        />
        { selectedIssue && <Selected
            title={selectedIssue.title}
            labels={selectedIssue.labels}
            state={selectedIssue.state}
            userAvatar={selectedIssue.user?.avatar_url}
          />
        }
      </div>
    </div>
  );
}

export default App;
