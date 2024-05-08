import { defineStore } from "pinia";

export const useStore = defineStore("global", () => {
    const isRunnerLoggedIn = false;
    const isEventOrgLoggedIn = false;
    const isPhotographerLoggedIn = false;

    return {isRunnerLoggedIn, isEventOrgLoggedIn, isPhotographerLoggedIn}
});