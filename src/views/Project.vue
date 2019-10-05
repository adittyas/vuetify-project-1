<template>
  <div id="dashboard">
    <h1 class="headline grey--text">Project</h1>

    <v-container class="my-5">
      <v-expansion-panels accordion focusable>
        <v-expansion-panel v-for="project in myProjects" :key="project.id">
          <v-expansion-panel-header v-slot="{ open }">
            <v-row no-gutters>
              <v-col cols="4">{{ project.title }}</v-col>
              <v-col cols="8" class="text--secondary">
                <v-fade-transition leave-absolute>
                  <span v-if="open" key="0">{{project.due}}</span>
                  <span v-else key="1"></span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div>{{project.content}}</div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import db from "@/firebase";
export default {
  data: () => ({
    projects: []
  }),
  computed: {
    myProjects() {
      return this.projects.filter(project => {
        return project.person === "the net ninja";
      });
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
