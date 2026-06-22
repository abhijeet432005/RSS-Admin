import { memo } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/useTheme';

function ThemeToggleBase() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <span className={`theme-toggle__track${isDark ? '' : ' theme-toggle__track--light'}`}>
        <span className="theme-toggle__thumb">
          {isDark ? <Moon size={12} /> : <Sun size={12} />}
        </span>
      </span>
    </button>
  );
}

export default memo(ThemeToggleBase);
