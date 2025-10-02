const SearchBar: React.FC<{
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (text: string) => void;
  onInStockOnlyChange: (inStock: boolean) => void;
}> = ({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) => {
  const handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterTextChange(e.target.value);
  };
  const handleInStockOnlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInStockOnlyChange(e.target.checked);
  };
  return (
    <form>
      <input type="text" placeholder="Search..." value={filterText} onChange={handleFilterTextChange} />
      <br /> {/*(e) => onFilterTextChange(e.target.value)*/}
      <label>
        <input type="checkbox" checked={inStockOnly} onChange={handleInStockOnlyChange} /> Only show products in stock{" "}
        {/*(e) => onInStockOnlyChange(e.target.checked)*/}
      </label>
    </form>
  );
};

export default SearchBar;
