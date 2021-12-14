export const environment = {
    production: false,
    entorno: 'test',
    autenticacion: true,
    notificaciones: false,
    menuApps: false,
    appname: 'arka',
    appMenu: 'arka',
    ADMINISTRATIVA_JBPM_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/arka_jbpm/v1',
    ELEMENTO_ARKA_JBPM_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/elemento_arka/v1',
    TOKEN: {
        AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
        CLIENTE_ID: '1Jbj540nU90EGQkaXQSRjWV2DDIa',
        RESPONSE_TYPE: 'id_token token',
        SCOPE: 'openid email',
        REDIRECT_URL: 'https://pruebasarkafinanciera.portaloas.udistrital.edu.co',
        SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
        SIGN_OUT_REDIRECT_URL: 'https://pruebasarkafinanciera.portaloas.udistrital.edu.co',
        AUTENTICACION_MID: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/autenticacion_mid/v1/token/userRol',
    },
};

