import { ref, onMounted, onUnmounted } from 'vue';

/** Public streams with simple fallback rotation if the current source fails. */
const STREAM_URLS = ['https://radio.plaza.one/mp3', 'https://stream.live.vc.bbcmedia.co.uk/bbc_6music'];

const isPlaying = ref(false);
const volume = ref(0.4);
const isMutedByAutoplayPolicy = ref(false);
const isAutoplayPending = ref(false);
const hasStreamError = ref(false);
let audio: HTMLAudioElement | null = null;
let autoplayListenerAttached = false;
let currentStreamIdx = 0;
const interactionEvents = ['click', 'keydown', 'touchstart'];

function applyAudioDefaults(player: HTMLAudioElement) {
  player.loop = false;
  player.volume = volume.value;
  player.preload = 'auto';
  player.setAttribute('playsinline', '');
  player.setAttribute('webkit-playsinline', '');
}

function getAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio(STREAM_URLS[currentStreamIdx]);
    applyAudioDefaults(audio);
  }
  return audio;
}

function rotateStreamSource(): boolean {
  if (currentStreamIdx >= STREAM_URLS.length - 1) return false;
  currentStreamIdx += 1;
  const player = getAudio();
  player.pause();
  player.src = STREAM_URLS[currentStreamIdx];
  player.load();
  hasStreamError.value = false;
  return true;
}

async function tryPlay(forceMuted = false): Promise<boolean> {
  const maxAttempts = STREAM_URLS.length;
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      const player = getAudio();
      player.muted = forceMuted;
      await player.play();
      isAutoplayPending.value = false;
      isMutedByAutoplayPolicy.value = forceMuted;
      isPlaying.value = true;
      hasStreamError.value = false;
      return true;
    } catch {
      isPlaying.value = false;
      hasStreamError.value = true;
      if (!rotateStreamSource()) return false;
    }
  }
  return false;
}

function scheduleAutoplayRecovery() {
  if (autoplayListenerAttached) return;
  autoplayListenerAttached = true;

  const cleanup = () => {
    interactionEvents.forEach((evt) => window.removeEventListener(evt, onInteraction, { capture: true }));
    autoplayListenerAttached = false;
  };
  const onInteraction = async () => {
    const player = getAudio();

    if (isMutedByAutoplayPolicy.value) {
      player.muted = false;
      isMutedByAutoplayPolicy.value = false;
      cleanup();

      return;
    }

    await tryPlay();
    cleanup();
  };

  interactionEvents.forEach((evt) => window.addEventListener(evt, onInteraction, { once: true, capture: true }));
}

export function useMusicPlayer() {
  onMounted(async () => {
    const startedMuted = await tryPlay(true);

    if (startedMuted) {
      scheduleAutoplayRecovery();
      return;
    }

    isAutoplayPending.value = true;
    scheduleAutoplayRecovery();
  });

  const toggle = async () => {
    if (isPlaying.value && isMutedByAutoplayPolicy.value) {
      const player = getAudio();

      player.muted = false;
      isMutedByAutoplayPolicy.value = false;
      isAutoplayPending.value = false;

      return;
    }

    if (isPlaying.value) {
      const player = getAudio();

      player.pause();
      player.muted = false;
      isPlaying.value = false;
      isMutedByAutoplayPolicy.value = false;
      isAutoplayPending.value = false;
    } else {
      await tryPlay();
    }
  };

  const setVolume = (val: number) => {
    volume.value = val;
    if (audio) audio.volume = val;
  };

  onUnmounted(() => {
    if (!isPlaying.value && audio) {
      audio.src = '';
      audio = null;
    }
  });

  return {
    isPlaying,
    volume,
    isMutedByAutoplayPolicy,
    isAutoplayPending,
    hasStreamError,
    toggle,
    setVolume,
  };
}
