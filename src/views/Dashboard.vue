<template>
  <div id="dashboard">
    <h1 class="headline grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-row no-gutters class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn text color="grey" @click="sortBy('title')" v-on="on">
              <v-icon left>mdi-briefcase</v-icon>
              <span class="caption text-lowercase">By Project</span>
            </v-btn>
          </template>
          <span class="text-capitalize">Sort Data by Project Name</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn text color="grey" @click="sortBy('person')" v-on="on">
              <v-icon left>mdi-account</v-icon>
              <span class="caption text-lowercase">By Person</span>
            </v-btn>
          </template>
          <span class="text-capitalize">Sort Data by Person Name</span>
        </v-tooltip>
      </v-row>

      <v-data-iterator
        :items="projects"
        :items-per-page.sync="itemsPerPage"
        :footer-props="{ itemsPerPageOptions }"
      >
        <v-card flat tile v-for="project in projects" :key="project.id" v-slot:default="props">
          <v-row no-gutters class="pa-3" :class="`project ${project.status}`">
            <v-col cols="12" sm="12" md="6">
              <div class="caption grey--text">Project Title</div>
              <div>{{project.title}}</div>
            </v-col>
            <v-col cols="6" sm="4" md="2">
              <div class="caption grey--text">Person</div>
              <div>{{project.person}}</div>
            </v-col>
            <v-col cols="6" sm="4" md="2">
              <div class="caption grey--text">Due By</div>
              <div>{{project.due}}</div>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              md="2"
              class="d-flex justify-start justify-sm-center align-center"
            >
              <div class="right">
                <v-chip small :class="`v-chip ${project.status}`" dark>
                  {{project.status}}
                  <v-avatar right v-if="project.status==='complete'">
                    <v-icon small>mdi-checkbox-marked-circle</v-icon>
                  </v-avatar>
                </v-chip>
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </v-card>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
import db from "@/firebase";

export default {
  data: () => ({
    projects: [],
    itemsPerPageOptions: [4, 8, 12],
    itemsPerPage: 4
  }),
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }
  },
  created() {
    db.collection("project").onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(e => {
        if (e.type === "added") {
          this.projects.push({
            ...e.doc.data(),
            id: e.doc.id
          });
        }
      });
    });
  }
};
</script>
<style scoped>
.project.ongoing {
  border-left: 4px solid goldenrod;
}
.project.complete {
  border-left: 4px solid royalblue;
}
.project.overdue {
  border-left: 4px solid tomato;
}
.v-chip.ongoing {
  background-color: goldenrod;
}
.v-chip.complete {
  background-color: royalblue;
}
.v-chip.overdue {
  background-color: tomato;
}
</style>