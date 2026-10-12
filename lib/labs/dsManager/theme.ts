export const KEYSTONE_THEME_KEY = 'keystone-theme';

/** Inline, pre-paint: apply a stored explicit Keystone theme before React hydrates. */
export const KEYSTONE_THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('${KEYSTONE_THEME_KEY}');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-ks-theme',t);}catch(e){}})();`;
