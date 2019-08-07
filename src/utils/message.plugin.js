// Materialize css toast
export default {
  // Метод install будет вызывать Vue js, чтобы применить этот плагин
  install(Vue, options) {
    // Добавляем метод message
    Vue.prototype.$message = function(html) {
      M.toast({ html });
    };
     // Добавляем метод error
    Vue.prototype.$error = function(html) {
      M.toast({html: `[Ошибка]: ${html}`})
    }
  }
};
