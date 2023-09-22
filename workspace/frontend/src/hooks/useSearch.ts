import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const searchKeyword = new URLSearchParams(location.search).get('keyword');
  console.log(location);
  console.log(searchKeyword);

  // searchKeyword를 사용하여 검색 결과를 표시하거나 다른 작업을 수행합니다.
}
SearchResults();

let [searchParams, setSearchParams] = useSearchParams();

function handleSubmit(event) {
  event.preventDefault();
  // The serialize function here would be responsible for
  // creating an object of { key: value } pairs from the
  // fields in the form that make up the query.
  let params = serializeFormQuery(event.target);
  setSearchParams(params);
}
