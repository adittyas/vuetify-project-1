<template>
  <nav>
    <!-- snackbar -->
    <v-snackbar v-model="snackbar" top color="secondary" :timeout="3000">
      {{ text }}
      <v-btn color text @click="snackbar = false">
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
    </v-snackbar>
    <!-- toolbars -->
    <v-app-bar flat app color="teal lighten-4 grey--text text--darken-2">
      <v-app-bar-nav-icon @click="drawer = !drawer "></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="font-weight-thin">Admin</span>
        <span>Aditya</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text color="grey" v-on="on" @click="iconTrigger = !iconTrigger">
            <v-icon left>{{iconTrigger? 'mdi-folder-open': 'mdi-folder'}}</v-icon>
            <span>More</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="link in items" :key="link.text" route :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text color="grey">
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- navigation drawer -->
    <v-navigation-drawer app dark v-model="drawer" color="primary">
      <v-row no-gutters class="pa-3" justify="center">
        <v-avatar size="128" color="grey">
          <img src="assets/images/avatar-5.svg" alt="avatar" />
        </v-avatar>
      </v-row>
      <div class="headline text-center white--text">Aditya</div>
      <v-row class="py-3" justify="center">
        <Popup @ProjectAdded="snackbar = true" />
      </v-row>
      <v-list shaped>
        <v-list-item-group v-model="item">
          <v-list-item v-for="(item, i) in items" :key="i" route :to="item.route" dense>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import Popup from "./Popup";

export default {
  components: {
    Popup
  },
  data: () => ({
    drawer: false,
    item: 1,
    iconTrigger: false,
    items: [
      { text: "Dashboard", icon: "mdi-home", route: "/" },
      { text: "My Project", icon: "mdi-briefcase", route: "/project" },
      { text: "Team", icon: "mdi-account-group", route: "/team" }
    ],
    snackbar: false,
    text: "New project added,"
  })
};
</script>