/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */


module.exports = {
  ssr: false,
  target: 'static',
  head: {
    title: 'cykla',
    meta: [{ charset: "utf-8" }]
  },
  css: [
    // CSS file in the project
    '@/assets/css/main.css',
  ],
  loading: false,
  plugins: [
    {ssr: true, src: '@/plugins/icons.js'},
    {ssr: true, src: '@/plugins/buefy.js'},
    {ssr: true, src: '@/plugins/model.js'}    
  ],
  buildModules: [
    '@nuxtjs/localforage',
  ],

  ssr: true,
  target: 'server',
  
  modules: [
    '@nuxtjs/i18n',
    'cookie-universal-nuxt',
  ],

    i18n: {
      locales: ['en', 'fr', 'es'],
      defaultLocale: 'fr',
      vueI18n: {
        fallbackLocale: 'fr',
        messages: {
          en: {
            con_av: 'Welcome'
          },
          fr: {
            con_av: 'Connexion avancee',
            ann_sco: 'Annee scolaire',
            login: 'Identifiant',
            mdp: 'Mot de passe',
            server:'Serveur',
            se_conn:'Se connecter',


          },
          es: {
            con_av: 'Bienvenido'
          }
        }
      }
    }

};
