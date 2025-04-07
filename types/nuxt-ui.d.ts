declare function useToast(): {
  add(toast: Partial<Toast>): Toast;
  update(id: string | number, toast: Partial<Toast>): void;
  remove(id: string | number): void;
  clear(): void;
  toasts: Ref<Toast[]>;
};

interface Toast {
  id: string | number;
  title?: string;
  description?: string;
  color?: string;
  icon?: string;
  // Add other properties as needed
}
