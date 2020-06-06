export const FETCH_DESCRIBE = "FETCH_DESCRIBE";
export const METADATALIST_EXPORT = "METADATALIST_EXPORT";
export const HIDE_SPINNER = "HIDE_SPINNER";
export const SHOW_SPINNER = "SHOW_SPINNER";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";

export function fetchDescribe(value) {
  return {
    type: FETCH_DESCRIBE,
    value,
  };
}
export function fetchMetadatalist(value) {
  return {
    type: METADATALIST_EXPORT,
    value,
  };
}

export function hideSpinner() {
  return {
    type: HIDE_SPINNER,
  };
}

export function showSpinner() {
  return {
    type: SHOW_SPINNER,
  };
}
