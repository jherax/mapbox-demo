export default function trim(text?: string | null): string {
  if (!text) {
    return '';
  }
  return text.trim();
}
