import { onBeforeUnmount, onMounted } from 'vue';

export function useScrollThrottle(callback: () => void, options?: AddEventListenerOptions): void {
  let rafPending = false;

  const handleScroll = () => {
    if (rafPending) return;

    rafPending = true;
    requestAnimationFrame(() => {
      rafPending = false;
      callback();
    });
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true, ...options });
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });
}
