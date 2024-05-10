<template>
<DefaultLayout>
<div>
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

<section class="mb-6">
  <h2 class=" font-bold text-2xl/loose">自訂連結</h2>
  <form class=" max-w-96 mx-auto w-5/6 p-5 rounded-xl shadow bg-white" @submit.prevent="submitHandler">
    <div class="mb-2 flex items-center justify-start">
      <label class="shrink-0 pr-4" for="offer_id">廠商</label>
      <input v-model="offerID" required class=" focus-within:ring-primary w-full appearance-none ring ring-primary/30 rounded-xl py-2 px-4 outline-none" id="offer_id" type="text" list="offer">
    </div>
    <div class="mb-2 flex items-center justify-start">
      <label class="shrink-0 pr-4" for="offer_link">連結</label>
      <input v-model="link" required class=" focus-within:ring-primary w-full appearance-none ring ring-primary/30 rounded-xl py-2 px-4 outline-none" id="offer_link" type="url">
    </div>
    <div class="mb-2">
      <button type="submit" class=" bg-primary text-white py-2 px-3 rounded-3xl hover:opacity-80">送出</button>
      <i v-if="shortLoading" class='bx bx-loader bx-spin bx-sm' ></i>
    </div>
    <div v-if="shortResult">
      <p v-for="link in shortResult.data">
        <input type="text" :value="link.deeplink_url" readonly class=" text-xs select-text rounded-lg p-3 w-full appearance-none outline-none ring-2 read-only:bg-gray-300 ">
      </p>
    </div>
  </form>
  <datalist id="offer">
    <option v-for="offer in offers" :value="offer.id">{{ offers.id }} {{ offer.name }}</option>
  </datalist>
</section>

</DefaultLayout>
</template>

<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import useFetch from '../composables/useFetch'
import useTime from '../composables/useTime'
import { computed, ref, watchEffect } from 'vue'

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

const {
  loading: conversionsLoading,
  data: conversions,
  error: conversionsError,
  doFetch: conversionsFetch
} = useFetch(`/one/conversions`)

const {
  loading: statLoading,
  data: stats,
  error: statsError,
  doFetch: statsFetch
} = useFetch(`/one/stat`)

const {
  doFetch: shortLink,
  data: shortResult,
  loading: shortLoading
} = useFetch(`/one/link`)

const link = ref('')
const offerID = ref(1809)
const submitHandler = async () => {
  await shortLink({ method: 'POST', body: { link: link.value, offerId: offerID.value } })
  link.value = ''
}

watchEffect(() => {
  conversionsFetch({
    queries: `start_at=${ searchDay.value }&end_at=${ nowDate }`
  })
  statsFetch({
    queries: `start_at=${ searchDay.value }&end_at=${ nowDate }`
  })
})

const offers = [
  { id: 1115, name: '聯盟網' },
  { id: 5968, name: 'Agoda' },
  { id: 2169, name: 'Booking' },
  { id: 5080, name: 'Domain.com' },
  { id: 4734, name: 'KFC肯德基' },
  { id: 1809, name: 'KKday' },
  { id: 2328, name: 'KLOOK' }
]
</script>
