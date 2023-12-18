declare type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | {[key: string]: JSONValue};

declare interface JSONObject {
  [k: string]: JSONValue;
}

declare type JSONArray = Array<JSONValue>;

interface City {
  name: string;
  lat: string;
  lng: string;
  country: string;
  admin1: string;
  admin2?: string;
  countryInfo?: CountryInfo;
}

interface CountryInfo {
  name: string;
  native: string;
  phone: number[];
  continent: string;
  capital: string;
  currency: string[];
  languages: string[];
}
