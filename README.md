# affiliate-dashboard
[![build status](https://github.com/connectshark/affiliate-dashboard/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/connectshark/affiliate-dashboard/actions/workflows/deploy.yml)
[![GitHub last commit](https://img.shields.io/github/last-commit/connectshark/affiliate-dashboard.svg?style=flat)](https://github.com/connectshark/affiliate-dashboard)
![GitHub stars](https://img.shields.io/github/stars/connectshark/affiliate-dashboard.svg?style=social&label=Stars&style=plastic)


![https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![https://img.shields.io/badge/tailwindcss-35495E?style=for-the-badge&logo=tailwindcss&logoColor=38BCF8](https://img.shields.io/badge/tailwindcss-35495E?style=for-the-badge&logo=tailwindcss&logoColor=38BCF8)

快速開發模板架構

## 目錄

- [專案已安裝內容](#專案已安裝內容)
- [使用模板的優勢](#使用模板的優勢)
  - [CSS主色設定](#css主色設定)
  - [自動部署至gh-page](#自動部署至gh-page)
  - [資料結構為主的路由](#資料結構為主的路由)

## 專案已安裝內容

- vite
- vue3
- pinia
- vue-router4
- tailwindcss
- github action自動部署至 `gh-page`

## 使用模板的優勢

### CSS主色設定

使用TailwindCSS官方建議方式設定好CSS變數，可一次調整專案色票。

`src/index.css`

### 自動部署至gh-page

已設定github action功能，在推送新的內容時會觸發部署功能。

### 資料結構為主的路由

將`vue-router`搭配插件修改成以**資料結構**為主的路由設定，所有路由都放置在`src/pages`的資料夾中，預設找不到頁面會進入`[...slug].vue`的頁面。