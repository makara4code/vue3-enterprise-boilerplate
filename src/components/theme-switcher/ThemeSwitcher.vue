<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <img
        :src="dropdownItem[mode].icon"
        :alt="dropdownItem[mode].alt"
        :class="`relative h-5 w-5 rounded-full mr-2 cursor-pointer ${isDark ? 'invert' : ''}`"
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-42" align="end">
      <DropdownMenuGroup>
        <DropdownMenuItem
          v-for="{ theme, icon, alt, label } in dropdownItem"
          :key="theme"
          @click="onThemeChange(theme)"
        >
          <img :src="icon" :alt="alt" :class="`mr-2 ${isDark ? 'invert' : ''}`" />
          {{ label }}
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { useColorMode, useDark } from '@vueuse/core';

import darkIcon from './icons/dark.svg';
import lightIcon from './icons/light.svg';
import systemIcon from './icons/system.svg';

import { useTranslation } from '@/composables';

const { t } = useTranslation();
const mode = useColorMode();
const isDark = useDark();

const dropdownItem = {
  light: {
    theme: 'light',
    icon: lightIcon,
    alt: 'light',
    label: t('theme.light')
  },
  dark: {
    theme: 'dark',
    icon: darkIcon,
    alt: 'dark',
    label: t('theme.dark')
  },
  auto: {
    theme: 'auto',
    icon: systemIcon,
    alt: 'system',
    label: t('theme.system')
  }
};

const onThemeChange = (theme: any) => {
  mode.value = theme;
};
</script>

<style scoped></style>
