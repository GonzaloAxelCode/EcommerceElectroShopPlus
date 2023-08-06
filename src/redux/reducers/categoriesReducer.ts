import { ActionType } from "../../interfaces";
import { GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAIL } from "../actions/types";
export interface CategoryType {
  sub_categories: CategoryType[] | any[];
  parent?: string;
  id: string;
  name: string;
}
export interface StateTypesCategories {
  categories: CategoryType[] | null;
}
const initialState: StateTypesCategories = {
  categories: null,
};

export default function Categories(
  state: StateTypesCategories = initialState,
  action: ActionType
) {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload.categories,
      };
    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        categories: null,
      };
    default:
      return {
        ...state,
      };
  }
}
