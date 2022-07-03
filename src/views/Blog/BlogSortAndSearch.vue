<template>
  <b-input-group>
    <b-form-input v-model="state.keyword" type="search" placeholder="Tìm kiếm..." @keyup.enter="onSubmit" />
    <b-input-group-append>
      <b-dropdown :text="sortOptions[selectedSortOptions].label" variant="outline-secondary">
        <b-dropdown-item v-for="(option, index) in sortOptions" :key="index" @click="onChangeSortOption(index)">
          {{ option.label }}
        </b-dropdown-item>
      </b-dropdown>
      <b-button size="sm" text="Button" variant="primary" @click="onSubmit"> Search </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script lang="ts">
import { BButton, BDropdown, BDropdownItem, BFormInput, BInputGroup, BInputGroupAppend } from 'bootstrap-vue'
export default defineComponent({
  name: 'BlogSortAndSearch',
  components: {
    BButton,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BDropdown,
    BDropdownItem,
  },
  emits: ['search'],
  setup(props: any, { emit }) {
    const selectedSortOptions = ref<number>(0)
    const sortOptions = [
      {
        label: 'Mới nhất',
        value: {
          sort_by: 'created_at',
          sort_direction: 'asc',
        },
      },
      {
        label: 'Cũ nhất',
        value: {
          sort_by: 'created_at',
          sort_direction: 'desc',
        },
      },
    ]

    const state = reactive({
      keyword: '',
      sort_by: sortOptions[0].value.sort_by,
      sort_direction: sortOptions[0].value.sort_direction,
    })

    const onSubmit = () => {
      const payload = {
        search: state.keyword,
        sort_by: state.sort_by,
        sort_direction: state.sort_direction,
      }
      emit('search', payload)
    }

    const onChangeSortOption = (index: number) => {
      selectedSortOptions.value = index
      state.sort_by = sortOptions[selectedSortOptions.value].value.sort_by
      state.sort_direction = sortOptions[selectedSortOptions.value].value.sort_direction

      onSubmit()
    }

    return {
      selectedSortOptions,
      sortOptions,
      state,
      onChangeSortOption,
      onSubmit,
    }
  },
})
</script>

<style lang="scss" scoped></style>
