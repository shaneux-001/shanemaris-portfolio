export const TOOL_THEME_KEY = 'daedalus-theme';

/** Inline, pre-paint: apply the tool's stored explicit theme before React hydrates. */
export const TOOL_THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('${TOOL_THEME_KEY}');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-ks-theme',t);}catch(e){}})();`;
