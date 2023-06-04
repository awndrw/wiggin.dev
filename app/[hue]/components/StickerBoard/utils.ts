export interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function overlaps(a: Rect, b: Rect) {
  const noHorizontalOverlap =
    a.left >= b.left + b.width || b.left >= a.left + a.width;
  const noVerticalOverlap =
    a.top >= b.top + b.height || b.top >= a.top + a.height;
  return !(noHorizontalOverlap || noVerticalOverlap);
}

export function contains(a: Rect, b: Rect) {
  return !(
    b.left < a.left ||
    b.top < a.top ||
    b.left + b.width > a.left + a.width ||
    b.top + b.height > a.top + a.height
  );
}
