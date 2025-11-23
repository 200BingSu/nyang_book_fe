export interface RawItem {
  brand_key: number; // 브랜드 ID
  brand_name: string; // 브랜드명

  product_key: number | null; // 상품 ID
  created_at: string | null; // 생성 시각(ISO string)
  product_name: string | null; // 상품명

  type_key: number | null; // 상품 유형 key
  type_name: string | null; // 상품 유형명

  attributes_key: number | null; // 속성 Key
  attributes_name: string | null; // 속성명

  taste_key: number | null; // 맛 key
  taste_name: string | null; // 맛 이름

  // 조인 중복 컬럼 정리된 버전
  product_type_key?: number | null;
  attribute_key?: number | null;
  taste_attribute_key?: number | null;
}

export interface OptionItem {
  label: string;
  value: string | number;
}

export interface GroupedItem {
  label: string;
  title: string;
  options: OptionItem[];
}

export function toGroupedOptions(list: RawItem[]): GroupedItem[] {
  const map: Record<number, GroupedItem> = {};

  list.forEach(item => {
    const { brand_key, brand_name, product_name, product_key } = item;

    if (!map[brand_key]) {
      map[brand_key] = {
        label: brand_name,
        title: brand_name,
        options: [],
      };
    }

    if (product_name && product_name.trim() !== "") {
      map[brand_key].options.push({
        label: product_name,
        value: product_key as string | number,
      });
    }
  });

  return Object.values(map);
}
