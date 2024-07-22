<template>
  <div class="calc">
    <div class="border">
      <div class="input">
        <p class="inputP">{{ calculatorStore.input }}</p>
      </div>
      <div class="result">
        <p class="resultP">Результат: {{ calculatorStore.result }}</p>
      </div>
      <div class="buttons">
        <button
            @click="calculatorStore.clickButton(button)"
            v-for="button in calculatorStore.buttons"
            :key="button"
            :class="{
            'button': true,
            'zero': button === '0',
            'operators': button === '=' || button === '/' || button === '+' || button === '-' || button === 'X'
          }"
        >{{ button }}</button>
      </div>
      <div class="historyBtn">
        <RouterLink to="/history" class="historyLink">История вычислений</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useCalculatorStore } from '@/stores/calcStore.js';

export default defineComponent({

  setup() {
    const calculatorStore = useCalculatorStore();

    return {
      calculatorStore,
    };
  },
});
</script>
