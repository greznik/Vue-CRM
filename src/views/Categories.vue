<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>

        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />

        <p class="center" v-else>Категорий для редактирования нет.</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";
export default {
  data: () => ({
    // Данные с categoryEdit будут тут
    categories: [],
    loading: true,
    // Для принудительного обновления компоненты
    updateCount: 0
  }),
  components: {
    CategoryCreate,
    CategoryEdit
  },
  async mounted() {
    // Работа с сервером
    this.categories = await this.$store.dispatch("fetchCategories");
    // Получим данные и убираем лоадинг
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      // Добавляем в массив изи
      // Когда изменяется длина, вью вынужден бует перерисовать компонент
      this.categories.push(category);
    },
    updateCategories(category) {
      // Понимаем какую именно категорию редактируем
      const idx = this.categories.findIndex(c => c.id === category.id);
      // Обращаемся к массиву по индексу и обновляем
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    }
  }
};
</script>
