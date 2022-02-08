export interface ICard {
  pack_code: string;
  pack_name: string;
  type_code: string;
  type_name: string;
  faction_code: string;
  faction_name: string;
  card_set_code: string;
  card_set_name: string;
  card_set_type_name_code: string;
  position: number;
  code: string;
  name: string;
  real_name: string;
  text: string;
  real_text: string;
  quantity: number;
  hand_size: number;
  health: number;
  health_per_hero: boolean;
  recover: number;
  base_threat_fixed: boolean;
  escalation_threat_fixed: boolean;
  threat_fixed: boolean;
  deck_limit: number;
  traits: string;
  real_traits: string;
  flavor: string;
  is_unique: boolean;
  hidden: boolean;
  permanent: boolean;
  double_sided: boolean;
  octgn_id: string;
  url: string;
  imagesrc: string;
  linked_card: ILinkedCard;
}
export interface ILinkedCard {
  pack_code: string;
  pack_name: string;
  type_code: string;
  type_name: string;
  faction_code: string;
  faction_name: string;
  card_set_code: string;
  card_set_name: string;
  card_set_type_name_code: string;
  id: number;
  position: number;
  set_position: string | null;
  code: string;
  name: string;
  real_name: string;
  subname: string | null;
  cost: string | null;
  text: string;
  real_text: string;
  boost: string | null;
  boost_text: string | null;
  real_boost_text: string | null;
  quantity: number;
  resource_energy: string | null;
  resource_physical: string | null;
  resource_mental: string | null;
  resource_wild: string | null;
  hand_size: number;
  health: number;
  health_per_hero: boolean;
  thwart: string | null;
  thwart_cost: string | null;
  scheme: string | null;
  scheme_text: string | null;
  attack: string | null;
  attack_text: string | null;
  attack_cost: string | null;
  defense: string | null;
  defense_cost: string | null;
  recover: number;
  recover_cost: string | null;
  base_threat: string | null;
  base_threat_fixed: boolean;
  escalation_threat: string | null;
  escalation_threat_fixed: boolean;
  scheme_crisis: string | null;
  scheme_acceleration: string | null;
  scheme_hazard: string | null;
  threat: string | null;
  threat_fixed: boolean;
  deck_limit: number;
  stage: string | null;
  traits: string;
  real_traits: string;
  deck_requirements: string | null;
  deck_options: string | null;
  restrictions: string | null;
  flavor: string;
  illustrator: string | null;
  is_unique: boolean;
  hidden: boolean;
  permanent: boolean;
  double_sided: boolean;
  back_text: string | null;
  back_flavor: string | null;
  back_name: string | string | null;
  octgn_id: string;
  url: string;
  imagesrc: string;
}
