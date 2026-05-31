export function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomCharFromWords(words) {
  const word = pickRandom(words);
  return pickRandom(word.split(""));
}

export function isPrintable(key) {
  return (
    key.length === 1 &&
    /^[a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]$/.test(key)
  );
}