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
