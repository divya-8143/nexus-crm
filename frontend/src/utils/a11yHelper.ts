// Accessibility and Color Contrast Utility
export class AccessibilityHelper {
  public static getHighContrastBadge(status: string): string {
    return status === 'Delivered' ? 'border-2 border-emerald-400 font-bold' : 'border border-slate-700';
  }
}
