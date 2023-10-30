import { defineStore } from "pinia";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export const useBlogsPostStore = defineStore("blogpost", {
  state: () => ({
    blogs: [],
  }),
  actions: {
    async getBlogPost(searchText) {
      try {
        let endpoint = `${BASE_URL}/trips`;
        if (searchText || searchText !== "") {
          endpoint += `?keywords=${searchText}`;
        }
        const response = await axios.get(endpoint);
        this.blogs = response.data.data;
      } catch (error) {
        console.log(`Error`, error);
      }
    },
  },
});
