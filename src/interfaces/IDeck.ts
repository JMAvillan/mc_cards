export default interface IDeck {
  id: number;
  name: string;
  date_creation: Date | string | number;
  date_update: Date | string | number;
  description_md: string;
  user_id: number;
  investigator_code: string;
  investigator_name: string;
  slots: {};
  ignoreDeckLimitSlots: null;
  version: number;
  meta: { aspect: string };
  tags: string;
}
