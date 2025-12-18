import { Container } from "./containers";

export const FINISHED_STATUSES = ["отправлен", "отменен", "поломка оборудования"];
export const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function isFinished(container: Container) {
  return FINISHED_STATUSES.includes(container.status);
}

export function isOlderThanAWeek(container: Container) {
  if (!container.sentDate) return false;
  const now = Date.now();
  const sent = new Date(container.sentDate).getTime();
  return now - sent > ONE_WEEK_MS;
}

export function isActive(container: Container) {
  if (!container.sentDate) return true;
  return !isFinished(container) || !isOlderThanAWeek(container);
}

export function filterActiveContainers(containers: Container[]) {
  return containers.filter(isActive);
}

export function filterFinishedOldContainers(containers: Container[]) {
  return containers.filter((c) => isFinished(c) && isOlderThanAWeek(c));
}
