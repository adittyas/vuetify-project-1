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
        <template v-slot:default="props">
          <v-card flat tile v-for="project in props.items" :key="project.id">
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
        </template>
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
    itemsPerPage: 4,
    items: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: "14%",
        iron: "1%"
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: "8%",
        iron: "1%"
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        sodium: 337,
        calcium: "6%",
        iron: "7%"
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: "3%",
        iron: "8%"
      },
      {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        sodium: 327,
        calcium: "7%",
        iron: "16%"
      },
      {
        name: "Jelly bean",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        sodium: 50,
        calcium: "0%",
        iron: "0%"
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        sodium: 38,
        calcium: "0%",
        iron: "2%"
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        sodium: 562,
        calcium: "0%",
        iron: "45%"
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        sodium: 326,
        calcium: "2%",
        iron: "22%"
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        sodium: 54,
        calcium: "12%",
        iron: "6%"
      }
    ]
  }),
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
      console.log(this.projects);
      console.log(this.items);
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