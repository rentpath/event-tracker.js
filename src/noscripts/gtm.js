export const iframeSrc = config => `//www.googletagmanager.com/ns.html?id=${config.gtmId || undefined}&gtm_auth=${config.gtmAuth || ''}&gtm_preview=${config.gtmPreview || ''}&gtm_cookies_win=x`

export const iframe = config => `<iframe src="${iframeSrc(config)}" height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>`
