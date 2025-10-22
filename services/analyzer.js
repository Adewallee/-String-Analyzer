module.exports = function analyze(value) {
  const length = value.length;
  const is_palindrome = value.toLowerCase() === value.toLowerCase().split('').reverse().join('');
  const unique_characters = new Set(value).size;
  const word_count = value.trim().split(/\s+/).length;

  const character_frequency_map = {};
  for (let char of value) {
    character_frequency_map[char] = (character_frequency_map[char] || 0) + 1;
  }

  return {
    length,
    is_palindrome,
    unique_characters,
    word_count,
    character_frequency_map
  };
};