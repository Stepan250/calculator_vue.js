<template>
  <div class="historyPage">
    <RouterLink to="/calculator" class="historyLinkPage" >
      <img src="@/assets/arrow.svg"> История вычислений
    </RouterLink>
    <div class="history">
      <div v-for="(entry, index) in history" :key="index" class="historyEntry">
        <span class="expression">{{ entry.expression }}
          <span class="result">= </span>
          <span class="orange">{{ entry.result }}</span>
        </span>
        <span class="date">{{ entry.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const storedHistory = JSON.parse(localStorage.getItem('history')) || [];
    const history = storedHistory.map(entry => {
      const [expression, rest] = entry.split('=');
      const [result, date] = rest.split(' (');

      return {
        expression: expression.trim(),
        result: result.trim(),
        date: date.replace(')', '').trim()
      };
    });
    return {
      history
    };
  },
  created() {

  },
  mounted() {
    console.log("in")
  },
  unmounted() {
    console.log("out")
  }
});
</script>

