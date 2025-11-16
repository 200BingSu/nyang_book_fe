export interface brandVO {
  brand_key: number;
  brand_name: string;
}

export interface typeVO {
  type_key: number;
  type_name: string;
}

export interface attributesVO {
  attributes_key: number;
  attributes_name: string;
}

export interface tasteVO {
  taste_key: number;
  taste_name: string;
}

export interface ProductVO extends brandVO, typeVO, attributesVO, tasteVO {
  product_key: number;
  product_name: string;
  created_at: string;
}
