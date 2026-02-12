export function init() {
  try {
    // eslint-disable-next-line no-console
    console.log("Analytics initialized (stub)");
  } catch (e) {
    // ignore
  }
}

export function trackEvent(name, data) {
  // eslint-disable-next-line no-console
  console.log("trackEvent", name, data);
}
