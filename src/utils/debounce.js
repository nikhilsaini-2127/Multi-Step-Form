export default function debounce(func, delay) {
  let timeoutId;
  
  return function (...args) {
    // 1. Reset the timer if the function is called again
    clearTimeout(timeoutId);
    
    // 2. Start a new timer
    timeoutId = setTimeout(() => {
      // 3. Execute with correct context and arguments
      func.apply(this, args);
    }, delay);
  };
}
