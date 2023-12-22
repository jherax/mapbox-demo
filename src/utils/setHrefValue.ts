import trim from './trim';

type HrefValueProps = {type: string; value: string};

export default function setHrefValue(options: HrefValueProps) {
  const attrType = trim(options.type).toUpperCase();
  const attrValue = trim(options.value);

  switch (attrType) {
    case 'PHONE':
      return `tel:${attrValue}`;
    case 'EMAIL':
      return `mailto:${attrValue}`;
    default:
      return attrValue;
  }
}
