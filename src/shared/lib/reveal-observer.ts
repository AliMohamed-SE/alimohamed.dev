type RevealCallback = (isIntersecting: boolean) => void;

let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, RevealCallback>();

/**
 * Fire a little before the element's top edge reaches the bottom of the
 * viewport, so the motion plays where the reader can actually see it finish
 * rather than completing just off the bottom of the screen.
 */
const ROOT_MARGIN = "0px 0px -12% 0px";

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        callbacks.get(entry.target)?.(entry.isIntersecting);
      }
    },
    { threshold: 0, rootMargin: ROOT_MARGIN },
  );
  return observer;
}

/**
 * Subscribes one element to the page's single shared reveal observer.
 *
 * Every revealed item is observed on its own — a per-section observer would
 * trigger a whole tall band the instant its first pixel appeared, and the
 * animation would be over before the content was in view.
 */
export function observeReveal(element: Element, callback: RevealCallback): () => void {
  const shared = getObserver();
  callbacks.set(element, callback);
  shared.observe(element);

  return () => {
    callbacks.delete(element);
    shared.unobserve(element);
  };
}
