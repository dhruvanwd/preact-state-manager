import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { useEffect, useState } from 'preact/hooks'; // Import from preact/hooks
import { produce } from 'immer';

export function rxStateManager<T>(initialValue: T) {
  const $state = new BehaviorSubject<T>(initialValue);

  const useStateManager = (...keys: Array<keyof T>): T => {
    const [state, setState] = useState<T>($state.value);

    useEffect(() => {
      const subscription = $state
        .pipe(
          distinctUntilChanged((prev, next) => {
            if (keys?.length) {
              const comparedKeys = keys.filter(
                (key) => prev[key] !== next[key]
              );
              return comparedKeys.length === 0;
            }
            return false;
          })
        )
        .subscribe({
          next: setState,
        });

      return () => subscription.unsubscribe();
    }, [keys.length]);

    return state;
  };

  const updateState = (cb: (draft: T) => any) => {
    const updatedClone = produce($state.value, cb);
    console.log(updatedClone);
    $state.next(updatedClone);
  };

  return {
    useStateManager,
    updateState,
    $state,
  };
}
