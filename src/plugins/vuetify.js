import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: colors.teal.darken4,
        secondary: colors.teal.darken1,
        warning: colors.lime.darken1,
        error: colors.deepOrange.darken1,
        info: colors.green.darken1,
        word: '#212121',
      },
      dark: {
        primary: colors.teal.darken4,
        secondary: colors.teal.darken1,
        warning: colors.lime.darken1,
        error: colors.deepOrange.darken1,
        info: colors.green.darken1,
        word: '#fffafa',
      },
    },
  },
});