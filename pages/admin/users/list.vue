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
            <label>Vārds
              <InputField
                v-model="filters.firstname"
                placeholder="Ievadiet vārdu"
                color="grey"
                @input="onFilter"
              />
            </label>
            <label>Uzvārds
              <InputField
                v-model="filters.lastname"
                placeholder="Ievadiet uzvārdu"
                color="grey"
                @input="onFilter"
              />
            </label>
            <label>Vecums
              <InputField
                v-model="filters.age"
                placeholder="Ievadiet vecumu"
                color="grey"
                type="number"
                @input="onFilter"
              />
            </label>
            <label>Sūdzības
              <InputField
                v-model="filters.reports"
                placeholder="Ievadiet sūdzību skaitu"
                color="grey"
                type="number"
                @input="onFilter"
              />
            </label>
            <label>Dzimums
              <!--              TODO change to SelectInputField -->
              <SelectInput
                v-model="filters.gender"
                :options="['Vīrietis','Sieviete']"
                color="grey"
                style="width: 250px"
                @input="onFilter"
              />
            </label>
        </div>
        <b-table :items="data" :fields="columns" outlined :busy="isBusy" >
          <template #cell(gender)="data">
            {{ data.item.gender ? 'Vīriešu' : 'Sieviešu' }}
          </template>

          <template #cell(roles)="data">
            {{ data.item.roles.toString() }}
          </template>

          <template #cell(operations)="">
            <span class="icon-trash"></span>
            <span class="icon-edit"></span>
          </template>

        </b-table>
        <template v-if="isBusy">
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Lādē...</strong>
          </div>
        </template>
        </div>
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
        firstname: null,
        lastname: null,
        age: null,
        reports: null,
        gender: null
      //  TODO add role filter
      },
      filter: '',
      columns: [
        {
          label: 'Vārds',
          key: 'firstname',
          sortable: true
        },
        {
          label: 'Uzvārds',
          key: 'lastname',
          sortable: true
        },
        {
          label: 'Vecums',
          key: 'age',
          sortable: true
        },
        {
          label: 'Sūdzības',
          key: 'reports',
          sortable: true
        },
        {
          label: 'Dzimums',
          key: 'gender',
          sortable: true
        },
        {
          label: 'Sistēmas lomas',
          key: 'roles',
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
    this.$axios.get('/users?page=' + this.currentPage).then((response) => {
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
        if (!this.filters[prop]) { continue }
        let value = this.filters[prop]

        // TODO fix after pull request
        if (prop === 'gender') {
          if (this.filters[prop] === 'Vīrietis') {
            value = 1
          } else {
            value = 0
          }
        }

        this.filter += `${prop}=${value}&`
      }
      if (this.filter.slice(-1) === '&') { this.filter = this.filter.slice(0, -1) }

      await this.$axios.get('/users?page=1' + '&' + this.filter).then((response) => {
        this.data = response.data.data
      })
    },
    async nextPage () {
      this.isBusy = true
      this.debounce = false
      const nextPage = this.currentPage + 1
      await this.$axios.get('/users?page=' + nextPage).then((response) => {
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
