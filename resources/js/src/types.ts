export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  code: string;
  products: Product[];
  created_at: string;
  updated_at: string;
}

export interface Props {
  products: {
    data: Product[];
    links: {
      url: string | undefined;
      label: string;
      active: boolean;
    }[];
    prev_page_url: string | null;
    next_page_url: string | null;
    first_page_url: string | null;
    last_page_url: string | null;
    current_page: string | null;
    last_page: string | null;
  };
  transactions: {
    data: Transaction[];
    links: { url: string | null; label: string; active: boolean }[];
    prev_page_url: string | null;
    next_page_url: string | null;
    first_page_url: string | null;
    last_page_url: string | null;
    current_page: string | null;
    last_page: string | null;
  };
}
