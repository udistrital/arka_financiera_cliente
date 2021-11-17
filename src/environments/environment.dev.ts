export const environment = {
    production: true,
    entorno: 'test',
    autenticacion: true,
    notificaciones: false,
    menuApps: true,
    appname: 'arka',
    appMenu: 'arka',
    NUXEO: {
      PATH: 'https://documental.udistrital.edu.co/nuxeo/',
  },
  ADMINISTRATIVA_JBPM_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_jbpm/v1/',
    TOKEN: {
      AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
      CLIENTE_ID: 'Wr8pla31bD51cT_IPEis1e_Opt4a',
      RESPONSE_TYPE: 'id_token token',
      SCOPE: 'openid email',
      REDIRECT_URL: 'http://localhost',
      SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
      SIGN_OUT_REDIRECT_URL: 'http://localhost',
      AUTENTICACION_MID: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/autenticacion_mid/v1/token/userRol',
    },
  };
