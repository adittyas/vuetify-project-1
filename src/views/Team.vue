<template>
  <div id="dashboard">
    <h1 class="headline grey--text">Team</h1>
    <v-container class="my-5">
      <v-row>
        <v-col cols="12" sm="6" md="3" v-for="person in team" :key="person.name">
          <v-card flat class="text-center">
            <v-responsive class="pt-4">
              <v-avatar size="96" color="grey">
                <img :src="person.avatar" alt="avatar" />
              </v-avatar>
            </v-responsive>
            <v-card-title v-text="person.name" class="justify-center"></v-card-title>
            <v-card-text v-text="person.role"></v-card-text>
            <v-card-actions>
              <v-btn text color="grey" block>
                <span class="text-capitalize caption">Message</span>
                <v-icon righ small>mdi-send</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    team: [
      {
        name: "The Net Ninja",
        role: "Web developer",
        avatar: "assets/images/avatar-1.svg"
      },
      {
        name: "Ryu",
        role: "Graphic designer",
        avatar: "assets/images/avatar-2.svg"
      },
      {
        name: "Chun Li",
        role: "Web developer",
        avatar: "assets/images/avatar-3.svg"
      },
      {
        name: "Gouken",
        role: "Social media maverick",
        avatar: "assets/images/avatar-4.svg"
      },
      {
        name: "Yoshi",
        role: "Sales guru",
        avatar: "assets/images/avatar-5.svg"
      }
    ]
  })
};
</script>
