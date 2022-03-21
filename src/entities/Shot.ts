import { Shot } from "../../generated/schema";

export function ensureShot(id: string): Shot {
  let shot = Shot.load(id);
  if (shot) {
    return shot;
  }

  shot = new Shot(id);

  return shot;
}
