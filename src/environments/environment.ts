// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  entorno: 'dev',
  autenticacion: true,
  notificaciones: false,
  menuApps: false,
  appname: 'arka',
  appMenu: 'arka',
  
  ADMINISTRATIVA_JBPM_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/arka_jbpm/v1',
  ELEMENTO_ARKA_JBPM_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/elemento_arka/v1',
  TOKEN: {
    AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
    CLIENTE_ID: 'e36v1MPQk2jbz9KM4SmKhk8Cyw0a',
    RESPONSE_TYPE: 'id_token token',
    SCOPE: 'openid email',
    REDIRECT_URL: 'http://localhost:4200/',
    SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
    SIGN_OUT_REDIRECT_URL: 'http://localhost:4200/',
    AUTENTICACION_MID: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/autenticacion_mid/v1/token/userRol',
  },
};
