export const gtmIframeSrc = config => `https://www.googletagmanager.com/ns.html?id=${config.gtmId || undefined}&gtm_auth=${config.gtmAuth || ''}&gtm_preview=${config.gtmPreview || ''}&gtm_cookies_win=x`

export const gtmIframe = config => `<iframe src="${gtmIframeSrc(config)}" height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>`
