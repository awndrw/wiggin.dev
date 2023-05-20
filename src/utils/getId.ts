import "server-only";

const prefix = String.fromCharCode(97 + Math.floor(Math.random() * 26));
let index = 0;

export function getId(): string {
  return `${prefix}${index++}`;
}
