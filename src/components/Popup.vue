<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn
        tile
        depressed
        color="gray lighten-2"
        dark
        v-on="on"
        class="text-capitalize"
      >New Project</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Add New Project</v-card-title>
      <v-form ref="form" lazy-validation class="px-5 pt-5">
        <v-text-field
          v-model="title"
          prepend-icon="mdi-format-title"
          name="title"
          label="Title"
          id="title"
          :rules="titleRule"
        ></v-text-field>
        <v-textarea
          v-model="content"
          prepend-icon="mdi-lead-pencil"
          name="content"
          label="Content"
          hint="Hint text"
          :rules="titleRule"
        ></v-textarea>
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="formatDate"
              prepend-icon="mdi-calendar-range"
              v-on="on"
              class="text-capitalize"
              :rules="titleRule"
            >New Project</v-text-field>
          </template>
          <v-date-picker v-model="due" color="green lighten-1"></v-date-picker>
        </v-menu>
        <v-divider></v-divider>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text :loading="loading" @click="submit">Add Project</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import format from "date-fns/format";
import db from "@/firebase";
export default {
  data: () => ({
    loading: false,
    dialog: false,
    loader: null,
    title: "",
    content: "",
    due: null,
    titleRule: [
      v => !!v || "Required",
      v => v.length >= 4 || "Name must be more than 4  characters"
    ]
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const project = {
          title: this.title,
          content: this.content,
          due: format(new Date(this.due), "iiii, dd MMM yyyy"),
          person: "the net ninja",
          status: "ongoing"
        };
        db.collection("project")
          .add(project)
          .then(() => {
            this.loading = false;
            this.dialog = false;
            this.$emit("ProjectAdded");
            this.title = null;
            this.content = null;
            this.due = null;
          });
      }
      //   this.title = null;
      //   this.content = null;
      //   this.due = null;
    }
  },
  computed: {
    formatDate() {
      return this.due ? format(new Date(this.due), "iiii, dd MMM yyyy") : "";
    }
  }
  //   watch: {
  //     loader() {
  //       const l = this.loader;
  //       this[l] = !this[l];

  //       setTimeout(() => (this[l] = false), 3000);

  //       this.loader = null;
  //     }
  //   }
};
</script>
<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
</style>
