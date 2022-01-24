import { CARDS } from "../constants";
import ICardList from "../interfaces/ICardList";
import ICard from "../interfaces/ICard";

const tempDeck: ICard = {
  pack_code: "",
  pack_name: "",
  type_code: "",
  type_name: "",
  faction_code: "",
  faction_name: "",
  card_set_code: "",
  card_set_name: "",
  card_set_type_name_code: "",
  position: NaN,
  code: "",
  name: "",
  real_name: "",
  text: "",
  real_text: "",
  quantity: NaN,
  hand_size: NaN,
  health: NaN,
  health_per_hero: false,
  recover: NaN,
  base_threat_fixed: false,
  escalation_threat_fixed: false,
  threat_fixed: false,
  deck_limit: NaN,
  traits: "",
  real_traits: "",
  flavor: "",
  is_unique: false,
  hidden: false,
  permanent: false,
  double_sided: false,
  octgn_id: "",
  url: "",
  imagesrc: "",
  linked_card: {
    pack_code: "",
    pack_name: "",
    type_code: "",
    type_name: "",
    faction_code: "",
    faction_name: "",
    card_set_code: "",
    card_set_name: "",
    card_set_type_name_code: "",
    id: NaN,
    position: NaN,
    set_position: "",
    code: "",
    name: "",
    real_name: "",
    subname: "",
    cost: "",
    text: "",
    real_text: "",
    boost: "",
    boost_text: "",
    real_boost_text: "",
    quantity: NaN,
    resource_energy: "",
    resource_physical: "",
    resource_mental: "",
    resource_wild: "",
    hand_size: NaN,
    health: NaN,
    health_per_hero: false,
    thwart: "",
    thwart_cost: "",
    scheme: "",
    scheme_text: "",
    attack: "",
    attack_text: "",
    attack_cost: "",
    defense: "",
    defense_cost: "",
    recover: NaN,
    recover_cost: "",
    base_threat: "",
    base_threat_fixed: false,
    escalation_threat: "",
    escalation_threat_fixed: false,
    scheme_crisis: "",
    scheme_acceleration: "",
    scheme_hazard: "",
    threat: "",
    threat_fixed: false,
    deck_limit: NaN,
    stage: "",
    traits: "",
    real_traits: "",
    deck_requirements: "",
    deck_options: "",
    restrictions: "",
    flavor: "",
    illustrator: "",
    is_unique: false,
    hidden: false,
    permanent: false,
    double_sided: false,
    back_text: "",
    back_flavor: "",
    back_name: "",
    octgn_id: "",
    url: "",
    imagesrc: "",
  },
};

const defaultState: ICardList = {
  cards: [tempDeck],
  error: null,

  cardListFetchSuccess: false,
  cardListFetchFailure: false,
};

const cardListReducer = (
  state = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case CARDS.REQUEST_ALL_CARDS_SUCCESS: {
      return {
        ...state,
        cards: action.payload.cards,
        cardListFetchSuccess: true,
      };
    }
    case CARDS.REQUEST_ALL_CARDS_FAILURE: {
      return {
        ...state,
        cardListFetchFailure: true,
        error: action.payload.error,
      };
    }
    case CARDS.REQUEST_ALL_CARDS_RESET: {
      return {
        ...state,
        cardListFetchSuccess: false,
        cardListFetchFailure: false,
        error: null,
      };
    }
    default:
      return state;
  }
};

export { cardListReducer };
