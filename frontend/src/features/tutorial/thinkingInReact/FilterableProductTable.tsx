import { useState } from "react";
import ProductTable from "./ProductTable";
import SearchBar from "./SearchBar";
import type { Product } from "./mockup";

const FilterableProductTable: React.FC<{ products: Product[] }> = ({ products }) => {
  const [filterText, setFilterText] = useState<string>("");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={setFilterText}
        inStockOnly={inStockOnly}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
    </div>
  );
};
export default FilterableProductTable;
