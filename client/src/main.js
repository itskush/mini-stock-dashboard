import { createApp } from 'vue'
import store from "./store";

import Toaster from "@meforma/vue-toaster";

import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import GammelTheme from 'fusioncharts/themes/fusioncharts.theme.gammel'

import './style.css'
import './assets/main.scss';
import App from './App.vue'

const app = createApp(App);

app.use(Toaster)

app.use(VueFusionCharts, FusionCharts, Charts, GammelTheme, PowerCharts);
app.use(store);

app.mount('#app')
