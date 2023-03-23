import "server-only";

const ids = new Set();

const prefix = String.fromCharCode(97 + Math.floor(Math.random() * 26));

export function getId(): string {
  const id = Math.random().toString(36).substring(2, 7);
  if (ids.has(id)) {
    return getId();
  }
  return prefix + id;
}
