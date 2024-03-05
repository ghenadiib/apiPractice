interface Product{
    id: number;
    title: string;
    description: string;
  }
  
interface ProductContextType {
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  
  }