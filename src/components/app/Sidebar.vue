<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link 
    v-for="link in links"
    tag="li"
    active-class="active"
    :key="link.url" 
    :to="link.url"
    :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>

    
  </ul>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      links: [
        { title: "Счет", url: "/", exact: true},
        { title: "История", url: "/history" },
        { title: "Планирование", url: "/planning" },
        { title: "Новая запись", url: "/record" },
        { title: "Категории", url: "/categories" }
      ]
    }
  }
};
</script>
