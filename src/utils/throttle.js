export default function throttle(func, delay) {
  let isWaiting = false;

  return function (...args) {
    // If the timeout is active, block further execution
    if (isWaiting) return;

    // Execute the main function immediately (leading edge)
    func.apply(this, args);
    isWaiting = true;

    // Set a timer to clear the block after the delay completes
    setTimeout(() => {
      isWaiting = false;
    }, delay);
  };
}