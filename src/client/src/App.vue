<template>
  <Suspense>
    <Home />
  </Suspense>
</template>

<script setup>
import Home from './components/Home.vue';
import { provide } from '@vue/runtime-core';

import store from './store';
provide('store', store);

const { setUser, addMessage, currentChannel } = store()

if (sessionStorage.getItem('user')) {
  const userData = JSON.parse(sessionStorage.getItem('user'))
  setUser(userData.id)
}

connection.onmessage = function (message) {
  const data = JSON.parse(message.data)
  if (data.channelId === currentChannel.value.id) {
    addMessage(data)
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --white1: #ffffff;
  --white2: #f9fbfc;
  --white3: #f0f0f0;
  --black1: #30333d;
  --blue1: #2c49a3;
  --blue1hover: linear-gradient(
    90deg,
    #2c49a3 0%,
    #2c49a3 100%
  );
  --purple2: #e9eff4;
  --gray1: #a4acb2;
}

.main {
  position: relative;
}

a {
  text-decoration: none;
  color: unset;
}

html,
body {
  height: 100%;
}

body {
  scroll-behavior: smooth;
  font-family: 'Nunito', sans-serif;
  font-display: auto;
  overflow: hidden;
}
</style>
