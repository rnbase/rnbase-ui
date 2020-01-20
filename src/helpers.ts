export function inRange(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

export function getRadius(value: number | string, height: number): number {
  if (typeof value === 'string') {
    const match = value.match(/^([0-9]|[1-4][0-9]|50)%$/);
    const percent = match ? parseInt(match[0], 10) : 0;

    return (height * percent) / 100;
  }

  return value;
}

export function getColor(string: string): string {
  let hash = 0;

  if (string.length > 0) {
    for (let i = 0; i < string.length; i += 1) {
      /* eslint-disable no-bitwise */
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
      hash &= hash;
      /* eslint-enable no-bitwise */
    }
  }

  return `hsl(${hash % 360}, 75%, 50%)`;
}

export function getInitials(name: string): string {
  const initials = name.match(/\b\w/g) || [];

  return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
}
