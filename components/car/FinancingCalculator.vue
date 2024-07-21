<script setup lang="ts">

import {useToast} from "~/components/ui/toast";
import {postHttpClient} from "~/composables/post.httpClient";

const props = defineProps<{
  price: number
}>()

const {toast} = useToast()

const price = ref<number>(props.price ? props.price : 0)
const interestRate = ref<number | null>(null)
const term = ref<number | null>(null)
const initialPayment = ref<number | null>(null)

const monthlyPayment = ref<number | null>(null)
const totalPayment = ref<number | null>(null)

const formattedMonthlyPayment = computed(() => {
  return `$ ${formatPrice(monthlyPayment.value as number)}`
})

const formattedTotalPayment = computed(() => {
  return `$ ${formatPrice(totalPayment.value as number)}`
})

async function calculate() {
  try {
    let result = await postHttpClient("http://localhost:8080/cars/calculator", {
      body: {
        price: price.value,
        interestRate: interestRate.value,
        term: term.value,
        initialPayment: initialPayment.value
      },
      method: "POST",
    },)


    if (result) {
      monthlyPayment.value = result.monthlyPayment
      totalPayment.value = result.totalCost
    }
  } catch (error) {
    toast({
      variant: "destructive",
      description: error.data.message,
    })
  }

}
</script>

<template>
  <h2 class="text-2xl font-bold mt-12">Financing Calculator</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
    <div class="flex flex-col gap-2">
      <Label for="price">Price</Label>
      <Input
          v-model="price"
          id="price"
          type="number"
          placeholder="Enter price"/>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="interest">Interest Rate</Label>
      <Input
          v-model="interestRate"
          id="interest"
          type="number"
          placeholder="Enter interest rate"/>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="term">Loan Term (year)</Label>
      <Input
          v-model="term"
          id="term"
          type="number"
          placeholder="Enter load term"/>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="down-payment">Down Payment</Label>
      <Input
          v-model="initialPayment"
          id="down-payment"
          type="number"
          placeholder="Enter down payment"/>
    </div>
  </div>
  <div class="mt-10 flex flex-col gap-4" v-if="monthlyPayment">
    <div class="flex flex-col gap-2">
      <Label for="monthly-payment">Monthly Payment</Label>
      <Input
          id="monthly-payment"
          readonly
          :placeholder="formattedMonthlyPayment"/>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="total-payment">Total Payment</Label>
      <Input
          id="total-payment"
          readonly
          :placeholder="formattedTotalPayment"/>
    </div>
  </div>
  <Button class="flex items-center gap-2 mt-8" @click="calculate">
    <span>Calculate</span>
    <Icon name="bi:arrow-up-right"/>
  </Button>
</template>