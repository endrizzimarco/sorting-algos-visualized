<template lang="pug">
.border-t(class='md:border-none')
.relative.flex.rounded-xl.text-xl.px-4.py-3.cursor-pointer.transition.duration-200(
  @click='active = !active',
  :class='[active ? "hover:bg-indigo-600 bg-indigo-600" : "hover:bg-indigo-400"]'
) <slot></slot>
  // Dropdown stuff
  .dropdown(v-if='items')
    // SVG Icon
    svg.ml-1.mt-1.h-5.w-5(
      xmlns='http://www.w3.org/2000/svg',
      viewbox='0 0 20 20',
      fill='currentColor',
      aria-hidden='true'
    )
      path(
        fill-rule='evenodd',
        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z',
        clip-rule='evenodd'
      )
    // Content
    .absolute.left-0.mt-10.w-full.rounded-md.shadow-lg.bg-white.ring-1.ring-black.ring-opacity-5(v-show='active')
      .py-1(role='menu', aria-orientation='vertical', aria-labelledby='options-menu')
        .block.px-4.py-2.text-sm.text-gray-700(
          v-for='item in items',
          @click='$emit("selected", item)',
          class='hover:bg-gray-100 hover:text-gray-900',
          :class='[item == value ? "bg-gray-200" : ""]',
          role='menuitem'
        ) {{ item }}
</template>

<script>
export default {
  name: 'Attribute',

  props: { items: Array, value: [String, Number] },

  emits: ['selected'],

  data() {
    return {
      active: false
    };
  }
};
</script>