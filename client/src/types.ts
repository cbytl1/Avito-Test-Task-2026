export type CardType = {
    id: number;
    category: "auto" | "real_estate" | "electronics";
    title: string;
    price: number;
    needsRevision: boolean;
};

export type CardInfoType = {
    id: number;
    title: string;
    description?: string;
    price: number | null;
    createdAt: string;
    updatedAt: string;
    needsRevision: boolean;
} & (
  | {
      category: 'auto';
      params: AutoItemParams;
    }
  | {
      category: 'real_estate';
      params: RealEstateItemParams;
    }
  | {
      category: 'electronics';
      params: ElectronicsItemParams;
    }
);

type AutoItemParams = {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: 'automatic' | 'manual';
  mileage?: number;
  enginePower?: number;
};

type RealEstateItemParams = {
  type?: 'flat' | 'house' | 'room';
  address?: string;
  area?: number;
  floor?: number;
};

type ElectronicsItemParams = {
  type?: 'phone' | 'laptop' | 'misc';
  brand?: string;
  model?: string;
  condition?: 'new' | 'used';
  color?: string;
};

export type FormData = {
    category: CategoryType;
    title: string;
    price: string;
    description: string;
    params: Record<string, any>;
}

type CategoryType = 'auto' | 'real_estate' | 'electronics' | '';