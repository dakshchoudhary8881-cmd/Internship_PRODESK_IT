import { useEffect, useCallback } from 'react';

export function useEnterNavigation(formRef, onAdvanceEnd) {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key !== 'Enter') return;

      const target = event.target;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'SELECT';

      if (!isInput || target.type === 'button' || target.type === 'submit') {
        return;
      }

      event.preventDefault();

      if (!formRef || !formRef.current) return;

      const focusableSelectors = 'input:not([disabled]):not([type="hidden"]), select:not([disabled])';
      const focusableElements = Array.from(formRef.current.querySelectorAll(focusableSelectors));
      const currentIndex = focusableElements.indexOf(target);

      if (currentIndex > -1 && currentIndex < focusableElements.length - 1) {
        const nextElement = focusableElements[currentIndex + 1];
        nextElement.focus();
      } else if (currentIndex === focusableElements.length - 1 && typeof onAdvanceEnd === 'function') {
        onAdvanceEnd();
      }
    },
    [formRef, onAdvanceEnd]
  );

  useEffect(() => {
    const formElement = formRef?.current;
    if (!formElement) return;

    formElement.addEventListener('keydown', handleKeyDown);
    return () => {
      formElement.removeEventListener('keydown', handleKeyDown);
    };
  }, [formRef, handleKeyDown]);
}
