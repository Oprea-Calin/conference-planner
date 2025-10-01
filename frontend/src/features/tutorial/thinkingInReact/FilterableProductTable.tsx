import ProductTable from "./ProductTable";
import SearchBar from "./SearchBar";
import type { Product } from "./mockup";

const FilterableProductTable: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
};
export default FilterableProductTable;
