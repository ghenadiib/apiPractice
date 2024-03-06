export interface Product{
    id: number;
    title: string;
    description: string;
  }
  
export interface ProductContextType {
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  
  }

  export interface IsSignedInType{
    isSignedIn: boolean,
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>,
  }