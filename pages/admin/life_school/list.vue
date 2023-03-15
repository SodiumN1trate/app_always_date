<template>
  <div id="content">
    <div id="box">
      <div class="admin-navigation">
        <NuxtLink to="/admin/life_school/list">Padomi</NuxtLink>
        <NuxtLink to="/admin/users/list">Lietotāji</NuxtLink>
      </div>
      <div class="admin-content">
        <div class="admin-filtration">
          <h2>Filtrēt</h2>
          <div>
            <label>Numurs
              <InputField
                v-model="filters.number"
                type="number"
                placeholder="Ieraksti numuru"
                color="grey"
                @input="onFilter"
              />
            </label>
            <label>Nosaukums
              <InputField
                v-model="filters.title"
                placeholder="Ieraksti nosaukumu"
                color="grey"
                @input="onFilter"
              />
            </label>
            <label>Dzimums
              <SelectInputField
                v-model="filters.gender"
                placeholder="Izvēlieties dzimumu"
                :options="[{id: 0, name: 'Sieviete'}, {id: 1, name: 'Vīrietis'}]"
                :tabindex="0"
                color="grey"
                style="width: 260px"
                @input="onFilter"
              />
            </label>
          </div>
        </div>
        <b-table :items="data" :fields="columns" outlined :busy="isBusy" >
          <template #cell(gender)="data">
            {{ data.item.gender ? 'Vīriešu' : 'Sieviešu' }}
          </template>
          <template #cell(operations)="data">
            <span class="icon-trash"></span>
            <NuxtLink :to="`/admin/life_school/edit/${data.item.id}`"><span class="icon-edit"></span></NuxtLink>
          </template>
        </b-table>
        <template v-if="isBusy">
          <div class="my-2 align-items-center justify-content-center">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Lādē...</strong>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'NavigationLayout',
  data () {
    return {
      isBusy: false,
      filters: {
        title: null,
        number: null,
        gender: null
      },
      filter: '',
      columns: [
        {
          label: 'Numurs',
          key: 'number',
          sortable: true
        },
        {
          label: 'Nosaukums',
          key: 'title',
          type: 'number',
          sortable: true
        },
        {
          label: 'Dzimums',
          key: 'gender',
          sortable: true
        },
        {
          label: 'Darbības',
          key: 'operations'
        }
      ],
      data: [],
      debounce: true,
      currentPage: 1
    }
  },
  mounted () {
    this.isBusy = true
    this.$axios.get('/life_schools?page=' + this.currentPage).then((response) => {
      this.data = response.data.data
      this.isBusy = false
    })
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight && this.lastPage !== this.currentPage && this.debounce) {
        this.nextPage()
      }
    })
  },
  methods: {
    async onFilter () {
      this.currentPage = 1
      this.filter = ''
      for (const prop in this.filters) {
        if (this.filters[prop] === null) { continue }
        this.filter += `${prop}=${this.filters[prop]}&`
      }
      if (this.filter.slice(-1) === '&') { this.filter = this.filter.slice(0, -1) }

      await this.$axios.get('/life_schools?page=1' + '&' + this.filter).then((response) => {
        this.data = response.data.data
      })
    },
    async nextPage () {
      this.isBusy = true
      this.debounce = false
      const nextPage = this.currentPage + 1
      await this.$axios.get('/life_schools?page=' + nextPage + '&' + this.filter).then((response) => {
        this.currentPage = response.data.meta.current_page
        this.data = this.data.concat(response.data.data)
        window.scrollTo({
          top: document.body.scrollHeight - 1000,
          behavior: 'smooth'
        })
        setTimeout(() => {
          this.debounce = true
        }, 1000)
        this.isBusy = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

#box > #content {
  padding: 2%;
}

table {
  width: 95% !important;
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
}

#box {
  padding: 0 !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2%;
}

.icon-trash, .icon-edit {
  font-size: 24px;
  color: #d3d3d3;
}

.admin-navigation {
  display: flex;
  width: 99.8%;
  flex-direction: row !important;
  border-top-left-radius: 10.53px;
  background-color: #FAFAFA;
  border-top-right-radius: 10.53px;
}

.admin-navigation > a {
  padding: 8px;
  font-size: 20px;
  color: #E2E2E2;
}

.admin-filtration > div {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.admin-content {
  max-width: 98%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

a.nuxt-link-active {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #FBFDFF;
  color: #FFCACA;
}

@media only screen and (max-width: 1000px) {
  #match-content {
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }
  #box {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}
</style>
