export function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomCharFromWords(words) {
  const word = pickRandom(words);
  let char = pickRandom(word.split(""));
  if (/[a-zA-Z]/.test(char)) {
    char = Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
  }
  return char;
}

export function isPrintable(key) {
  return (
    key.length === 1 &&
    /^[a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]$/.test(key)
  );
}
