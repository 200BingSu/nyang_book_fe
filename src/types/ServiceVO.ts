export interface ServiceVO {
  service_key: number;
  service_name: string;
  service_type: string;
  service_en: string;
  index: number;
  icon: string;

  childService: ServiceVO[];
  child_service_key: number;

  parent_service_key: number;
  parent_service_name: string;
  parent_service_en: string;
  child_service_name: string;
  child_service_en: string;

  su_key: number;
  ut_key: number;
}
