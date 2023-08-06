import { ActionType } from "../../interfaces";
import {
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAIL,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAIL,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  FILTER_REVIEWS_SUCCESS,
  FILTER_REVIEWS_FAIL,
} from "../actions/types";
export interface ReviewType {
  rating: number;
  comment: string;
  date_created?: any;
}

export interface StateTypesReviews {
  reviews: ReviewType[] | null;
  review: ReviewType | null;
}

const initialState: StateTypesReviews = {
  reviews: null,
  review: null,
};

export default function Reviews(
  state: StateTypesReviews = initialState,
  action: ActionType
) {
  const { type, payload } = action;

  switch (type) {
    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: payload.reviews,
      };
    case GET_REVIEWS_FAIL:
      return {
        ...state,
        reviews: [],
      };
    case GET_REVIEW_SUCCESS:
      return {
        ...state,
        review: payload.review,
      };
    case GET_REVIEW_FAIL:
      return {
        ...state,
        review: {},
      };
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        review: payload.review,
        reviews: payload.reviews,
      };
    case CREATE_REVIEW_FAIL:
      return {
        ...state,
        review: {},
      };
    case UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        review: payload.review,
        reviews: payload.reviews,
      };
    case UPDATE_REVIEW_FAIL:
      return {
        ...state,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        review: {},
        reviews: payload.reviews,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
      };
    case FILTER_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: payload.reviews,
      };
    case FILTER_REVIEWS_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
