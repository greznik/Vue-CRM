<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c of categories" :key="c.id" :value="c.id">{{c.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >Введите название категории</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >Минимальная величина {{$v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";

export default {
  // Принимаем массив из firebase и род компоненты
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    title: "",
    limit: 20,
    select: null,
    current: null
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(20) }
  },
  watch: {
    current(catId) {
      // Находим ту категорию, которая соответствует id выбранной модели в селекте
      const { title, limit } = this.categories.find(c => c.id === catId);
      this.title = title;
      this.limit = limit;
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        };
        // Запрос на обновление  данных, куда передаем объект выше
        await this.$store.dispatch("updateCategory", categoryData);
        // Успешный успех
        this.$message("Категория успешно обновлена");
        // Передаем данные для обновления элемента
        this.$emit("updated", categoryData);
      } catch (e) {}
    }
  },
  // Получаем поля из массива, для отрисовки, чтобы не было значения null
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    // Оживляем select в materialize.css
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  beforeDestroy() {
    // Если в селекте, что-то есть и у него есть метод destroy, то вызываем  этот метод
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
};
</script>
