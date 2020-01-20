export function inRange(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

export function getRadius(value: number | string, height: number) {
  if (typeof value === 'string') {
    const match = value.match(/^([0-9]|[1-4][0-9]|50)%$/);
    const percent = match ? parseInt(match[0], 10) : 0;

    return (height * percent) / 100;
  }

  return value;
}
