import React from "react";
import SearchBar from "./SearchBar";
import UserInfo from "./UserInfo";

const SearchAndUser = () => {
  return (
    <div className="flex items-start justify-between">
      <SearchBar />
      <UserInfo />
    </div>
  );
};

export default SearchAndUser;
