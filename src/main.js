import { createApp } from 'vue';
import App from './App.vue';
import AppForm from './components/Form/AppForm.vue';
import AppTimeline from './components/Timeline/AppTimeline.vue';
import EditDialog from './components/Timeline/EditDialog.vue';
import AppHeader from './components/Header/AppHeader.vue';

// Create app
const app = createApp(App);

// Add global component
app.component('app-form', AppForm);
app.component('app-timeline', AppTimeline);
app.component('edit-dialog', EditDialog);
app.component('app-header', AppHeader);

// Mount app
app.mount('#app');