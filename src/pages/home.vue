<template>
<DefaultLayout>
<div class="flex justify-between items-center mb-6">
  <div class="inline-flex rounded-md shadow-sm" role="group">
    <button @click="rangeDay(1)" :class="{ 'bg-blue-500 text-white': activeDay === 1, 'bg-white text-gray-900': activeDay !== 1 }" type="button" class=" cursor-pointer px-4 py-2 text-sm font-medium border border-gray-200 rounded-l-lg hover:opacity-80 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
      今天
    </button>
    <button @click="rangeDay(7)" :class="{ 'bg-blue-500 text-white': activeDay === 7, 'bg-white text-gray-900': activeDay !== 7 }" type="button" class=" cursor-pointer px-4 py-2 text-sm font-medium border-t border-b border-gray-200 hover:opacity-80 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
      7天
    </button>
    <button @click="rangeDay(30)" :class="{ 'bg-blue-500 text-white': activeDay === 30, 'bg-white text-gray-900': activeDay !== 30 }" type="button" class=" cursor-pointer px-4 py-2 text-sm font-medium border border-gray-200 rounded-r-md hover:opacity-80 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
      1個月
    </button>
  </div>
  <div class="text-sm text-gray-500">
    <span>{{ searchDay }}</span> - <span>{{ nowDate }}</span>
  </div>
</div>
<section class="mb-8">
  <h2 class="text-2xl font-bold mb-4">統計</h2>
  <div v-if="statLoading" class="text-center p-8">
    <i class='bx bx-loader bx-spin text-4xl text-gray-500'></i>
    <p class="mt-2 text-gray-600">載入中...</p>
  </div>
  <div v-else-if="statsError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
    <strong class="font-bold">錯誤!</strong>
    <span class="block sm:inline">{{ statsError.msg }}</span>
  </div>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
      <div>
        <p class="text-gray-500 text-sm">點擊次數</p>
        <p class="text-3xl font-bold">{{ stats.meta.total.clicks.toLocaleString() }}</p>
      </div>
      <div class="bg-blue-100 p-3 rounded-full">
        <i class='bx bx-mouse-alt text-blue-500 text-2xl'></i>
      </div>
    </div>
    <div class="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
      <div>
        <p class="text-gray-500 text-sm">總訂單數</p>
        <p class="text-3xl font-bold">{{ stats.meta.total.captured }}</p>
      </div>
      <div class="bg-green-100 p-3 rounded-full">
        <i class='bx bx-cart-alt text-green-500 text-2xl'></i>
      </div>
    </div>
    <div class="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
      <div>
        <p class="text-gray-500 text-sm">訂單審核中</p>
        <p class="text-3xl font-bold">{{ stats.meta.total.pending_conversions }}</p>
      </div>
      <div class="bg-yellow-100 p-3 rounded-full">
        <i class='bx bx-time-five text-yellow-500 text-2xl'></i>
      </div>
    </div>
    <div class="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
      <div>
        <p class="text-gray-500 text-sm">訂單否決</p>
        <p class="text-3xl font-bold">{{ stats.meta.total.rejected_conversions }}</p>
      </div>
      <div class="bg-red-100 p-3 rounded-full">
        <i class='bx bx-x-circle text-red-500 text-2xl'></i>
      </div>
    </div>
  </div>
</section>
<section class="mb-8">
  <h2 class="text-2xl font-bold mb-4">交易明細</h2>
  <div class="bg-white p-6 rounded-xl shadow-md">
    <div v-if="conversionsLoading" class="text-center p-8">
      <i class='bx bx-loader bx-spin text-4xl text-gray-500'></i>
      <p class="mt-2 text-gray-600">載入中...</p>
    </div>
    <div v-else-if="conversionsError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
      <strong class="font-bold">錯誤!</strong>
      <span class="block sm:inline">{{ conversionsError.msg }}</span>
    </div>
    <div v-else>
      <p v-if="conversions.data_count === 0" class="text-center text-gray-500 py-8">無交易明細</p>
      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">平台</th>
              <th scope="col" class="px-6 py-3">點擊時間</th>
              <th scope="col" class="px-6 py-3">成效獎金</th>
              <th scope="col" class="px-6 py-3">獎金狀態</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="conversion in conversions.data.transactions" :key="conversion.id" class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ conversion.offer_name }}</td>
              <td class="px-6 py-4">{{ useTime(new Date(conversion.click_time)) }}</td>
              <td class="px-6 py-4">${{ conversion.commission.toLocaleString() }}</td>
              <td class="px-6 py-4">
                <span :class="{
                  'bg-green-100 text-green-800': conversion.status === 'approved',
                  'bg-yellow-100 text-yellow-800': conversion.status === 'pending',
                  'bg-red-100 text-red-800': conversion.status === 'rejected',
                }" class="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">{{ conversion.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-right mt-4 font-bold text-lg">總金額: ${{ totalMoney.toLocaleString() }}</p>
      </div>
    </div>
  </div>
</section>

<section class="mb-6">
  <h2 class="text-2xl font-bold mb-4">自訂連結</h2>
  <div class="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto">
    <form @submit.prevent="submitHandler">
      <div class="mb-4">
        <label for="offer_id" class="block mb-2 text-sm font-medium text-gray-900">廠商</label>
        <input v-model="offerID" required list="offer" id="offer_id" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
      </div>
      <div class="mb-4">
        <label for="offer_link" class="block mb-2 text-sm font-medium text-gray-900">連結</label>
        <input v-model="link" required id="offer_link" type="url" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
      </div>
      <div class="flex items-center">
        <button type="submit" class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          產生連結
        </button>
        <i v-if="shortLoading" class='bx bx-loader bx-spin bx-sm ml-4'></i>
      </div>
    </form>
    <div v-if="shortResult" class="mt-6">
      <label class="block mb-2 text-sm font-medium text-gray-900">產生的連結</label>
      <div v-for="link in shortResult.data" :key="link.deeplink_url" class="relative">
        <input type="text" :value="link.deeplink_url" readonly class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10">
      </div>
    </div>
  </div>
  <datalist id="offer">
    <option v-for="offer in offers" :value="offer.id">{{ offer.name }}</option>
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

const activeDay = ref(30)

const rangeDay = async (day) => {
  activeDay.value = day
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

watchEffect(async () => {
  const queries = `start_at=${searchDay.value}&end_at=${nowDate}`;
  conversionsFetch({ queries })
  statsFetch({ queries })
});

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
