type HrefValueProps = {type: string; value: string};

export default function setHrefValue(options: HrefValueProps) {
  const attrType = options.type.trim().toUpperCase();
  const attrValue = options.value.trim();

  switch (attrType) {
    case 'PHONE':
      return `tel:${attrValue}`;
    case 'EMAIL':
      return `mailto:${attrValue}`;
    default:
      return attrValue;
  }
}
