export interface ServiceVO {
  service_key: number;
  service_name: string;
  service_type: string;
  service_en: string;
  index: number;
  icon: string;

  childService: ServiceVO[];
  child_service_key: number;

  su_key: number;
  ut_key: number;
}
