<template>
<DefaultLayout>
<div class="">
  <button @click="rangeDay(1)" class="bg-primary text-white rounded-md px-2 py-1 mr-2" type="button">今天</button>
  <button @click="rangeDay(7)" class="bg-primary text-white rounded-md px-2 py-1 mr-2" type="button">7天</button>
  <button @click="rangeDay(30)" class="bg-primary text-white rounded-md px-2 py-1" type="button">1個月</button>
</div>
<div>
  <p>{{ searchDay }} - {{ nowDate }}</p>
</div>
<section class="mb-4">
  <h2 class="font-bold text-2xl/loose">統計</h2>
  <p v-if="statLoading">loading...<i class='bx bx-loader bx-spin' ></i></p>
  <p v-else-if="statsError"><i class='bx bx-error bx-md'></i> <span>{{ statsError.msg }}</span></p>
  <div v-else class=" grid grid-cols-4">
    <div class=" text-center">
      <p class=" bg-slate-200">點擊次數</p>
      <p>{{ stats.data.stat_total.clicks.toLocaleString() }}</p>
    </div>
    <div class=" text-center">
      <p class=" bg-slate-200">總訂單數</p>
      <p>{{ stats.data.stat_total.captured }}</p>
    </div>
    <div class=" text-center">
      <p class=" bg-slate-200">訂單審核中</p>
      <p>{{ stats.data.stat_total.total_pending_conversions }}</p>
    </div>
    <div class=" text-center">
      <p class=" bg-slate-200">訂單否決</p>
      <p>{{ stats.data.stat_total.total_rejected_conversions }}</p>
    </div>
  </div>
</section>
<section class="mb-4">
  <h2 class=" font-bold text-2xl/loose">交易明細</h2>
  <div>
    <p v-if="conversionsLoading">loading...<i class='bx bx-loader bx-spin' ></i></p>
  <p v-else-if="conversionsError"><i class='bx bx-error bx-md'></i> <span>{{ conversionsError.msg }}</span></p>
    <div v-else>
      <p v-if="conversions.data_count === 0">無交易明細</p>
      <table v-else class=" table-fixed w-full">
        <thead>
          <tr class=" text-left">
            <th>平台</th>
            <th>點擊時間</th>
            <th>成效獎金</th>
            <th>獎金狀態</th>
          </tr>
        </thead>
        <tbody class="text-xs">
          <tr class="text-slate-600" v-for="conversion in conversions.data.transactions" :key="conversion.id">
            <td class="px-2 py-1">{{ conversion.offer_name }}</td>
            <td>{{ useTime(new Date(conversion.click_time)) }}</td>
            <td>${{ conversion.commission.toLocaleString() }}</td>
            <td>{{ conversion.status }}</td>
          </tr>
        </tbody>
      </table>
      <p>總金額:<i class='bx bx-dollar'></i>{{ totalMoney }}</p>
    </div>
  </div>
</section>
</DefaultLayout>
</template>

<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import useFetch from '../composables/useFetch'
import useTime from '../composables/useTime'
import { computed, ref } from 'vue'
const API_DOMAIN = import.meta.env.VITE_API_URI

const nowDate = useTime(new Date())
const searchDay = ref(useTime(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)))

const rangeDay = async (day) => {
  const dayTime = useTime(new Date(Date.now() - day * 24 * 60 * 60 * 1000))
  searchDay.value = dayTime
}

const totalMoney = computed(() => {
  if ( !conversionsLoading.value && conversions.value.data_count > 0 ) {
    return conversions.value.data.transactions.reduce((sum, item) => {
      sum += item.commission
      return sum
    }, 0)
  } else {
    return 0
  }
})

const conversionURL = computed(() => API_DOMAIN + `/one/conversions?start_at=${ searchDay.value }&end_at=${ nowDate }`)
const {
  loading: conversionsLoading,
  data: conversions,
  error: conversionsError
} = useFetch(conversionURL)

const statURL = computed(() => API_DOMAIN + `/one/stat?start_at=${ searchDay.value }&end_at=${ nowDate }`)
const {
  loading: statLoading,
  data: stats,
  error: statsError
} = useFetch(statURL)
</script>
